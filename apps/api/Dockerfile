FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json
COPY packages/shared-validation/package.json ./packages/shared-validation/package.json
COPY packages/api-client/package.json ./packages/api-client/package.json
COPY packages/i18n/package.json ./packages/i18n/package.json
RUN npm install
COPY . .
RUN npm run build -w apps/api
EXPOSE 4000
CMD ["npm", "run", "start", "-w", "apps/api"]
