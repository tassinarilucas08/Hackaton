import urllib.request
import json

BASE = "http://127.0.0.1:5000/api"

def call(endpoint, method="GET", payload=None):
    url = f"{BASE}{endpoint}"
    data = json.dumps(payload).encode('utf-8') if payload else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(req) as res:
            return res.status, json.loads(res.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode('utf-8'))

print("=== 1. TESTANDO CADASTRO E LOGIN DO FISIO ===")
_, fisio = call("/fisio/cadastro", "POST", {
    "nome": "Dr. Lucas Silva",
    "email": "lucas.fisio@teste.com",
    "crefito": "998877-F",
    "senha": "senha123"
})
print("Cadastro:", fisio)

_, login = call("/fisio/login", "POST", {
    "email": "lucas.fisio@teste.com",
    "senha": "senha123"
})
print("Login:", login)

print("\n=== 2. CADASTRANDO PACIENTE E GERANDO CÓDIGO ===")
fisio_id = fisio.get("dados", {}).get("id", 1)
_, paciente = call("/fisio/paciente", "POST", {
    "fisioterapeuta_id": fisio_id,
    "nome": "Dona Francisca",
    "idade": 72,
    "observacoes_clinicas": "Reabilitação de quadril"
})
print("Paciente cadastrado:", paciente)
codigo_gerado = paciente["codigo_gerado"]
paciente_id = paciente["paciente"]["id"]

print(f"\n--> CÓDIGO DO IDOSO GERADO: {codigo_gerado} <--")

print("\n=== 3. PRESCREVENDO EXERCÍCIO ===")
_, plano = call("/fisio/prescrever", "POST", {
    "paciente_id": paciente_id,
    "exercicio": "Sentar e Levantar",
    "series_alvo": 3,
    "repeticoes_alvo": 10,
    "instrucoes": "Levantar sem apoiar as mãos nas pernas."
})
print("Prescrição:", plano)

print("\n=== 4. IDOSO ENTRANDO COM O CÓDIGO ===")
_, area_idoso = call("/paciente/acesso", "POST", {"codigo_acesso": codigo_gerado})
print("Área do idoso acessada com sucesso! Exercícios prescritos:")
print(area_idoso["exercicios_prescritos"])

print("\n=== 5. SALVANDO SESSÃO REALIZADA ===")
_, telemetria = call("/sessao/registrar", "POST", {
    "paciente_id": paciente_id,
    "exercicio": "Sentar e Levantar",
    "repeticoes_feitas": 10,
    "repeticoes_alvo": 10,
    "desvios_posturais": 1,
    "tempo_duracao_segundos": 45
})
print("Resultado da sessão gravada:", telemetria)

print("\n=== 6. GERANDO RELATÓRIO CLÍNICO ===")
_, relatorio = call(f"/relatorio/{paciente_id}")
print("Relatório do Paciente:", relatorio["resumo_clinico"])