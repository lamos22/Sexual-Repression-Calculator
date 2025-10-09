FROM node:22-slim AS builder

WORKDIR /app

COPY . .
RUN npm install

RUN npm run build

FROM denoland/deno:alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist .

EXPOSE 8000

CMD ["run", "--allow-net", "--allow-read", "server.cjs"]