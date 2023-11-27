FROM nginx:stable

#COPY ./nginx.conf /etc/nginx/nginx.conf
#COPY ./nkc-front.conf /etc/nginx/sites-enabled/nkc-front.conf
#COPY ./nkc-front.conf /etc/nginx/sites-available/nkc-front.conf
COPY ./dist/nankuru-front  /usr/share/nginx/html

EXPOSE 80
