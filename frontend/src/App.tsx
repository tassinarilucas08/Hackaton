import { FormEvent, ReactNode, useState } from 'react'

type Screen = 'landing' | 'dashboard' | 'access' | 'training' | 'summary'
type IconName =
  | 'arrow'
  | 'calendar'
  | 'check'
  | 'chevron'
  | 'clipboard'
  | 'clock'
  | 'close'
  | 'eye'
  | 'heart'
  | 'home'
  | 'info'
  | 'lock'
  | 'logout'
  | 'mail'
  | 'menu'
  | 'plus'
  | 'refresh'
  | 'search'
  | 'shield'
  | 'spark'
  | 'trend'
  | 'user'
  | 'users'
  | 'warning'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    clipboard: <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5V3h6v1.5M9 9h6M9 13h6M9 17h3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></>,
    heart: <path d="M20.8 5.7c-1.6-2.2-5-2.2-6.8 0L12 8l-2-2.3c-1.8-2.2-5.2-2.2-6.8 0-1.4 2-.9 4.7.8 6.4l8 7.4 8-7.4c1.7-1.7 2.2-4.4.8-6.4Z"/>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    refresh: <><path d="M20 8a8 8 0 1 0 .2 7"/><path d="M20 3v5h-5"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
    shield: <><path d="M12 3 4.5 6v5c0 5 3.2 8.4 7.5 10 4.3-1.6 7.5-5 7.5-10V6L12 3Z"/><path d="m9 12 2 2 4-4"/></>,
    spark: <><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z"/><path d="m19 15 .6 2 1.9 1-.9.6-1 2-.6-2-2-1 2-1 .9-2Z"/></>,
    trend: <><path d="M4 18 10 12l4 4 6-9"/><path d="M15 7h5v5"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    users: <><circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0M16 5.5a3.5 3.5 0 0 1 0 6.5M17 14a6 6 0 0 1 5 6"/></>,
    warning: <><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/></>,
  }

  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="FisioOn, página inicial">
      <span className="logo-mark"><Icon name="heart" size={21} /></span>
      <span>Fisio<span>On</span></span>
    </button>
  )
}

function Field({ label, placeholder, icon, type = 'text' }: { label: string; placeholder: string; icon: IconName; type?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <span className="field-control">
        <Icon name={icon} size={19} />
        <input type={type} placeholder={placeholder} />
      </span>
    </label>
  )
}

