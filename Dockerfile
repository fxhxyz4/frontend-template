FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --ignore-scripts --no-audit --no-fund

FROM deps AS build
COPY . .
ARG VITE_SITE_URL=http://localhost:3000
ARG VITE_USE_MOCKS=true
ARG VITE_API_URL=/api
ENV VITE_SITE_URL=$VITE_SITE_URL \
    VITE_USE_MOCKS=$VITE_USE_MOCKS \
    VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime
ENV BACKEND_URL=http://backend:8000
COPY docker/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
