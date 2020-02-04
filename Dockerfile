FROM node:12.14-alpine
WORKDIR /usr/src/app
COPY package.json packagelock.json ./
RUN npm install
COPY . .
RUN touch config.json
RUN chmod 755 config.json
EXPOSE 3000
CMD node index.js