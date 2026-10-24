/**
 * SRP: Renderização visual nativa em Canvas 2D (sem bibliotecas externas como Chart.js).
 */
class NativeCanvasRenderer {
  /**
   * Renderiza um semicírculo indicador de ângulo (Gauge)
   */
  static drawGauge(canvas, angle) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height - 10;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, width, height);

    // Arco de fundo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#334155';
    ctx.stroke();

    // Normaliza ângulo de 0 a 180° para [0, 1]
    const clampedAngle = Math.max(0, Math.min(180, angle));
    const progress = clampedAngle / 180;
    const endAngle = Math.PI + progress * Math.PI;

    // Arco de valor
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, endAngle, false);
    ctx.lineWidth = 14;
    ctx.strokeStyle = angle > 155 ? '#38bdf8' : angle < 105 ? '#16a34a' : '#f59e0b';
    ctx.stroke();
  }

  /**
   * Renderiza gráfico de linha da evolução histórica das sessões
   */
  static drawHistoryChart(canvas, sessions) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const pad = 40;

    ctx.clearRect(0, 0, w, h);

    if (!sessions || sessions.length === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Nenhum dado clínico registrado ainda.', w / 2, h / 2);
      return;
    }

    // Ordena da mais antiga para a mais recente para o eixo cronológico
    const data = [...sessions].reverse().slice(-10);
    const maxReps = Math.max(...data.map(d => d.repeticoes_concluidas), 10);

    // Linhas de grade e eixos
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    const chartW = w - pad * 2;
    const chartH = h - pad * 2;
    const stepX = data.length > 1 ? chartW / (data.length - 1) : chartW / 2;

    // Traçado dos pontos
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((s, idx) => {
      const x = data.length === 1 ? w / 2 : pad + idx * stepX;
      const y = (h - pad) - (s.repeticoes_concluidas / maxReps) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Desenho dos vértices e legendas
    data.forEach((s, idx) => {
      const x = data.length === 1 ? w / 2 : pad + idx * stepX;
      const y = (h - pad) - (s.repeticoes_concluidas / maxReps) * chartH;

      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${s.repeticoes_concluidas}`, x, y - 10);
      ctx.fillText(`S${s.id}`, x, h - pad + 18);
    });
  }
}