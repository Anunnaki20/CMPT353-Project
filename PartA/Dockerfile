FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install express body-parser mysql

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]