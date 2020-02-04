FROM node:12.14-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN cd ./config && mv config.json.sample config.json
EXPOSE 3000
VOLUME ./config
CMD node index.js