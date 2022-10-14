FROM node:16-alpine AS builder

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

USER node

FROM node:16-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

COPY --chown=node:node --from=builder /app/dist ./dist

CMD [ "npm", "run", "start:prod" ]
