FROM node:22-alpine

RUN apk add --no-cache openssl && npm install -g pnpm

WORKDIR /app

# 1. SDKs (lost-and-found uses auth-sdk and events-sdk)
COPY auth-sdk ./auth-sdk
COPY events-sdk ./events-sdk
COPY cloudinary-sdk ./cloudinary-sdk

RUN cd auth-sdk && pnpm install && pnpm run build
RUN cd events-sdk && pnpm install && pnpm run build
RUN cd cloudinary-sdk && pnpm install && pnpm run build

# 2. Service deps
WORKDIR /app/lost-and-found-service
COPY lost-and-found-service/package.json lost-and-found-service/pnpm-lock.yaml* lost-and-found-service/pnpm-workspace.yaml* ./
COPY lost-and-found-service/prisma ./prisma

RUN pnpm install --frozen-lockfile

# 3. Service source
COPY lost-and-found-service ./
ARG DATABASE_URL="postgresql://build:build@localhost:5432/build"
RUN pnpm prisma generate
RUN pnpm run build

EXPOSE 3003
CMD ["node", "dist/server.js"]