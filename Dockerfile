FROM node:16

ARG PORT=3000

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

EXPOSE $PORT:$PORT

USER node

CMD [ "npm", "run", "start:dev" ]
