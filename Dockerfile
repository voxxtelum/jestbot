FROM node:12.14-alpine
WORKDIR /usr/src/app
COPY . .
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual .build-deps add \
  python \
  make \
  g++ \
  && apk --no-cache --virtual .canvas-deps add \
  build-base \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev \
  && apk --no-cache add \
  pixman \
  cairo \
  pango \
  giflib \
  libjpeg \
  && npm install \
  && apk add --no-cache \
  msttcorefonts-installer \
  && update-ms-fonts \
  && fc-cache -f
RUN apk del .build-deps
EXPOSE 3000
VOLUME ./config
CMD node index.js