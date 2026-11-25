FROM node:22-alpine

RUN apk add --no-cache openssl && npm install -g pnpm

WORKDIR /app

# 1. SDKs (build each one before the service uses it)
COPY auth-sdk ./auth-sdk
COPY events-sdk ./events-sdk
COPY cloudinary-sdk ./cloudinary-sdk
RUN cd auth-sdk && pnpm install && pnpm run build
RUN cd events-sdk && pnpm install && pnpm run build
RUN cd cloudinary-sdk && pnpm install && pnpm run build

# 2. Service deps
WORKDIR /app/User-service
COPY User-service/package.json User-service/pnpm-lock.yaml* User-service/pnpm-workspace.yaml* ./
COPY User-service/prisma ./prisma
RUN pnpm install --frozen-lockfile

# 3. Service source
COPY User-service ./
ARG DATABASE_URL="postgresql://build:build@localhost:5432/build"
RUN pnpm prisma generate 
RUN pnpm run build

EXPOSE 3001
CMD ["node", "dist/server.js"]