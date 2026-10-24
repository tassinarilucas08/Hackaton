from flask import Flask, request, jsonify
from backend.database.config import db
from backend.database.repository import ClinicalRepository

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cinesiacare.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    # -------------------------------------------------------------
    # 1. AUTENTICAÇÃO DO FISIOTERAPEUTA
    # -------------------------------------------------------------

    @app.route('/api/fisio/cadastro', methods=['POST'])
    def cadastro_fisio():
        data = request.get_json() or {}
        campos = ['nome', 'email', 'crefito', 'senha']
        if not all(c in data for c in campos):
            return jsonify({"erro": "Campos obrigatórios: nome, email, crefito e senha."}), 400

        if ClinicalRepository.get_fisio_by_email(data['email']):
            return jsonify({"erro": "E-mail já cadastrado."}), 409

        fisio = ClinicalRepository.create_fisio(
            nome=data['nome'],
            email=data['email'],
            crefito=data['crefito'],
            senha=data['senha']
        )
        return jsonify({"mensagem": "Fisioterapeuta cadastrado com sucesso!", "dados": fisio.to_dict()}), 201

    @app.route('/api/fisio/login', methods=['POST'])
    def login_fisio():
        data = request.get_json() or {}
        email = data.get('email')
        senha = data.get('senha')

        if not email or not senha:
            return jsonify({"erro": "Informe e-mail e senha."}), 400

        fisio = ClinicalRepository.get_fisio_by_email(email)
        if not fisio or not fisio.verificar_senha(senha):
            return jsonify({"erro": "Credenciais inválidas."}), 401

        return jsonify({
            "mensagem": "Login realizado com sucesso!",
            "fisio": fisio.to_dict()
        }), 200

    # -------------------------------------------------------------
    # 2. GESTÃO DE PACIENTES E PRESCRIÇÃO (PELO FISIOTERAPEUTA)
    # -------------------------------------------------------------

    @app.route('/api/fisio/paciente', methods=['POST'])
    def cadastrar_paciente():
        data = request.get_json() or {}
        fisio_id = data.get('fisioterapeuta_id')
        nome = data.get('nome')
        idade = data.get('idade')
        obs = data.get('observacoes_clinicas', '')

        if not fisio_id or not nome or not idade:
            return jsonify({"erro": "Campos obrigatórios: fisioterapeuta_id, nome e idade."}), 400

        paciente = ClinicalRepository.create_paciente(fisio_id, nome, idade, obs)
        return jsonify({
            "mensagem": "Paciente cadastrado com sucesso!",
            "codigo_gerado": paciente.codigo_acesso,
            "paciente": paciente.to_dict()
        }), 201

    @app.route('/api/fisio/prescrever', methods=['POST'])
    def prescrever_treino():
        data = request.get_json() or {}
        paciente_id = data.get('paciente_id')
        exercicio = data.get('exercicio')
        series = data.get('series_alvo', 3)
        reps = data.get('repeticoes_alvo', 10)
        instrucoes = data.get('instrucoes', 'Executar com movimentos controlados.')

        if not paciente_id or not exercicio:
            return jsonify({"erro": "Informe paciente_id e exercicio."}), 400

        plano = ClinicalRepository.add_plano_treino(paciente_id, exercicio, series, reps, instrucoes)
        return jsonify({"mensagem": "Exercício prescrito com sucesso!", "plano": plano.to_dict()}), 201

    # -------------------------------------------------------------
    # 3. ACESSO DO IDOSO VIA CÓDIGO & LISTA DE EXERCÍCIOS
    # -------------------------------------------------------------

    @app.route('/api/paciente/acesso', methods=['POST'])
    def login_paciente_por_codigo():
        data = request.get_json() or {}
        codigo = data.get('codigo_acesso', '')

        if not codigo:
            return jsonify({"erro": "Informe o código de acesso."}), 400

        paciente = ClinicalRepository.get_paciente_by_codigo(codigo)
        if not paciente:
            return jsonify({"erro": "Código de acesso não encontrado ou inválido."}), 404

        exercicios = [p.to_dict() for p in paciente.planos]

        return jsonify({
            "mensagem": f"Bem-vindo(a), {paciente.nome}!",
            "paciente_id": paciente.id,
            "nome": paciente.nome,
            "idade": paciente.idade,
            "exercicios_prescritos": exercicios
        }), 200

    # -------------------------------------------------------------
    # 4. REGISTRO DE ACOMPANHAMENTO VIRTUAL (TELEMETRIA DA SESSÃO)
    # -------------------------------------------------------------

    @app.route('/api/sessao/registrar', methods=['POST'])
    def registrar_sessao():
        data = request.get_json() or {}
        paciente_id = data.get('paciente_id')
        exercicio = data.get('exercicio')
        reps_feitas = data.get('repeticoes_feitas')
        reps_alvo = data.get('repeticoes_alvo', 10)
        desvios = data.get('desvios_posturais', 0)
        duracao = data.get('tempo_duracao_segundos', 0)

        if not paciente_id or not exercicio or reps_feitas is None:
            return jsonify({"erro": "Dados insuficientes: paciente_id, exercicio e repeticoes_feitas são obrigatórios."}), 400

        sessao = ClinicalRepository.record_session(
            paciente_id=paciente_id,
            exercicio=exercicio,
            reps_feitas=reps_feitas,
            reps_alvo=reps_alvo,
            desvios=desvios,
            duracao=duracao
        )

        return jsonify({
            "mensagem": "Sessão registrada com sucesso no prontuário!",
            "resultado": sessao.to_dict()
        }), 201

    # -------------------------------------------------------------
    # 5. RELATÓRIO CLÍNICO DOS MOVIMENTOS DO PACIENTE
    # -------------------------------------------------------------

    @app.route('/api/relatorio/<int:paciente_id>', methods=['GET'])
    def gerar_relatorio_movimentos(paciente_id):
        paciente = ClinicalRepository.get_paciente_by_id(paciente_id)
        if not paciente:
            return jsonify({"erro": "Paciente não encontrado."}), 404

        sessoes = ClinicalRepository.get_relatorio_paciente(paciente_id)
        total_sessoes = len(sessoes)
        total_reps = sum(s.repeticoes_feitas for s in sessoes)
        total_desvios = sum(s.desvios_posturais for s in sessoes)

        # Taxa de conformidade média (quantas repetições foram concluídas versus o alvo)
        conformidade_media = 0
        if total_sessoes > 0:
            taxas = [(s.repeticoes_feitas / s.repeticoes_alvo) * 100 for s in sessoes if s.repeticoes_alvo > 0]
            conformidade_media = round(sum(taxas) / len(taxas), 1)

        return jsonify({
            "paciente": paciente.nome,
            "idade": paciente.idade,
            "codigo_acesso": paciente.codigo_acesso,
            "resumo_clinico": {
                "total_treinos": total_sessoes,
                "total_repeticoes": total_reps,
                "total_desvios_posturais": total_desvios,
                "taxa_conformidade_media_pct": conformidade_media
            },
            "historico_detalhado": [s.to_dict() for s in sessoes]
        }), 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=False)