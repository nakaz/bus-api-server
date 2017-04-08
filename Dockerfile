FROM node:7.8.0-alpine

MAINTAINER Sean Nakamura "seanenakamura@gmail.com"

ENV PORT=3000

ADD . /app/

RUN cd /app && npm install

WORKDIR /app

CMD ["npm", "start"]
