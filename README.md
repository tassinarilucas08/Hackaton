SUStente-se

Protótipo desenvolvido para o Hackathon | Saúde Conectada (IFSul Campus Charqueadas)

Solução de telessaúde e monitorização funcional domiciliar para pessoas idosas, combinando visão computacional e acompanhamento profissional integrado à Atenção Primária.

📌 Sobre o Projeto

O envelhecimento populacional e a prevalência de limitações funcionais exigem novas formas de manter a continuidade do cuidado entre as consultas presenciais. Esta aplicação transforma uma câmara convencional numa ferramenta de monitorização domiciliar: o utente realiza exercícios funcionais guiados em casa, enquanto o sistema deteta pontos-chave do corpo, calcula ângulos articulares e acompanha as fases do movimento em tempo real.

Os dados gerados estruturam relatórios objetivos que apoiam a equipa de saúde da Unidade Básica de Saúde (UBS) no seguimento assíncrono, otimizando o tempo profissional e priorizando revisões e contactos conforme as diretrizes do serviço.

🚀 Funcionalidades Principais

Rastreamento Biomecânico Simultâneo: Monitorização de dois testes funcionais fundamentais para idosos:

Sentar e Levantar da Cadeira: Contagem de repetições, deteção de fases do movimento e vigilância postural contínua da coluna e inclinação do tronco.

Flexão de Braço (Arm Curl): Contagem de repetições e validação de desvios posturais (como o desalinhamento ou afastamento do cotovelo em relação ao tronco).

Modo Adaptativo de Enquadramento: Ajuste automático de cálculo de ângulos com base na visibilidade do tornozelo ou do quadril.

Feedback Visual e Sonoro (HUD): Alertas coloridos em tempo real para orientar o utilizador (postura correta em verde, alertas de risco em vermelho e fases de transição em laranja).

Painel de Controlo e Dados Estruturados: Arquitetura pronta para integração com backend Flask e geração de relatórios para os profissionais de saúde.

🛠️ Stack Tecnológica

Linguagem: Python 3.11

Visão Computacional e Interface: OpenCV (cv2) para renderização de HUD e gestão de fluxo de vídeo.

Inteligência Artificial (Pose Estimation): MediaPipe Pose (model_complexity=1, visibilidade adaptativa).

Computação Numérica: NumPy para cálculos trigonométricos avançados de ângulos articulares.

Identidade Visual: Paleta Azul Caribe para apresentações e pitch, com foco em alta acessibilidade visual (alto contraste WCAG).

📂 Estrutura do Repositório

├── pose_engine_3.py      # Motor principal de visão computacional e lógica de estados
├── requirements.txt      # Dependências do projeto (OpenCV, MediaPipe, NumPy)
└── README.md             # Documentação oficial do projeto


⚙️ Como Executar o Protótipo Localmente

Pré-requisitos:
Certifique-se de ter o Python 3.11 instalado no seu computador e uma webcam funcional conectada.

Clonar o repositório:

git clone https://github.com/seu-utilizador/reabilitacao-motora-conectada.git
cd reabilitacao-motora-conectada


Instalar as dependências:

pip install opencv-python mediapipe numpy


Executar o motor de pose:

python pose_engine_3.py


Controlo na Janela:

Posicione-se de perfil para a câmara (assegurando que o tronco, quadril e joelhos/braços fiquem visíveis).

Pressione a tecla q a qualquer momento para encerrar a aplicação e fechar a câmara.

🛡️ Limites, Ética e Segurança

Ferramenta Complementar: Este protótipo não substitui fisioterapeutas, avaliações clínicas presenciais, diagnóstico ou decisões de encaminhamento.

Contexto Doméstico: A precisão da estimativa de ângulos depende de fatores ambientais como iluminação, vestuário e posicionamento da câmara.

Privacidade: O desenho de implantação deve seguir rigorosamente os princípios de minimização de dados, controlo de acesso e conformidade com as normativas de proteção de dados e privacidade em saúde.

👥 Equipa & Contexto

Projeto desenvolvido no âmbito da 10ª Edição da Hackathon do IFSul (Campus Charqueadas), com foco em inovação social, tecnologia aplicada à saúde pública e melhoria da qualidade de vida da pessoa idosa.
