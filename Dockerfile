FROM node:10.13-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN touch ./config.json
EXPOSE 3000
CMD node index.js