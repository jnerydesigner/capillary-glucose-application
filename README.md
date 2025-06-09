# Capillary Glucose Application

![Banner Principal](docs/banner-main.png)

Repositório contendo todos os serviços que compõem a aplicação de monitoramento de glicose capilar. Cada módulo é executado de forma independente e utiliza **Yarn** para gerenciamento das dependências.

## Estrutura de Pastas

- **backend-diabets** – API construída com [NestJS](https://nestjs.com/).
- **front-diabets** – Interface em [React](https://reactjs.org/) utilizando [Vite](https://vitejs.dev/).
- **front-sangue-doce** – Aplicação web em [Next.js](https://nextjs.org/).
- **strapi-seligadev** – CMS baseado em [Strapi](https://strapi.io/).

## Como iniciar

Certifique‑se de possuir o [Node.js](https://nodejs.org/) e o [Yarn](https://yarnpkg.com/) instalados. Em seguida instale as dependências e execute cada projeto conforme necessário.

### Backend (NestJS)
```bash
cd backend-diabets
yarn install
yarn start:dev
```

### Frontend React + Vite
```bash
cd front-diabets
yarn install
yarn dev
```

### Frontend Next.js
```bash
cd front-sangue-doce
yarn install
yarn dev
```

### CMS Strapi
```bash
cd strapi-seligadev
yarn install
yarn develop
```

## Créditos

Este projeto utiliza e agradece aos criadores das seguintes tecnologias:

- [NestJS](https://nestjs.com/)
- [React](https://reactjs.org/) e [Vite](https://vitejs.dev/)
- [Next.js](https://nextjs.org/)
- [Strapi](https://strapi.io/)

