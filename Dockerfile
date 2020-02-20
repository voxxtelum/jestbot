FROM node:12.14-alpine
WORKDIR /usr/src/app
COPY . .
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk add --no-cache \
  build-base \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev \
  python \
  make \
  g++ \
  && npm install \
  && apk add --no-cache \
  msttcorefonts-installer \
  && update-ms-fonts \
  && fc-cache -f
EXPOSE 3000
VOLUME ./config
CMD node index.js