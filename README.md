# DataClean — Normalização de Banco de Dados

Projeto educacional individual sobre **Primeira, Segunda e Terceira Formas Normais (1FN, 2FN e 3FN)**. A página é estática e usa HTML, CSS e JavaScript. O script SQL foi escrito para PostgreSQL 14 ou superior.

## Objetivos

- Explicar anomalias de inserção, atualização e exclusão.
- Demonstrar valores atômicos, dependências parciais e dependências transitivas.
- Comparar uma estrutura simplificada com um modelo relacional.
- Fornecer SQL reproduzível com dados fictícios e consultas de validação.
- Publicar uma página acessível por URL usando GitHub Pages.

## Estrutura

```text
DataClean/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
├── .nojekyll
└── sql/
    └── normalizacao.sql
```

## Como executar a página localmente

1. Baixe ou clone o repositório.
2. Abra a pasta no Visual Studio Code.
3. Abra `index.html` no navegador. Para uma experiência melhor, use a extensão Live Server do VS Code.
4. Confira os links, navegação, botão de copiar SQL e quiz em computador e celular.

Não há servidor de aplicação nem instalação de dependências JavaScript.

## Como executar o SQL

Requisito: PostgreSQL 14 ou superior e uma ferramenta como pgAdmin ou `psql`.

1. Crie um banco de dados vazio para testes.
2. Abra `sql/normalizacao.sql` no Query Tool do pgAdmin ou execute com `psql`.
3. Execute o script inteiro.
4. Confira os resultados das consultas no final do arquivo.

O script cria as tabelas `clientes`, `pedidos`, `produtos` e `itens_pedido`, insere dados fictícios e demonstra consultas com `JOIN`, agregação e ordenação. Execute em banco vazio: o script não apaga tabelas existentes.

## Publicar no GitHub Pages

1. Crie um repositório público chamado `DataClean`.
2. Envie todos os arquivos e pastas mantendo a estrutura.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/(root)`, depois clique em **Save**.
6. Aguarde a publicação e abra a URL mostrada na página do GitHub Pages.
7. Teste a URL em outro navegador e no celular.

A página só estará pública depois que você fizer o push dos arquivos e ativar o Pages.

## Antes de entregar

- Substitua “Seu nome completo” no cartão de autoria.
- Adicione seus perfis profissionais públicos, se desejar, e use foto própria ou autorizada.
- Confirme consentimento para quaisquer dados pessoais publicados.
- Registre a data real da publicação e da última revisão.
- Abra e analise de fato as referências listadas e atualize o quadro de observação.
- Teste o script SQL em um banco limpo.
- Faça commits que representem etapas reais do seu trabalho.
- Apresente o que você entende e consegue explicar; não afirme que executou testes que ainda não realizou.

## Quadro de observação inicial

**Referências sugeridas para análise:** documentação oficial do PostgreSQL sobre constraints e tutorial do SQLBolt.

**Decisões do projeto:**
1. Usar o cenário fictício de uma loja para tornar os conceitos concretos.
2. Separar clientes, pedidos, produtos e itens do pedido.
3. Incluir scripts e consultas que o leitor pode executar localmente.

**O que não foi incluído:** backend, login ou banco de dados conectado à página, pois o escopo solicitado é uma página estática.

Revise este quadro depois de observar as fontes e adapte-o ao que você realmente fez.

## Referências

- PostgreSQL Global Development Group. [Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).
- PostgreSQL Global Development Group. [Tutorial](https://www.postgresql.org/docs/current/tutorial.html).
- SQLBolt. [Interactive SQL Lessons](https://sqlbolt.com/).
- Oracle. [MySQL Documentation](https://dev.mysql.com/doc/).

## Licença

Licença MIT. Consulte o arquivo `LICENSE`.
