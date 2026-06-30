# ── Base: Node + Chromium (works on both amd64 and arm64) ────────────
FROM node:22-slim AS base

RUN apt-get update && apt-get install -y --no-install-recommends chromium \
    && rm -rf /var/lib/apt/lists/*

# ── Pruner: isolate the automator slice of the monorepo ─────────────
FROM base AS pruner

RUN npm install -g turbo@2
WORKDIR /app
COPY . .
RUN turbo prune @insta-puppeteer/automator --docker

# ── Installer: install deps (compiles better-sqlite3, skips Chrome) ─
FROM base AS installer

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV PUPPETEER_SKIP_DOWNLOAD=true

RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

# Manifests first so this layer is only invalidated when deps change
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

# ── Builder: compile database + automator ───────────────────────────
FROM installer AS builder

ENV DATABASE_URL=file:/tmp/dummy.db

COPY --from=pruner /app/out/full/ .
RUN pnpm run build

# ── Runner: lean production image ───────────────────────────────────
FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Workspace manifests (needed for pnpm symlink resolution at runtime)
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-workspace.yaml .
COPY --from=builder /app/apps/automator/package.json ./apps/automator/
COPY --from=builder /app/packages/database/package.json ./packages/database/

# node_modules (includes .pnpm virtual store and workspace symlinks)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/automator/node_modules ./apps/automator/node_modules
COPY --from=builder /app/packages/database/node_modules ./packages/database/node_modules

# Built output
COPY --from=builder /app/apps/automator/dist ./apps/automator/dist
COPY --from=builder /app/packages/database/dist ./packages/database/dist

EXPOSE 3200
CMD ["node", "apps/automator/dist/main.js"]
