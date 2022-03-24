FROM node:14.15.5-alpine3.11

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

ADD --chown=node:node . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev:watch" ]
