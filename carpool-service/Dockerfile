FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache openssl && npm install -g pnpm

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3002

CMD ["pnpm", "run", "dev"]