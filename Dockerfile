FROM php:7.4-apache

COPY . /var/www/html
WORKDIR /var/www/html

EXPOSE 80
