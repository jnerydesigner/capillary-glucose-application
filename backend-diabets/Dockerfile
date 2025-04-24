# Primeiro estágio: Builder
FROM node:22 AS builder

RUN npm i -g @nestjs/cli

WORKDIR /app

# Copie os arquivos de configuração
COPY package.json yarn.lock tsconfig.build.json ./

COPY src/infra/database/prisma /app/prisma

# Instale as dependências com o lockfile congelado
RUN yarn install --frozen-lockfile

# Copie o restante do código da aplicação
COPY . .

# Compile a aplicação
RUN yarn build


# Segundo estágio: Runner
FROM node:22-slim

WORKDIR /app

# Copie os arquivos necessários do build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# Limpa cache do yarn e instala apenas dependências de produção
RUN yarn cache clean && yarn install --production --frozen-lockfile

EXPOSE 5551

CMD ["node", "dist/src/main.js"]
