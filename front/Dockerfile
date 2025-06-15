

# -------------------
#  1. ビルダー・ステージ
# -------------------
# ここで依存関係のインストールとビルドを行う
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# -------------------
#  2. ランナー・ステージ
# -------------------
# 実際にアプリケーションを実行する、軽量な本番用イメージ
FROM node:20-alpine AS runner

WORKDIR /app

# standaloneモードで必要なファイルだけをビルダーからコピーする
# これにより、最終的なイメージサイズが劇的に小さくなる
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# セキュリティ向上のため、一般ユーザーで実行する
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE 3000

ENV PORT 3000

# 正しい起動コマンド
CMD ["node", "server.js"]