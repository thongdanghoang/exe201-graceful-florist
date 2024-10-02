FROM docker.io/bitnami/nginx:1.25

ADD dist/graceful-florist-web/browser /app/graceful-florist-web
COPY nginx.conf /opt/bitnami/nginx/conf/nginx.conf

USER 1001
