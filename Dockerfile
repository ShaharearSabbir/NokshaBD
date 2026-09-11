# Stage 1: Build environment
FROM node:20-alpine AS builder

# Automatically installs and uses pnpm@12.3.4 as defined in package.json
RUN corepack enable

WORKDIR /app

# pnpm-workspace.yaml carries the allowed build scripts (esbuild) config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies and allow approved build scripts
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Stage 2: Production environment
FROM node:20-alpine AS runner

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install ONLY production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy compiled code and raw JSON data
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/data ./src/data

# Defaults (overridable at runtime with -e). Required by env validation.
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Runs "node ./dist/server.js" as defined in your scripts
CMD ["pnpm", "start"]
