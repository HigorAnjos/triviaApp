<h1 align="center">Jogo Trivia</h1>

<p align="center">Esse projeto é um jogo de perguntas e respostas, onde você terá 30 's para responder um total de 5 perguntas. A pontuação depende do tempo e da dificuldade da pergunta. Ao final você conseguirá visualizar o ranking.</p>

<p align="center">
  <a href="#GitHub-Pages">GitHub-Pages</a> •
  <a href="#Node">Node</a> •
  <a href="#Docker">Docker</a> •
  <a href="#Docker-Compose">Docker-Compose</a> •
  <a href="#Tecnologias">Tecnologias</a> •
  <a href="#Contribuicao">Contribuicao</a> •
  <a href="#Autor">Autor</a>
</p>

[![](https://circleci.com/gh/HigorAnjos/triviaApp.svg?style=svg)](https://app.circleci.com/pipelines/github/HigorAnjos/triviaApp)
<img alt="GitHub issues" src="https://img.shields.io/github/issues/HigorAnjos/triviaApp?color=%2398cc04&style=flat-square">
<img alt="GitHub" src="https://img.shields.io/github/license/HigorAnjos/triviaApp?color=%2398cc04&style=flat-square" width="78">

---

### Telas

<h1 align="center">
  <img alt="WeatherApp" title="WeatherApp" src="./trivia.gif" />
  <!-- <img alt="WeatherApp" title="Persistência do tema e alerta de erro de cidade não encontrada" src="./github/WeatherAppThemePersistAndCityNotFound.gif" height="425" /> -->
</h1>

#### Sonar Code Quality
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=HigorAnjos_triviaApp&metric=bugs)](https://sonarcloud.io/dashboard?id=HigorAnjos_triviaApp)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=HigorAnjos_triviaApp&metric=security_rating)](https://sonarcloud.io/dashboard?id=HigorAnjos_triviaApp)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=HigorAnjos_triviaApp&metric=code_smells)](https://sonarcloud.io/dashboard?id=HigorAnjos_triviaApp)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=HigorAnjos_triviaApp&metric=ncloc)](https://sonarcloud.io/dashboard?id=HigorAnjos_triviaApp)

---

## GitHub-Pages

O projeto esta disponivel online no
[Github Pages](https://higoranjos.github.io/triviaApp/)

---

## Node

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

## Rodando com Node

```bash
# Clone este repositório
$ git clone git@github.com:HigorAnjos/triviaApp.git

# Acesse a pasta do projeto no terminal/cmd
$ cd triviaApp

# Instale as dependências
$ npm install

# iniciar o projeto
$ npm start
```

Caso a pagina nao abra automaticamente, a aplicação estara disponivel em ```http://localhost:3000/triviaApp```

---
## Docker

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Docker](https://www.docker.com/).

## Rodando com Docker

```bash
# Clone este repositório
$ git clone git@github.com:HigorAnjos/triviaApp.git

# Acesse a pasta do projeto no terminal/cmd
$ cd triviaApp

# Criando imagem node
$ docker build -t trivia .

# Rodando o container da imagem criada.
$ docker run -i -t -p 3000:3000 trivia
```

Para as proximas vezes nao sera necessario criar a imagem novamente, apenas rodar o container.

```bash
# Rodando o container da imagem criada.
$ docker run -i -t -p 3000:3000 trivia
```

A aplicação estara disponivel em ```http://localhost:3000/triviaApp```

### Removendo a imagem do Docker
```bash
# Excluindo a imagem criada pelo docker
$ docker image rm -f trivia
```

---

## Docker-Compose

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/install/).


## Rodando com o doker-compose

```bash
# Clone este repositório
$ docker compose up --build
```
Para roda outras vezes nao sera necessario contruir a imagem novamente, apenar roda o container com a imagem:

```bash
# Clone este repositório
$ docker compose up
```

<!-- Caso queira rodar o container sem travar seu termianl:
```bash
# Clone este repositório
$ docker compose up -d
``` -->
A aplicação estara disponivel em ```http://localhost:3000/triviaApp```

Parar o container
```bash
# Clone este repositório
$ docker compose down
```

### Removendo a imagem do Docker
```bash
# Excluindo a imagem criada pelo docker
$ docker image rm -f triviaapp_trivia
```
---

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [React](https://pt-br.reactjs.org/)
- [Redux](https://redux.js.org/)
- [HTML](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
- [CSS](https://www.w3.org/TR/CSS/#css)
- [Eslint](https://eslint.org/)
- [Java Script](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Editor Config](https://editorconfig.org/)


<!-- - [TypeScript](https://www.typescriptlang.org/) -->
<!-- - [React Native](https://reactnative.dev/) -->
<!-- - [Weather API](https://openweathermap.org/api) -->
<!-- - [React Native Geolocation Service](https://github.com/Agontuk/react-native-geolocation-service) -->
<!-- - [React Navigation](https://reactnavigation.org/) -->
<!-- - [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) -->
<!-- - [UnForm](https://unform.dev/) -->
<!-- - [Yup](https://github.com/jquense/yup) -->
<!-- - [Styled Components](https://styled-components.com/) -->
<!-- - [Axios](https://github.com/axios/axios) -->
<!-- - [Prettier](https://prettier.io/) -->

---

## Contribuicao

[Gabriel Julio](https://github.com/GJTrybe) |
[Leonardo Mendonça](https://github.com/leobmend)

---

# Autor
<a href="https://github.com/HigorAnjos">
<img alt="Higor Anjos" title="Higor Anjos" src="https://avatars.githubusercontent.com/u/38214470?v=4" height="100" width="100" />

</a>

Made with 💜 by Higor Anjos 👋

[![LinkedIn Badge](https://img.shields.io/badge/-Higor_Anjos-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/higoranjos)](https://www.linkedin.com/in/higoranjos)
