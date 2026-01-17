# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root lock files and workspace configs
COPY package*.json ./
COPY turbo.json ./
COPY packages/ ./packages/
COPY apps/inventory-service/ ./apps/inventory-service/

# Install dependencies and build
RUN pnpm install
RUN npx turbo build --filter=@vendyz/inventory-service...

# Stage 2: Run
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/inventory-service/dist ./dist
COPY --from=builder /app/apps/inventory-service/package.json ./package.json

EXPOSE 3001
CMD ["node", "dist/main"]