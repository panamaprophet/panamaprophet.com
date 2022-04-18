FROM node:latest

WORKDIR /www

COPY build ./build
COPY package.json .
COPY next.config.js .

RUN yarn install --production

EXPOSE 80
