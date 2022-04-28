<h1 align="center">desafio_back_end_brisalabs :computer:</h1>

<br>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org)
- [Postgres](https://www.postgresql.org)
- [TypeORM](https://typeorm.io)
- [Insomnia](https://insomnia.rest)
- [Nodemailer](https://nodemailer.com/about/)
- [Docker](https://www.docker.com)
- [Jest](https://jestjs.io/pt-BR/)
- [REST]

## 🚀 Como executar a aplicação

- Primeiro e necessário preparar o nodemailer:

  - **nodemailer**
    - Entre em sua conta do gmail.
    - Vá em 'segurança'.
    - Ative a 'verificação em duas etapas do gmail' em sua conta.
    - Crie uma 'Senhas de app' para a aplicação, e copie a senha criada.
    - Utilize seu email e a senha criada nas variáveis de ambiente(arquivo .env) do nodemailer da aplicação.

- Executando a aplicação:

  - **aplicação**
    - Abra o terminal e digite `npm install` para instalar todas as dependências do projeto.
    - Crie um bando de dados no postgresql.
    - Manipule suas variáveis de ambiente para o uso, ex: `.env`.
    - No mesmo terminal digite `npm run typeorm migration:run` para criar as tabelas do bando de dados.
    - Ainda no mesmo terminal agora digite `npm run dev` para iniciar a aplicação.
    - Por fim, a aplicação estará disponível em `http://localhost:${SERVER_PORT}`.

- Rodando os testes:

  - **jest**
    - Abra o terminal e digite `npm test` para iniciar os testes ou `npm run test:watch` para iniciar os testes e ficar 'assistindo' mudanças nos arquivos.

- Utilizando docker

  - **docker**
    - Abra o terminal e digite `sudo chmod -R 777 .docker` para impedir erros de permissões para a pasta .docker.
    - Digite `make up` ou `docker-compose up -d` para criar e iniciar os containers.
    - Digite `make down` ou `docker-compose down` para parar e remover os containers.
    - Digite `make logs` ou `docker-compose logs -f` para visualizar os logs.
    - Para rodar os testes, selecione o container `docker-compose exec <container-name> bash` ou `docker exec -it <container-name> bash`, depois digite `npm test` ou `npm run test:watch`.

### Autor

---

Feito por ❤️ Thiago Rodrigues 👋🏽
