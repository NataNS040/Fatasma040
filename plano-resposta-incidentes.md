# Plano de Resposta a Incidentes de Dados Pessoais
## EngMarq Solution - Documento Interno

**Versão:** 1.0  
**Data:** 08 de abril de 2026  
**Responsável:** Encarregado de Proteção de Dados (DPO)

---

## 1. Objetivo

Este documento estabelece os procedimentos a serem adotados pela EngMarq Solution em caso de incidentes de segurança envolvendo dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).

## 2. Definições

- **Incidente de segurança:** Qualquer evento que comprometa a confidencialidade, integridade ou disponibilidade de dados pessoais.
- **Violação de dados pessoais:** Incidente que resulte em acesso não autorizado, destruição, perda, alteração ou divulgação de dados pessoais.

## 3. Classificação de Incidentes

| Nível | Descrição | Exemplos |
|-------|-----------|----------|
| Crítico | Exposição massiva de dados sensíveis | Vazamento de banco de dados, ransomware |
| Alto | Acesso não autorizado a dados pessoais | Invasão de sistema, phishing bem-sucedido |
| Médio | Perda de dados com backup disponível | Falha de hardware, exclusão acidental |
| Baixo | Tentativa sem sucesso de acesso | Tentativa de login bloqueada |

## 4. Equipe de Resposta a Incidentes

- **Encarregado (DPO):** Coordena a resposta e comunicação com a ANPD
- **Gestor de TI:** Contenção técnica e investigação
- **Direção:** Decisões estratégicas e aprovações
- **Jurídico:** Análise legal e suporte regulatório

## 5. Procedimento de Resposta

### 5.1 Detecção e Registro (0-2 horas)
1. Identificar e documentar o incidente
2. Registrar: data/hora, descrição, sistemas afetados, dados envolvidos
3. Notificar imediatamente o Encarregado (DPO)

### 5.2 Contenção (2-24 horas)
1. Isolar sistemas comprometidos
2. Bloquear acessos não autorizados
3. Preservar evidências digitais
4. Ativar backups se necessário

### 5.3 Avaliação do Impacto (24-48 horas)
1. Determinar a natureza e extensão dos dados afetados
2. Identificar os titulares impactados
3. Avaliar o risco para os direitos dos titulares
4. Classificar a gravidade do incidente

### 5.4 Comunicação
#### À ANPD (prazo razoável, preferencialmente em 2 dias úteis):
- Descrição da natureza dos dados pessoais afetados
- Informações sobre os titulares envolvidos
- Indicação das medidas técnicas e de segurança utilizadas
- Riscos relacionados ao incidente
- Motivos da demora, caso a comunicação não seja imediata
- Medidas adotadas para reverter ou mitigar os efeitos

#### Aos Titulares (quando houver risco relevante):
- Descrição do incidente
- Dados pessoais afetados
- Medidas adotadas
- Recomendações para proteção individual

### 5.5 Recuperação
1. Restaurar sistemas e dados
2. Implementar medidas corretivas
3. Validar a segurança dos sistemas

### 5.6 Pós-Incidente
1. Documentar lições aprendidas
2. Atualizar medidas de segurança
3. Revisar políticas e procedimentos
4. Realizar treinamento da equipe

## 6. Registro de Incidentes

Todo incidente deve ser registrado com:
- Data e hora da detecção
- Descrição detalhada
- Sistemas e dados afetados
- Ações tomadas
- Comunicações realizadas
- Resultado final

## 7. Medidas de Proteção de Dados Implementadas

### Medidas Técnicas:
- Criptografia em trânsito via HTTPS/TLS 1.2+
- Headers de segurança (X-Frame-Options, CSP, HSTS, X-Content-Type-Options)
- Controle de acesso baseado em função (RBAC)
- Backups regulares com criptografia
- Monitoramento de acesso e logs
- Proteção contra ataques comuns (XSS, CSRF, SQL Injection)

### Medidas Organizacionais:
- Política de Privacidade pública e acessível
- Política de Cookies com consentimento granular
- Termos de Uso definidos
- Treinamento periódico da equipe sobre proteção de dados
- Revisão periódica de acessos e permissões
- Canal de contato do Encarregado (DPO) disponível

## 8. Fluxo para Notificação à ANPD

```
Detecção do Incidente
        │
        ▼
Registro e Contenção Imediata
        │
        ▼
Avaliação de Impacto pelo DPO
        │
        ├─── Risco relevante para titulares? ─── SIM ──┐
        │                                               ▼
        │                              Comunicar ANPD (2 dias úteis)
        │                              Comunicar Titulares afetados
        │                                               │
        └─── NÃO ──► Registro interno ◄────────────────┘
                            │
                            ▼
                    Medidas corretivas
                            │
                            ▼
                    Relatório final
```

## 9. Canal de Comunicação para Titulares

Os titulares de dados podem exercer seus direitos ou relatar preocupações por meio de:
- **E-mail:** privacidade@engmarqsolution.com.br
- **WhatsApp:** +55 84 99928-5888
- **Prazo de resposta:** até 15 dias conforme Art. 18, §5º da LGPD

## 10. Revisão do Plano

Este plano deve ser revisado:
- Semestralmente
- Após qualquer incidente de segurança
- Quando houver alterações significativas nos sistemas ou processos

---

**Aprovado por:** Direção da EngMarq Solution  
**Data de aprovação:** 08 de abril de 2026  
**Próxima revisão:** Outubro de 2026
