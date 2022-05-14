<h1 align="center">Jogo Trivia</h1>

<p align="center">Esse projeto é uma jogo de perguntas e respostas.</p>

<p align="center">
 <a href="#features">Features</a> •
 <a href="#Node">Node</a> •
 <a href="#rodando-o-mobile">Rodando a aplicação</a> •
 <a href="#Docker">Docker</a> •
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#autor">Autor</a>
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

## Docker Compose

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

- [Context API](https://pt-br.reactjs.org/docs/context.html)
- [Eslint](https://eslint.org/)
- [EditorConfig](https://editorconfig.org/)

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

Trabalho desenvolvido na trybe com finalidade didatica, feito em grupo.

[Gabriel Julio](https://github.com/GJTrybe)

[Leonardo Mendonça](https://github.com/leobmend)

[Github Pages](https://higoranjos.github.io/triviaApp/)
