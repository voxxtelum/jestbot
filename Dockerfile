FROM node:10.13-alpine
VOLUME /usr/src/app
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
RUN touch config.json
COPY . /usr/src/app
EXPOSE 3000
CMD node index.js