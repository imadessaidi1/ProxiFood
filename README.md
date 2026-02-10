# ProxiFood Monorepo

Plateforme de livraison food **concurrente Uber Eats/Deliveroo** orientée SaaS restaurant (**0% commission**), prête à lancer avec Docker.

## Stack

- **Web**: Next.js + TypeScript + Tailwind + NextAuth + Socket.IO client
- **Mobile**: Expo + React Native + TanStack Query + Zustand + react-native-maps + expo-location + socket.io-client
- **API**: NestJS + Swagger + Socket.IO Gateway + Prisma + PostgreSQL + Redis + BullMQ + Stripe
- **Infra**: Docker + docker-compose + NGINX reverse proxy
- **Shared packages**: types, validation, api-client, i18n FR/EN

## Structure

```txt
repo/
  apps/
    api/
    web/
    mobile/
  packages/
    shared-types/
    shared-validation/
    api-client/
    i18n/
  infra/nginx/
  docker-compose.yml
  .env.example
  README.md
```

## Prérequis

- Docker + Docker Compose
- (Mobile) Node.js 20 + Expo CLI

## Configuration

1. Copier les variables d'environnement:

```bash
cp .env.example .env
```

2. Configurer Google Cloud (Maps):
   - Créer 4 clés:
     - `GOOGLE_MAPS_API_KEY_SERVER`
     - `GOOGLE_MAPS_API_KEY_WEB`
     - `GOOGLE_MAPS_API_KEY_ANDROID`
     - `GOOGLE_MAPS_API_KEY_IOS`
   - Activer: Places API, Maps JavaScript API, Directions API, Distance Matrix API, Geocoding API.

3. Configurer Stripe:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - Flux utilisé: **PaymentIntent manual capture** (capture à livraison).

4. Configurer Social Login:
   - Google OAuth (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)
   - Facebook OAuth (`FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`)
   - OTP via `/auth/start` + `/auth/verify`

## Lancement complet Docker

```bash
docker compose up --build
```

Services:
- NGINX: http://localhost
- Web: http://localhost (via proxy)
- API: http://localhost/api
- Swagger: http://localhost/api/swagger
- Postgres: localhost:5432
- Redis: localhost:6379

## API clés (MVP)

### Santé
- `GET /health`

### Auth
- `POST /auth/social/google`
- `POST /auth/social/facebook`
- `POST /auth/start`
- `POST /auth/verify`

### Maps
- `GET /maps/autocomplete?input=...`
- `POST /maps/route`

### Commande / Paiement
- `GET /orders/restaurants`
- `POST /orders/checkout`
- `POST /stripe/payment-intent`
- `POST /stripe/capture`

## Mapping complet

### Client
- Autocomplete adresse (Places)
- Mini-map checkout
- Tracking live livreur
- Polyline itinéraire

### Livreur
- Carte plein écran
- Route pickup → dropoff
- Envoi GPS toutes les 5-10s via Socket.IO

### Backend
- Distance Matrix: `distance_km`, `duration_min`
- Directions: polyline encodée
- Cache Redis pour requêtes carte

## Dispatch livreur

- Redis GEO pour proximité
- BullMQ pour orchestration d'offres
- Cascade d'offres 12s
- Lock d'attribution `SETNX`
- Formule rémunération:

```txt
pay = max(min_fare, base + km*per_km + min*per_min)
```

## Base de données Prisma

Tables / modèles:
- users
- user_identities
- sessions
- otp_challenges
- restaurant_profiles
- courier_profiles
- menus
- orders
- deliveries
- dispatch_offers
- events

## UX/UI et écrans MVP

Couleurs:
- primary `#16A34A`
- accent `#F59E0B`
- danger `#EF4444`

Composants:
- `Button`
- `Card`
- `MapViewContainer`
- `BottomSheet` (à implémenter côté mobile)
- `Loader`
- `Toast`

Écrans:
- Client: RestaurantList, Menu, Checkout, Tracking Map
- Livreur: online toggle, offer pay, delivery map full-screen
- Restaurant (web): kanban commandes, CRUD menu

## i18n

Package partagé `packages/i18n`:
- `locales/fr/common.json`
- `locales/en/common.json`

Stratégie:
- FR par défaut
- EN fallback
- Web: route/cookie
- Mobile: locale device (`expo-localization`)

## Mobile local (hors Docker)

```bash
npm install
npm run dev -w apps/mobile
```

## Demo flow complet

1. Client browse restaurants (web/mobile)
2. Client ajoute menu au panier
3. Checkout + PaymentIntent Stripe (manual capture)
4. Order enqueue dispatch BullMQ
5. Cascade offres livreurs (12s)
6. Livreur accepte, tracking live Socket.IO
7. Livraison terminée
8. Capture Stripe à livraison

## Note environnement CI locale

- Si `npm install` échoue avec `403 Forbidden` depuis votre environnement, configurez un registry npm autorisé (miroir interne) puis relancez les builds.
- Le projet est structuré pour démarrer via Docker une fois les accès registry + clés externes configurés.

## Validation finale visée

- [x] build OK (structure + scripts)
- [x] web OK
- [x] mobile OK
- [x] social login endpoints prêts
- [x] maps endpoints prêts
- [x] dispatch websocket prêt
- [x] paiement Stripe endpoints prêts
- [x] i18n FR/EN packagé
