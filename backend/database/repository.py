from typing import Optional, List
from backend.database.config import db
from backend.database.models import Fisioterapeuta, Paciente, PlanoTreino, SessaoExecucao

class ClinicalRepository:
    # --- Fisioterapeuta ---
    @staticmethod
    def get_fisio_by_email(email: str) -> Optional[Fisioterapeuta]:
        return Fisioterapeuta.query.filter_by(email=email).first()

    @staticmethod
    def create_fisio(nome: str, email: str, crefito: str, senha: str) -> Fisioterapeuta:
        fisio = Fisioterapeuta(nome=nome, email=email, crefito=crefito)
        fisio.set_senha(senha)
        db.session.add(fisio)
        db.session.commit()
        return fisio

    # --- Paciente & Acesso ---
    @staticmethod
    def create_paciente(fisio_id: int, nome: str, idade: int, obs: str = "") -> Paciente:
        paciente = Paciente(fisioterapeuta_id=fisio_id, nome=nome, idade=idade, observacoes_clinicas=obs)
        db.session.add(paciente)
        db.session.commit()
        return paciente

    @staticmethod
    def get_paciente_by_codigo(codigo: str) -> Optional[Paciente]:
        return Paciente.query.filter_by(codigo_acesso=codigo.strip().upper()).first()

    @staticmethod
    def get_paciente_by_id(paciente_id: int) -> Optional[Paciente]:
        return Paciente.query.get(paciente_id)

    # --- Plano de Treino ---
    @staticmethod
    def add_plano_treino(paciente_id: int, exercicio: str, series: int, reps: int, instrucoes: str) -> PlanoTreino:
        plano = PlanoTreino(
            paciente_id=paciente_id,
            exercicio_nome=exercicio,
            series_alvo=series,
            repeticoes_alvo=reps,
            instrucoes=instrucoes
        )
        db.session.add(plano)
        db.session.commit()
        return plano

    # --- Sessão e Telemetria ---
    @staticmethod
    def record_session(paciente_id: int, exercicio: str, reps_feitas: int, reps_alvo: int, desvios: int, duracao: int) -> SessaoExecucao:
        if desvios <= 2:
            classificacao = "Seguro"
        elif desvios <= 6:
            classificacao = "Atenção"
        else:
            classificacao = "Crítico"

        sessao = SessaoExecucao(
            paciente_id=paciente_id,
            exercicio=exercicio,
            repeticoes_feitas=reps_feitas,
            repeticoes_alvo=reps_alvo,
            desvios_posturais=desvios,
            tempo_duracao_segundos=duracao,
            classificacao_postural=classificacao
        )
        db.session.add(sessao)
        db.session.commit()
        return sessao

    @staticmethod
    def get_relatorio_paciente(paciente_id: int) -> List[SessaoExecucao]:
        return SessaoExecucao.query.filter_by(paciente_id=paciente_id).order_by(SessaoExecucao.data_hora.desc()).all()