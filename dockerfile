FROM nginx:stable

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist/nankuru-front  /usr/share/nginx/html

EXPOSE 80
