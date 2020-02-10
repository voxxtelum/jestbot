FROM node:12.14-alpine
WORKDIR /usr/src/app
COPY . .
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++ \
  && npm install \
  && apk del build-dependencies
EXPOSE 3000
VOLUME ./config
CMD node index.js