FROM node:16-buster-slim
LABEL maintainer="samiarar"

WORKDIR /usr/src/app

COPY ./server/package.json ./
COPY ./server/package-lock.json ./

RUN npm install

COPY ./server .

ENTRYPOINT npm run start