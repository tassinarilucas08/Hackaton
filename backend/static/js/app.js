/**
 * SRP & DIP: Orquestrador da Interface, injeção de dependências e eventos DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Injeção de Dependências
  const api = new ApiClient();
  const audio = new AudioFeedbackService();

  // Elementos DOM
  const elements = {
    tabs: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    repsCounter: document.getElementById('repsCounter'),
    stageDisplay: document.getElementById('exerciseStage'),
    sessionStatus: document.getElementById('sessionStatus'),
    statusDot: document.getElementById('statusDot'),
    angleDisplay: document.getElementById('angleDisplay'),
    postureAlert: document.getElementById('postureAlert'),
    postureIcon: document.getElementById('postureIcon'),
    postureText: document.getElementById('postureText'),
    gaugeCanvas: document.getElementById('gaugeCanvas'),
    clinicalChart: document.getElementById('clinicalChart'),
    btnReiniciar: document.getElementById('btnReiniciar'),
    btnFinalizar: document.getElementById('btnFinalizar'),
    btnAtualizarHistorico: document.getElementById('btnAtualizarHistorico'),
    historyTableBody: document.getElementById('historyTableBody'),
    statTotalSessoes: document.getElementById('statTotalSessoes'),
    statMediaReps: document.getElementById('statMediaReps'),
    statTotalCompensacoes: document.getElementById('statTotalCompensacoes')
  };

  let lastRepCount = 0;
  let pollingInterval = null;

  // --- NAVEGAÇÃO DE ABAS ---
  elements.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      elements.tabs.forEach(t => t.classList.remove('active'));
      elements.tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `tab-${tab.getAttribute('data-tab')}`;
      document.getElementById(targetId).classList.add('active');

      if (tab.getAttribute('data-tab') === 'fisioterapeuta') {
        carregarHistoricoClinico();
      }
    });
  });

  // --- SINCRONIZAÇÃO EM TEMPO REAL COM O BACKEND ---
  async function sincronizarEstado() {
    try {
      const data = await api.getStatus();

      // Atualiza Repetições
      elements.repsCounter.textContent = data.reps;
      if (data.reps > lastRepCount) {
        audio.speak(`${data.reps}!`);
        lastRepCount = data.reps;
      }

      // Atualiza Status e Estágio
      elements.sessionStatus.textContent = data.status;
      elements.stageDisplay.textContent = `Posição: ${data.estagio === 'em_pe' ? 'Em Pé' : 'Sentado'}`;
      elements.angleDisplay.textContent = `${data.angulo_atual}°`;

      // Atualiza Gauge Canvas
      NativeCanvasRenderer.drawGauge(elements.gaugeCanvas, data.angulo_atual);

      // Atualiza Alerta de Postura
      if (data.alerta_postura) {
        elements.postureAlert.classList.add('alert');
        elements.postureIcon.textContent = '⚠';
        elements.postureText.textContent = 'Endireite a coluna ao levantar!';
        elements.statusDot.classList.add('danger');
        audio.speak('Endireite a coluna');
      } else {
        elements.postureAlert.classList.remove('alert');
        elements.postureIcon.textContent = '✓';
        elements.postureText.textContent = 'Coluna alinhada corretamente';
        elements.statusDot.classList.remove('danger');
      }
    } catch {
      elements.sessionStatus.textContent = 'Aguardando backend...';
    }
  }

  // --- CONTROLES DE SESSÃO ---
  elements.btnReiniciar.addEventListener('click', async () => {
    try {
      await api.resetSession();
      lastRepCount = 0;
      audio.speak('Contador reiniciado');
      sincronizarEstado();
    } catch (err) {
      alert(err.message);
    }
  });

  elements.btnFinalizar.addEventListener('click', async () => {
    try {
      const res = await api.finishSession();
      audio.speak('Treino finalizado e salvo com sucesso');
      alert(`Sessão salva com sucesso no prontuário do paciente! ID: ${res.dados.id}`);
      elements.btnReiniciar.click();
    } catch (err) {
      alert(err.message);
    }
  });

  // --- CARREGAMENTO DO PRONTUÁRIO CLÍNICO ---
  async function carregarHistoricoClinico() {
    try {
      const sessoes = await api.getHistory();

      // Estatísticas agregadas
      const total = sessoes.length;
      const somaReps = sessoes.reduce((acc, curr) => acc + curr.repeticoes_concluidas, 0);
      const somaDesvios = sessoes.reduce((acc, curr) => acc + curr.desvios_posturais_detectados, 0);

      elements.statTotalSessoes.textContent = total;
      elements.statMediaReps.textContent = total > 0 ? (somaReps / total).toFixed(1) : '0.0';
      elements.statTotalCompensacoes.textContent = somaDesvios;

      // Desenha gráfico histórico nativo
      NativeCanvasRenderer.drawHistoryChart(elements.clinicalChart, sessoes);

      // Popula Tabela
      if (sessoes.length === 0) {
        elements.historyTableBody.innerHTML = `<tr><td colspan="7" class="text-center">Nenhum treino realizado ainda.</td></tr>`;
        return;
      }

      elements.historyTableBody.innerHTML = sessoes.map(s => `
        <tr>
          <td>#${s.id}</td>
          <td>${s.data_hora}</td>
          <td><strong>${s.paciente}</strong></td>
          <td>${s.exercicio}</td>
          <td><strong>${s.repeticoes_concluidas}</strong></td>
          <td>${s.desvios_posturais_detectados}</td>
          <td>
            <span class="tag-risk ${s.risco_postural === 'Normal' ? 'tag-normal' : 'tag-elevado'}">
              ${s.risco_postural}
            </span>
          </td>
        </tr>
      `).join('');
    } catch {
      elements.historyTableBody.innerHTML = `<tr><td colspan="7" class="text-center">Erro ao carregar prontuário.</td></tr>`;
    }
  }

  elements.btnAtualizarHistorico.addEventListener('click', carregarHistoricoClinico);

  // Inicia polling contínuo (250ms)
  pollingInterval = setInterval(sincronizarEstado, 250);
});