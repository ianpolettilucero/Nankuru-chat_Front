FROM nginx:stable

COPY ./nkc-front.conf /etc/nginx/sites-enabled/default
COPY ./dist/nankuru-front  /var/www/nkc-front

EXPOSE 80
