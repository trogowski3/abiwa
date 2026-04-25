# builder
FROM alpine AS builder
WORKDIR /app
COPY public/ .

# production
FROM nginx:alpine

ARG NGINX_VERSION
LABEL version=$NGINX_VERSION

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app /usr/share/nginx/html
