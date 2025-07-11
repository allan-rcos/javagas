# JaVagas - Frontend (Angular)

Bem-vindo(a) ao **frontend** do projeto **JaVagas**\! Esta seção da documentação é dedicada à aplicação construída com **Angular** e **TypeScript**, responsável pela interface do usuário e pela interação direta com o backend.

-----

## 🚀 Sobre o Frontend

O frontend do JaVagas oferece uma experiência intuitiva e responsiva para usuários que buscam vagas ou empresas que desejam gerenciar suas oportunidades de emprego. Desenvolvido com **Angular**, ele consome a API RESTful do nosso backend (Java Spring Boot) para oferecer todas as funcionalidades de uma plataforma de recrutamento.


## ⚙️ Tecnologias Principais

Este projeto frontend utiliza as seguintes tecnologias:

![Bulma](https://img.shields.io/badge/Bulma-00D1B2?style=for-the-badge&logo=Bulma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![BitBucket](https://img.shields.io/badge/Bitbucket-0747a6?style=for-the-badge&logo=bitbucket&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![EsLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![GitHub Copilot](https://img.shields.io/badge/github_copilot-8957E5?style=for-the-badge&logo=github-copilot&logoColor=white)
![Compodoc](https://img.shields.io/badge/compodoc-%230288D1.svg?style=for-the-badge&logo=angular&logoColor=white)
![WebStorm](https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)


## 🛠️ Configuração e Execução

Para configurar e executar o frontend do JaVagas localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Node.js** (versão LTS recomendada)
* **npm** (gerenciador de pacotes do Node.js, geralmente vem com o Node.js)
* **Angular CLI**: Instale-o globalmente via npm, caso ainda não o tenha:
  ```bash
  npm install -g @angular/cli
  ```

### Instalação

1. **Clone o repositório:** Se você ainda não clonou o repositório completo do JaVagas, faça-o primeiro. Navegue até a pasta do frontend (`/frontend` ou a pasta específica onde o código Angular está).
2. **Instale as dependências:** Dentro do diretório raiz do projeto Angular, execute o seguinte comando para instalar todas as dependências:
   ```bash
   npm install
   ```

### Execução

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento do Angular:

```bash
ng serve
```

Este comando irá compilar a aplicação e iniciará um servidor de desenvolvimento. A aplicação estará acessível em `http://localhost:4200/` (ou outra porta, se 4200 estiver em uso).


## 🐳 Docker

O frontend do JaVagas pode ser facilmente conteinerizado usando Docker, oferecendo portabilidade e um ambiente de execução consistente. Temos duas abordagens para construir a imagem Docker:

### 1\. Build Local e Imagem Padrão

Esta abordagem requer que você compile o projeto Angular localmente antes de construir a imagem Docker.

1.  **Compile o projeto Angular:**
    ```bash
    ng build --configuration production
    ```
    Este comando irá gerar os arquivos de produção otimizados na pasta `dist/`.
2.  **Construa a imagem Docker:**
    Navegue até a pasta onde está o `Dockerfile` principal (geralmente na raiz do frontend) e execute:
    ```bash
    docker build -t javagas-client .
    ```

### 2\. Build via Dockerfile.build (Multi-stage Build)

Para uma experiência mais isolada, você pode usar o `Dockerfile.build`. Este Dockerfile compila o projeto Angular dentro de um contêiner, eliminando a necessidade de ter Node.js, npm ou Angular CLI instalados em sua máquina local, exceto o próprio Docker.

```bash
docker build -f Dockerfile.build -t javagas-client-builded .
```

**Vantagem:** Não requer ferramentas locais, ideal para ambientes de CI/CD.   
**Desvantagem:** O processo de compilação pode ser mais demorado, pois inclui a instalação das dependências do Node.js dentro do contêiner.

### Imagem Distroless com NGINX

A imagem Docker final é construída sobre uma base **NGINX distroless**.

  * **O que é "Distroless"?** Imagens distroless são imagens Docker muito pequenas que contêm apenas o seu aplicativo e suas dependências de tempo de execução, e nada mais. Elas não incluem um gerenciador de pacotes, um shell (como Bash ou Sh), ou qualquer outra ferramenta que normalmente viria em uma distribuição Linux completa.
  * **Vantagens:**
      * **Segurança aprimorada:** A superfície de ataque é drasticamente reduzida, pois não há ferramentas desnecessárias que possam ser exploradas por vulnerabilidades.
      * **Tamanho reduzido:** Isso leva a downloads e uploads mais rápidos, menor consumo de armazenamento e inicialização mais veloz de contêineres.
      * **Menos vulnerabilidades:** Com menos software instalado, há menos chances de vulnerabilidades de segurança serem descobertas e exploradas.

### Imagem Disponível no Docker Hub

Você também pode puxar a [imagem do frontend diretamente do Docker Hub](https://hub.docker.com/r/rickallan/javagas-client):

```bash
docker pull rickallan/javagas-client:latest
```

Após puxar a imagem, você pode executá-la:

```bash
docker run -p 80:80 -p 443:443 rickallan/javagas-client:latest
```

A aplicação estará acessível em `http://localhost/`.

## 🧪 Testes

Este projeto utiliza **Jest** para testes unitários e de integração no frontend. Para executar os testes, utilize o seguinte comando:

```bash
npm run test
```

Os tests atuais cobrem cerca de 93% das linhas. Possui getters and setters que não são cobertos pelos tests, sendo estes grande parte dos faltantes.

## 📄 Geração de Documentação (CompoDoc)

A documentação do código Angular pode ser gerada usando [**CompoDoc**](https://compodoc.app/guides/usage.html). Para gerar novamente a documentação, utilize o comando abaixo:

```bash
npm run compodoc:build-and-serve
```

Todo o código está sendo documentado conforme seu desenvolvimento.
Atualmente, o código esté totalmente coberto por documentação, de acordo com o CompoDoc coverage.


## 📋 Roteiro Específico do Frontend

A seguir, um detalhamento das próximas etapas e funcionalidades a serem implementadas no frontend:

### Concluídos (Frontend):

- [x] Ambiente FrontEnd Angular;
- [x] Login e Registro de Usuários;
- [x] Geração de Documentação (TSDocs).

### Em Desenvolvimento / A Fazer (Frontend):

- [ ] Verificação por email (integração com backend);
- [ ] Recuperação de Senha (integração com backend);
- [ ] Candidate Dashboard;
- [ ] Company Dashboard;
- [ ] Tela de pesquisa de Jobs;
- [ ] Candidate Application (Aplicação em Vagas);
- [ ] Company Job Show Screen com Applications;
- [ ] Home Screen.


## 🤝 Contribuição

Este é um projeto de treinamento e estamos sempre abertos a contribuições e melhorias. Sinta-se à vontade para explorar o código, enviar pull requests ou abrir issues.


## 📧 Contato

Para dúvidas ou sugestões, entre em contato com os desenvolvedores do projeto

## 🔓 Licença

![Apache Licence](https://img.shields.io/badge/Apache--2.0-green?style=for-the-badge)
