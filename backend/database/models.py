from datetime import datetime
import string
import random
from werkzeug.security import generate_password_hash, check_password_hash
from backend.database.config import db

def gerar_codigo_acesso(tamanho=6):
    caracteres = string.ascii_uppercase + string.digits
    return f"CINE-{''.join(random.choices(caracteres, k=tamanho))}"

class Fisioterapeuta(db.Model):
    __tablename__ = 'fisioterapeutas'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    crefito = db.Column(db.String(30), unique=True, nullable=False)
    senha_hash = db.Column(db.String(255), nullable=False)
    criado_em = db.Column(db.DateTime, default=datetime.now)

    pacientes = db.relationship('Paciente', backref='fisioterapeuta', lazy=True)

    def set_senha(self, senha: str):
        self.senha_hash = generate_password_hash(senha)

    def verificar_senha(self, senha: str) -> bool:
        return check_password_hash(self.senha_hash, senha)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "crefito": self.crefito
        }

class Paciente(db.Model):
    __tablename__ = 'pacientes'
    id = db.Column(db.Integer, primary_key=True)
    fisioterapeuta_id = db.Column(db.Integer, db.ForeignKey('fisioterapeutas.id'), nullable=False)
    nome = db.Column(db.String(100), nullable=False)
    idade = db.Column(db.Integer, nullable=False)
    observacoes_clinicas = db.Column(db.Text, default="")
    codigo_acesso = db.Column(db.String(20), unique=True, default=gerar_codigo_acesso)
    criado_em = db.Column(db.DateTime, default=datetime.now)

    planos = db.relationship('PlanoTreino', backref='paciente', cascade="all, delete-orphan", lazy=True)
    sessoes = db.relationship('SessaoExecucao', backref='paciente', cascade="all, delete-orphan", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "fisioterapeuta_id": self.fisioterapeuta_id,
            "nome": self.nome,
            "idade": self.idade,
            "codigo_acesso": self.codigo_acesso,
            "observacoes_clinicas": self.observacoes_clinicas
        }

class PlanoTreino(db.Model):
    __tablename__ = 'planos_treino'
    id = db.Column(db.Integer, primary_key=True)
    paciente_id = db.Column(db.Integer, db.ForeignKey('pacientes.id'), nullable=False)
    exercicio_nome = db.Column(db.String(100), nullable=False)
    series_alvo = db.Column(db.Integer, default=3)
    repeticoes_alvo = db.Column(db.Integer, default=10)
    instrucoes = db.Column(db.String(255), default="Mantenha a coluna ereta e os pés apoiados.")

    def to_dict(self):
        return {
            "id": self.id,
            "exercicio": self.exercicio_nome,
            "series_alvo": self.series_alvo,
            "repeticoes_alvo": self.repeticoes_alvo,
            "instrucoes": self.instrucoes
        }

class SessaoExecucao(db.Model):
    __tablename__ = 'sessoes_execucao'
    id = db.Column(db.Integer, primary_key=True)
    paciente_id = db.Column(db.Integer, db.ForeignKey('pacientes.id'), nullable=False)
    exercicio = db.Column(db.String(100), nullable=False)
    data_hora = db.Column(db.DateTime, default=datetime.now)
    repeticoes_feitas = db.Column(db.Integer, nullable=False)
    repeticoes_alvo = db.Column(db.Integer, nullable=False)
    desvios_posturais = db.Column(db.Integer, default=0)
    tempo_duracao_segundos = db.Column(db.Integer, default=0)
    classificacao_postural = db.Column(db.String(20), nullable=False) # 'Seguro', 'Atenção', 'Crítico'

    def to_dict(self):
        return {
            "id": self.id,
            "paciente_id": self.paciente_id,
            "exercicio": self.exercicio,
            "data_hora": self.data_hora.strftime("%d/%m/%Y %H:%M:%S"),
            "repeticoes_feitas": self.repeticoes_feitas,
            "repeticoes_alvo": self.repeticoes_alvo,
            "desvios_posturais": self.desvios_posturais,
            "duracao_segundos": self.tempo_duracao_segundos,
            "classificacao_postural": self.classificacao_postural
        }