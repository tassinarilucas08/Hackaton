/**
 * SRP: Responsável exclusivamente pelo transporte HTTP com a API Flask.
 */
class ApiClient {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async getStatus() {
    const res = await fetch(`${this.baseUrl}/api/status`);
    if (!res.ok) throw new Error('Falha ao obter status da sessão.');
    return res.json();
  }

  async resetSession() {
    const res = await fetch(`${this.baseUrl}/api/reiniciar`, { method: 'POST' });
    if (!res.ok) throw new Error('Falha ao reiniciar o contador.');
    return res.json();
  }

  async finishSession() {
    const res = await fetch(`${this.baseUrl}/api/finalizar_sessao`, { method: 'POST' });
    if (!res.ok) throw new Error('Falha ao persistir a sessão.');
    return res.json();
  }

  async getHistory() {
    const res = await fetch(`${this.baseUrl}/api/historico`);
    if (!res.ok) throw new Error('Falha ao consultar o histórico de sessões.');
    return res.json();
  }
}