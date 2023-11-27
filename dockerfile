FROM nginx:stable

RUN mkdir -p /etc/nginx/sites-available

COPY ./nkc-front.conf /etc/nginx/sites-enabled/default
COPY ./nkc-front.conf /etc/nginx/sites-available/default
COPY ./dist/nankuru-front  /var/www/nkc-front

EXPOSE 80
