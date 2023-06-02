# Dockerfile
FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm i

COPY wildersdb.sqlite ./
 
CMD npm start