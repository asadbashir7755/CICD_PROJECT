# stage 01
FROM node:18-alpine as builder
WORKDIR  /app
COPY frontend/package*.json ./
ENV NPM_CONFIG_IGNORE_SCRIPTS=true
RUN npm ci
COPY frontend/ .
RUN npm run build

# stage 02
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY infra/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/ | grep -q "<!DOCTYPE html>" || exit 1

RUN addgroup -S wanderlustapp && adduser -S -G wanderlustapp wanderlustappuser
# USER wanderlustappuser

CMD [ "nginx","-g","daemon off;" ]


