# Multi-stage Production Dockerfile for Website Angular SSR App
# Stage 1: Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Production runner stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4001

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --legacy-peer-deps --omit=dev

EXPOSE 4001

CMD ["node", "dist/website/server/server.mjs"]
