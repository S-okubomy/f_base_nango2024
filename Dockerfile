FROM node:21.5.0-alpine

WORKDIR /myapp

COPY . .

RUN yarn global add firebase-tools