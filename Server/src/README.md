# Banco de Dados
## Modelos
Modelo | Descrição
-------|-------
`Aluno` | Informações pessoais: Nome, Idade, CPF, Email
`Assunto` | Descrição, Resumo, id_Materia
`Materia` | Nome
`Matricula` | id_aluno, id_assunto, desempenho
`Exercicio` | enunciado, id_assunto

### Assunto
Cada assunto possui N exercícios, 1 resumo e 1 descrição

### Matricula
Conterá as estatísticas do aluno no assunto e medirá seu nível de conhecimento.
