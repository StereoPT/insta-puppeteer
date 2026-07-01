# ── Base: Node (works on both amd64 and arm64) ───────────────────────
FROM node:22-slim AS base

# ── Pruner: isolate the dashboard slice of the monorepo ──────────────
FROM base AS pruner

RUN npm install -g turbo@2
WORKDIR /app
COPY . .
RUN turbo prune @insta-puppeteer/dashboard --docker

# ── Installer: install deps (compiles better-sqlite3) ────────────────
FROM base AS installer

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

# Manifests first so this layer is only invalidated when deps change
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

# ── Builder: compile database + dashboard ─────────────────────────────
FROM installer AS builder

ENV DATABASE_URL=file:/tmp/dummy.db
ENV AUTH_SECRET=build-time-placeholder
ENV AUTOMATOR_URL=http://localhost:3200

COPY --from=pruner /app/out/full/ .
RUN pnpm run build

# ── Runner: lean production image ─────────────────────────────────────
FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Standalone output already mirrors the monorepo layout (apps/dashboard/server.js + traced node_modules)
COPY --from=builder /app/apps/dashboard/.next/standalone/ ./
COPY --from=builder /app/apps/dashboard/.next/static ./apps/dashboard/.next/static
COPY --from=builder /app/apps/dashboard/public ./apps/dashboard/public

EXPOSE 3000
CMD ["node", "apps/dashboard/server.js"]