function Landing({ goTo }: { goTo: (screen: Screen) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const submit = (event: FormEvent) => {
    event.preventDefault()
    goTo('dashboard')
  }

  return (
    <main className="landing">
      <header className="landing-header">
        <Logo />
        <nav className="landing-nav" aria-label="Navegação principal">
          <button className="text-button">Central de ajuda</button>
          <button className="patient-shortcut" onClick={() => goTo('access')}>
            <span className="shortcut-icon"><Icon name="user" size={20} /></span>
            <span><small>Acesso rápido</small>Sou paciente</span>
            <Icon name="arrow" size={19} />
          </button>
        </nav>
      </header>

      <section className="landing-grid">
        <div className="hero-panel">
          <div className="hero-content">
            <div className="eyebrow light"><span className="pulse-dot" /> Cuidado que continua em casa</div>
            <h1>Movimento que aproxima. <em>Cuidado que transforma.</em></h1>
            <p>Reabilitação motora inteligente para você acompanhar a evolução dos seus pacientes, mesmo à distância.</p>
            <div className="hero-benefits">
              <div><span><Icon name="eye" size={22} /></span><p><strong>Acompanhamento em tempo real</strong><small>Visibilidade sobre cada movimento.</small></p></div>
              <div><span><Icon name="trend" size={22} /></span><p><strong>Evolução baseada em dados</strong><small>Métricas claras para decisões seguras.</small></p></div>
              <div><span><Icon name="shield" size={22} /></span><p><strong>Segurança para todos</strong><small>Feedbacks que orientam e protegem.</small></p></div>
            </div>
          </div>
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-stat">
            <span className="stat-icon"><Icon name="spark" size={22} /></span>
            <p><strong>94%</strong><small>de adesão aos treinos</small></p>
            <span className="stat-up">+12%</span>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-wrap">
            <div className="eyebrow"><span className="eyebrow-icon"><Icon name="heart" size={15} /></span> Portal do fisioterapeuta</div>
            <h2>{mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta profissional'}</h2>
            <p className="auth-lead">{mode === 'login' ? 'Acesse seu painel e continue cuidando de quem confia em você.' : 'Comece a acompanhar seus pacientes de forma mais próxima e segura.'}</p>

            <div className="auth-tabs">
              <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Entrar</button>
              <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Criar conta</button>
            </div>

            <form onSubmit={submit}>
              {mode === 'register' && <Field label="Nome completo" placeholder="Como podemos chamar você?" icon="user" />}
              <Field label="E-mail profissional" placeholder="voce@clinica.com.br" icon="mail" type="email" />
              {mode === 'register' && <Field label="CREFITO" placeholder="Ex: 123456-F" icon="clipboard" />}
              <Field label="Senha" placeholder="Digite sua senha" icon="lock" type="password" />
              <div className="form-meta">
                <label className="remember"><input type="checkbox" /> <span>Lembrar de mim</span></label>
                <button type="button">Esqueci minha senha</button>
              </div>
              <button className="primary-button full" type="submit">
                {mode === 'login' ? 'Acessar meu painel' : 'Criar minha conta'} <Icon name="arrow" />
              </button>
            </form>
            <p className="secure-note"><Icon name="shield" size={17} /> Seus dados estão protegidos e seguros.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

const patients = [
  { initials: 'MS', name: 'Maria da Silva', detail: 'Joelho • 3x/sem', tone: 'mint' },
  { initials: 'JC', name: 'João Carlos', detail: 'Ombro • 2x/sem', tone: 'blue' },
  { initials: 'AR', name: 'Ana Ribeiro', detail: 'Quadril • 3x/sem', tone: 'purple' },
  { initials: 'LP', name: 'Luiz Pereira', detail: 'Coluna • 2x/sem', tone: 'orange' },
]

function Sidebar({ goTo }: { goTo: (screen: Screen) => void }) {
  return (
    <aside className="sidebar">
      <Logo onClick={() => goTo('landing')} />
      <nav className="side-nav">
        <button className="active"><Icon name="home" /><span>Visão geral</span></button>
        <button><Icon name="users" /><span>Pacientes</span><b>4</b></button>
        <button><Icon name="clipboard" /><span>Exercícios</span></button>
        <button><Icon name="trend" /><span>Relatórios</span></button>
      </nav>
      <div className="side-help">
        <span><Icon name="heart" size={22} /></span>
        <strong>Precisa de ajuda?</strong>
        <p>Nossa equipe está pronta para você.</p>
        <button>Falar com suporte</button>
      </div>
      <div className="side-profile">
        <span className="avatar">CL</span>
        <p><strong>Carolina Lima</strong><small>Fisioterapeuta</small></p>
        <button aria-label="Sair" onClick={() => goTo('landing')}><Icon name="logout" /></button>
      </div>
    </aside>
  )
}

function AddPatientModal({ close }: { close: () => void }) {
  const [created, setCreated] = useState(false)
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="patient-modal-title">
        <button className="modal-close" onClick={close} aria-label="Fechar"><Icon name="close" /></button>
        {!created ? (
          <>
            <span className="modal-icon"><Icon name="user" size={26} /></span>
            <h2 id="patient-modal-title">Cadastrar novo paciente</h2>
            <p>Adicione os dados essenciais. O código de acesso será gerado automaticamente.</p>
            <div className="two-fields">
              <Field label="Nome completo" placeholder="Nome do paciente" icon="user" />
              <Field label="Data de nascimento" placeholder="DD/MM/AAAA" icon="calendar" />
            </div>
            <Field label="Foco da reabilitação" placeholder="Ex: Mobilidade de joelho" icon="clipboard" />
            <button className="primary-button full" onClick={() => setCreated(true)}>Cadastrar e gerar código <Icon name="arrow" /></button>
          </>
        ) : (
          <div className="code-success">
            <span className="success-ring"><Icon name="check" size={32} /></span>
            <h2 id="patient-modal-title">Paciente cadastrado!</h2>
            <p>Envie este código para o acesso aos exercícios.</p>
            <div className="generated-code">CINE-7429</div>
            <button className="primary-button full" onClick={close}>Concluir <Icon name="check" /></button>
          </div>
        )}
      </section>
    </div>
  )
}

function PrescriptionModal({ close }: { close: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal prescription-modal" role="dialog" aria-modal="true" aria-labelledby="prescription-title">
        <button className="modal-close" onClick={close} aria-label="Fechar"><Icon name="close" /></button>
        <span className="modal-icon"><Icon name="clipboard" size={26} /></span>
        <h2 id="prescription-title">Nova prescrição funcional</h2>
        <p>Configure o próximo treino de Maria da Silva.</p>
        <label className="field"><span>Exercício</span><span className="select-control"><select defaultValue="sit"><option value="sit">Sentar e levantar da cadeira</option><option>Elevação lateral dos braços</option><option>Marcha estacionária</option></select><Icon name="chevron" size={18} /></span></label>
        <div className="two-fields compact">
          <label className="field"><span>Número de séries</span><input className="plain-input" type="number" defaultValue="3" min="1" /></label>
          <label className="field"><span>Repetições-alvo</span><input className="plain-input" type="number" defaultValue="10" min="1" /></label>
        </div>
        <label className="field"><span>Orientações clínicas</span><textarea placeholder="Ex: Manter os pés alinhados e evitar inclinar o tronco..." /></label>
        <button className="primary-button full" onClick={close}>Salvar prescrição <Icon name="check" /></button>
      </section>
    </div>
  )
}

function Dashboard({ goTo }: { goTo: (screen: Screen) => void }) {
  const [modal, setModal] = useState<'patient' | 'prescription' | null>(null)

  return (
    <div className="app-shell">
      <Sidebar goTo={goTo} />
      <main className="dashboard">
        <header className="dashboard-header">
          <button className="mobile-menu" aria-label="Abrir menu"><Icon name="menu" /></button>
          <div><p>Terça-feira, 18 de junho</p><h1>Bom dia, Carolina.</h1></div>
          <div className="header-actions">
            <label className="search"><Icon name="search" size={19} /><input placeholder="Buscar paciente..." /></label>
            <button className="primary-button" onClick={() => setModal('patient')}><Icon name="plus" /> Cadastrar paciente</button>
          </div>
        </header>

        <section className="metrics-grid">
          <article className="metric-card">
            <div className="metric-head"><span className="metric-icon green"><Icon name="users" /></span><span className="positive">+2 este mês</span></div>
            <p>Pacientes ativos</p><strong>24</strong><small>3 precisam de atenção</small>
          </article>
          <article className="metric-card">
            <div className="metric-head"><span className="metric-icon dark"><Icon name="clipboard" /></span><span className="positive">+18%</span></div>
            <p>Treinos concluídos</p><strong>186</strong><small>Nos últimos 30 dias</small>
          </article>
          <article className="metric-card">
            <div className="metric-head"><span className="metric-icon amber"><Icon name="shield" /></span><span className="positive">+4,2%</span></div>
            <p>Conformidade média</p><strong>91%</strong><small>Movimentos seguros</small>
          </article>
          <article className="metric-card highlighted">
            <div className="metric-head"><span className="metric-icon white"><Icon name="trend" /></span><span className="light-pill">Muito bom</span></div>
            <p>Evolução geral</p><strong>+14%</strong><small>Comparado ao mês anterior</small>
          </article>
        </section>

        <section className="dashboard-content">
          <div className="main-column">
            <article className="panel performance-panel">
              <div className="panel-heading">
                <div><h2>Desempenho dos pacientes</h2><p>Conformidade postural nos últimos 7 dias</p></div>
                <button className="period-button">Últimos 7 dias <Icon name="chevron" size={16} /></button>
              </div>
              <div className="chart-wrap">
                <div className="chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
                <div className="chart">
                  <div className="chart-grid-lines"><i /><i /><i /><i /><i /></div>
                  <svg viewBox="0 0 700 190" preserveAspectRatio="none" aria-label="Gráfico de conformidade postural">
                    <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00b4d8" stopOpacity=".22"/><stop offset="100%" stopColor="#00b4d8" stopOpacity="0"/></linearGradient></defs>
                    <path className="area" d="M0,145 C55,135 75,105 125,115 S205,95 240,92 S330,118 360,85 S430,72 470,77 S550,38 590,53 S660,28 700,38 L700,190 L0,190Z"/>
                    <path className="line" d="M0,145 C55,135 75,105 125,115 S205,95 240,92 S330,118 360,85 S430,72 470,77 S550,38 590,53 S660,28 700,38"/>
                    {[['0','145'],['125','115'],['240','92'],['360','85'],['470','77'],['590','53'],['700','38']].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="4.5" />)}
                  </svg>
                  <div className="chart-days"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span></div>
                </div>
              </div>
            </article>

            <article className="panel sessions-panel">
              <div className="panel-heading">
                <div><h2>Sessões recentes</h2><p>Acompanhe os últimos treinos realizados</p></div>
                <button className="link-button">Ver todas <Icon name="arrow" size={17} /></button>
              </div>
              <div className="session-table">
                <div className="table-row table-head"><span>Paciente</span><span>Exercício</span><span>Progresso</span><span>Status</span><span /></div>
                {[
                  { name: 'Maria da Silva', initials: 'MS', ex: 'Sentar e levantar', progress: '3/3 séries', status: 'Seguro', tone: 'safe' },
                  { name: 'João Carlos', initials: 'JC', ex: 'Elevação de braço', progress: '2/3 séries', status: 'Atenção', tone: 'attention' },
                  { name: 'Ana Ribeiro', initials: 'AR', ex: 'Marcha estacionária', progress: '3/3 séries', status: 'Seguro', tone: 'safe' },
                  { name: 'Luiz Pereira', initials: 'LP', ex: 'Extensão lombar', progress: '1/3 séries', status: 'Crítico', tone: 'critical' },
                ].map((session) => (
                  <div className="table-row" key={session.name}>
                    <span className="patient-cell"><b className="tiny-avatar">{session.initials}</b><span><strong>{session.name}</strong><small>Hoje, 09:42</small></span></span>
                    <span>{session.ex}</span><span>{session.progress}</span>
                    <span><b className={`status ${session.tone}`}>{session.status}</b></span>
                    <button aria-label={`Ver sessão de ${session.name}`}><Icon name="chevron" size={18} /></button>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="right-column">
            <article className="panel patients-panel">
              <div className="panel-heading"><div><h2>Pacientes ativos</h2><p>4 em acompanhamento</p></div><button className="icon-button"><Icon name="plus" /></button></div>
              <div className="patient-list">
                {patients.map((patient, index) => (
                  <button key={patient.name} className={index === 0 ? 'selected' : ''}>
                    <span className={`patient-avatar ${patient.tone}`}>{patient.initials}</span>
                    <span><strong>{patient.name}</strong><small>{patient.detail}</small></span>
                    <Icon name="chevron" size={17} />
                  </button>
                ))}
              </div>
              <button className="outline-button full">Ver todos os pacientes</button>
            </article>

            <article className="next-session">
              <div className="next-top"><span><Icon name="calendar" /></span><p><small>Próxima sessão</small><strong>Hoje, 14:30</strong></p></div>
              <h3>Maria da Silva</h3>
              <p>Reabilitação de joelho</p>
              <div className="code-row"><span>Código de acesso</span><strong>CINE-7429</strong></div>
            </article>

            <button className="prescribe-card" onClick={() => setModal('prescription')}>
              <span><Icon name="plus" /></span>
              <p><strong>Nova prescrição</strong><small>Prepare o próximo exercício</small></p>
              <Icon name="arrow" />
            </button>
          </aside>
        </section>
      </main>
      {modal === 'patient' && <AddPatientModal close={() => setModal(null)} />}
      {modal === 'prescription' && <PrescriptionModal close={() => setModal(null)} />}
    </div>
  )
}

function Access({ goTo }: { goTo: (screen: Screen) => void }) {
  const [code, setCode] = useState('')
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'ABC', '0', '⌫']
  const typeKey = (key: string) => {
    if (key === '⌫') setCode((current) => current.slice(0, -1))
    else if (key !== 'ABC' && code.length < 8) setCode((current) => current + key)
  }

  return (
    <main className="access-page">
      <header className="patient-header"><Logo onClick={() => goTo('landing')} /><button onClick={() => goTo('landing')}><Icon name="arrow" size={18} /> Voltar</button></header>
      <section className="access-card">
        <span className="access-icon"><Icon name="user" size={34} /></span>
        <p className="access-kicker">Olá, que bom ter você aqui!</p>
        <h1>Digite seu código de acesso</h1>
        <p className="access-lead">Ele foi enviado pelo seu fisioterapeuta e tem letras e números.</p>
        <label className="code-input">
          <span>Seu código</span>
          <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 9))} placeholder="CINE-7429" maxLength={9} autoFocus />
        </label>
        <div className="virtual-keyboard">
          {keys.map((key) => <button key={key} className={key === 'ABC' ? 'letters-key' : ''} onClick={() => typeKey(key)}>{key === '⌫' ? <Icon name="arrow" /> : key}</button>)}
        </div>
        <button className="primary-button access-submit" onClick={() => goTo('training')}>Acessar meus exercícios <Icon name="arrow" size={24} /></button>
        <p className="help-line"><Icon name="info" size={20} /> Não encontrou o código? <button>Peça ajuda ao seu fisioterapeuta</button></p>
      </section>
      <footer className="access-footer"><Icon name="shield" size={18} /> Ambiente seguro e protegido</footer>
    </main>
  )
}

function PostureFigure() {
  return (
    <svg className="posture-figure" viewBox="0 0 300 300" aria-label="Ilustração de postura correta ao sentar e levantar">
      <circle cx="150" cy="150" r="132" fill="#e6fbff"/>
      <circle cx="150" cy="150" r="105" fill="#caf0f8"/>
      <path d="M92 211h104M105 211v-62h90v62" fill="none" stroke="#023e8a" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="150" cy="79" r="24" fill="#f2c9a5"/>
      <path d="M130 106c12-8 30-9 41 0l12 49-62 1 9-50Z" fill="#00b4d8"/>
      <path d="M122 120 95 152M177 120l25 31" fill="none" stroke="#f2c9a5" strokeWidth="13" strokeLinecap="round"/>
      <path d="M135 153 118 211M164 153l20 58" fill="none" stroke="#173f37" strokeWidth="15" strokeLinecap="round"/>
      <path d="M124 210h-26M181 210h25" fill="none" stroke="#0a0a0a" strokeWidth="10" strokeLinecap="round"/>
      <path d="M150 109v46" stroke="white" strokeWidth="3" strokeDasharray="5 5"/>
      <circle cx="228" cy="77" r="24" fill="#0096c7"/><path d="m217 77 7 7 14-16" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Training({ goTo }: { goTo: (screen: Screen) => void }) {
  const [reps, setReps] = useState(8)
  const isSafe = reps % 4 !== 1
  return (
    <main className="training-page">
      <header className="training-header">
        <Logo onClick={() => goTo('access')} />
        <div className="training-person"><span className="avatar">MS</span><p><small>Treino de hoje</small><strong>Dona Maria da Silva</strong></p></div>
        <button className="exit-button" onClick={() => goTo('access')}><Icon name="logout" /> Sair</button>
      </header>
      <section className="exercise-title">
        <div><span className="exercise-index">1</span><p><small>Exercício atual</small><h1>Sentar e levantar da cadeira</h1></p></div>
        <div className="goal-pill"><Icon name="clipboard" /><span><small>Sua meta</small><strong>3 séries de 10</strong></span></div>
      </section>

      <section className="training-layout">
        <article className="posture-card">
          <div className="posture-head"><span><Icon name="eye" /> Observe a postura</span><small>Siga o movimento com calma</small></div>
          <button className="figure-button" onClick={() => setReps((r) => Math.min(10, r + 1))} aria-label="Registrar uma repetição">
            <PostureFigure />
            <span>Toque na ilustração para registrar</span>
          </button>
          <div className="posture-tips">
            <span><Icon name="check" /><small>Pés firmes<br/>no chão</small></span>
            <span><Icon name="check" /><small>Olhar para<br/>a frente</small></span>
            <span><Icon name="check" /><small>Suba<br/>devagar</small></span>
          </div>
        </article>

        <div className="training-stats">
          <article className="counter-card">
            <p>Repetições nesta série</p>
            <div className="counter"><strong>{reps}</strong><span>/ 10</span></div>
            <div className="progress-track"><span style={{ width: `${reps * 10}%` }} /></div>
            <small>Você está quase lá!</small>
          </article>
          <article className={`feedback-card ${isSafe ? 'safe' : 'danger'}`}>
            <span className="feedback-icon"><Icon name={isSafe ? 'check' : 'warning'} size={34} /></span>
            <div><small>Feedback da postura</small><h2>{isSafe ? 'Movimento seguro' : 'Endireite a coluna'}</h2><p>{isSafe ? 'Continue assim, seu movimento está ótimo.' : 'Levante o peito e olhe para a frente.'}</p></div>
          </article>
          <article className="series-card">
            <div><span>Série atual</span><strong>1 de 3</strong></div>
            <div className="series-dots"><i className="active" /><i /><i /></div>
          </article>
        </div>
      </section>

      <footer className="training-controls">
        <button className="reset-button" onClick={() => setReps(0)}><Icon name="refresh" size={23} /> Reiniciar contador</button>
        <button className="finish-button" onClick={() => goTo('summary')}>Finalizar exercício <Icon name="check" size={24} /></button>
      </footer>
    </main>
  )
}

function Summary({ goTo }: { goTo: (screen: Screen) => void }) {
  return (
    <main className="summary-page">
      <header className="summary-header"><Logo /><span><Icon name="shield" size={18} /> Resultado enviado com segurança</span></header>
      <section className="summary-content">
        <div className="celebration">
          <div className="success-medal"><Icon name="check" size={48} /></div>
          <p className="access-kicker">Exercício concluído</p>
          <h1>Parabéns, Dona Maria!</h1>
          <p>Você completou seu treino de hoje. Cada movimento é um passo importante na sua recuperação.</p>
        </div>
        <div className="summary-grid">
          <article><span className="summary-icon green"><Icon name="check" /></span><p><small>Repetições concluídas</small><strong>30 <em>/ 30</em></strong></p></article>
          <article><span className="summary-icon blue"><Icon name="clock" /></span><p><small>Tempo total</small><strong>08:42</strong></p></article>
          <article><span className="summary-icon amber"><Icon name="warning" /></span><p><small>Compensações observadas</small><strong>2 <em>leves</em></strong></p></article>
        </div>
        <article className="quality-card">
          <div className="quality-score"><span><strong>93</strong><small>/100</small></span><p>Excelente</p></div>
          <div><span className="eyebrow"><Icon name="spark" size={16} /> Qualidade do movimento</span><h2>Ótimo controle postural</h2><p>Você manteve uma postura segura durante quase todo o exercício. Continue prestando atenção ao alinhamento da coluna.</p></div>
        </article>
        <div className="sent-banner"><span><Icon name="shield" size={28} /></span><p><strong>Seu resultado já foi enviado</strong><small>A fisioterapeuta Carolina poderá acompanhar sua evolução.</small></p><Icon name="check" /></div>
        <button className="primary-button summary-button" onClick={() => goTo('access')}>Voltar aos meus exercícios <Icon name="arrow" /></button>
      </section>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  if (screen === 'dashboard') return <Dashboard goTo={setScreen} />
  if (screen === 'access') return <Access goTo={setScreen} />
  if (screen === 'training') return <Training goTo={setScreen} />
  if (screen === 'summary') return <Summary goTo={setScreen} />
  return <Landing goTo={setScreen} />
}
