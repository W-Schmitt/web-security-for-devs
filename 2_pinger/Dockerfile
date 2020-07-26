FROM node:lts-alpine

RUN adduser node node

RUN apk add iputils

USER node

COPY ./flag /home/node

RUN mkdir -p /home/node/app

COPY . /home/node/app/

WORKDIR /home/node/app/

RUN rm Dockerfile flag .dockerignore .gitignore

RUN npm install

USER root

RUN chmod -R a-w /home/node

USER node

EXPOSE 3001

CMD ["node","server.js"]
