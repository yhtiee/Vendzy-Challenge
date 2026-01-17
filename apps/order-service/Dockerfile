# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root configs and necessary packages
COPY package*.json ./
COPY turbo.json ./
COPY packages/ ./packages/
COPY apps/order-service/ ./apps/order-service/

# Install dependencies and build the specific app
RUN npm install
RUN npx turbo build --filter=@vendyz/order-service...

# Stage 2: Runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Copy production dependencies and the built dist folder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/order-service/dist ./dist
COPY --from=builder /app/apps/order-service/package.json ./package.json

EXPOSE 3002
CMD ["node", "dist/main"]