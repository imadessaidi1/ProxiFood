FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json
COPY packages/shared-validation/package.json ./packages/shared-validation/package.json
COPY packages/api-client/package.json ./packages/api-client/package.json
COPY packages/i18n/package.json ./packages/i18n/package.json
RUN npm install
COPY . .
RUN npm run build -w apps/web
EXPOSE 3000
CMD ["npm", "run", "start", "-w", "apps/web"]
