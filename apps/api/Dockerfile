FROM ghcr.io/foundry-rs/foundry:latest AS foundry

FROM node:20-slim
COPY --from=foundry /usr/local/bin/anvil /usr/local/bin/anvil

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

EXPOSE 3001
CMD ["node", "dist/index.js"]
