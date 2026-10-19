"""Monitoramento didático de potência em dBm; execute com Python 3."""
import math
import statistics


def validar_medicoes(medicoes):
    """Aceita números finitos no intervalo fechado [-120, 0]."""
    validas = []
    for valor in medicoes:
        if (isinstance(valor, (int, float)) and not isinstance(valor, bool)
                and math.isfinite(valor) and -120 <= valor <= 0):
            validas.append(float(valor))
    return validas, len(medicoes) - len(validas)


def classificar(valor):
    if valor >= -85:
        return 'Normal'
    if valor >= -100:
        return 'Alerta'
    return 'Crítico'


def analisar(medicoes):
    validas, descartadas = validar_medicoes(medicoes)
    contagens = dict.fromkeys(['Normal', 'Alerta', 'Crítico'], 0)
    sequencia = maior_sequencia = 0
    # Leituras inválidas interrompem a sequência: não comprovam sinal crítico.
    for valor in medicoes:
        aceita, _ = validar_medicoes([valor])
        if aceita:
            contagens[classificar(valor)] += 1
        sequencia = sequencia + 1 if aceita and valor < -100 else 0
        maior_sequencia = max(maior_sequencia, sequencia)
    return {
        'total': len(medicoes), 'validas': len(validas),
        'descartadas': descartadas, 'contagens': contagens,
        'media': statistics.mean(validas) if validas else None,
        'minimo': min(validas) if validas else None,
        'maximo': max(validas) if validas else None,
        'desvio_populacional': statistics.pstdev(validas) if validas else None,
        'maior_sequencia_critica': maior_sequencia,
    }


def gerar_relatorio(medicoes):
    resultado = analisar(medicoes)
    linhas = [f"Medições totais: {resultado['total']}",
              f"Medições válidas: {resultado['validas']}",
              f"Medições descartadas: {resultado['descartadas']}"]
    if not resultado['validas']:
        linhas.append('Sem medições válidas para calcular estatísticas.')
    else:
        for chave, nome in [('media', 'Média'), ('minimo', 'Mínimo'),
                            ('maximo', 'Máximo'),
                            ('desvio_populacional', 'Desvio padrão populacional')]:
            linhas.append(f"{nome}: {resultado[chave]:.2f} dBm")
    for nome, quantidade in resultado['contagens'].items():
        linhas.append(f'{nome}: {quantidade}')
    linhas.append(f"Maior sequência crítica: {resultado['maior_sequencia_critica']}")
    return '\n'.join(linhas)


if __name__ == '__main__':
    dados = [-90, -87, -95, -101, -103, -110, -75, -80, -130, 'abc', -98]
    print(gerar_relatorio(dados))
