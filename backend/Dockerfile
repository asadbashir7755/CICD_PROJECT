# stage...01...build
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# stage...02...runtime
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# non-root user
RUN addgroup -S app && adduser -S -G app appuser
COPY --from=builder /app/package*.json ./

RUN apk add --no-cache curl
#install only prod dep
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/src ./src
EXPOSE 8080

USER appuser
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

CMD [ "node","dist/server.js" ]

