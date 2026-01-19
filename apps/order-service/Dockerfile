FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /app

# Copy monorepo structure
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/order-service/ ./apps/order-service/

# Install and build
RUN pnpm install
RUN pnpm --filter order-service build

EXPOSE 3002
CMD ["pnpm", "--filter", "order-service", "start"]