FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

RUN pnpm --version

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile 

COPY . .

EXPOSE 3001

CMD ["pnpm","run","dev"]