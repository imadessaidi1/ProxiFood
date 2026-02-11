FROM node:20-alpine AS deps
WORKDIR /app

# Manifests nécessaires au calcul des deps workspaces
COPY package.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json
COPY packages/shared-validation/package.json ./packages/shared-validation/package.json
COPY packages/api-client/package.json ./packages/api-client/package.json
COPY packages/i18n/package.json ./packages/i18n/package.json

RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build -w apps/api

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# IMPORTANT: pour npm workspaces
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/node_modules ./node_modules

# Artefacts build Nest
COPY --from=builder /app/apps/api/dist ./apps/api/dist

EXPOSE 4000
CMD ["node","apps/api/dist/main.js"]

