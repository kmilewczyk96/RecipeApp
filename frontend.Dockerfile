FROM node:20-alpine3.21
LABEL maintainer="kmilewczyk"

COPY ./front /front
WORKDIR /front
EXPOSE 5173

RUN npm install

ENV NODE_ENV=development
ENV WDS_SOCKET_PORT=0
