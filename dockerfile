FROM nginx:stable

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nkc-front.conf /etc/nginx/sites-enabled/default
COPY ./dist/nankuru-front  /var/www/nkc-front

EXPOSE 80
