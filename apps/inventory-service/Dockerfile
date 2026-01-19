FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /app

# Copy monorepo structure
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/inventory-service/ ./apps/inventory-service/

# Install and build
RUN pnpm install
RUN pnpm --filter inventory-service build

EXPOSE 3001
CMD ["pnpm", "--filter", "inventory-service", "start"]