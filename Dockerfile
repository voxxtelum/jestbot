FROM node:12.14-alpine
WORKDIR /usr/src/app
COPY . .
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk add --no-cache \
  python \
  g++ \
  build-base \
  musl-dev \
  pixman-dev \
  cairo-dev \
  pango-dev \
  jpeg-dev \
  giflib \
  libjpeg-turbo-dev \
  && npm install
RUN apk add --no-cache \
  msttcorefonts-installer \
  && update-ms-fonts \
  && fc-cache -f
EXPOSE 3000
VOLUME ./config
CMD node index.js