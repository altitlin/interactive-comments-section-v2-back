[![CI interactive comments section](https://github.com/altitlin/interactive-comments-section-v2-back/actions/workflows/ci-ics.yml/badge.svg?branch=dev&event=push)](https://github.com/altitlin/interactive-comments-section-v2-back/actions/workflows/ci-ics.yml)

# Intro

This is a interactive comments section.

**Technology stack:** NestJS, TypeScript, MongoDB, MongoDB Atlas, Docker, Jest

# Preliminary requirements
* Install [Docker](https://www.docker.com/)
* Install [Postman](https://www.postman.com/downloads/)
* Install and run MongoDB Community Edition [MacOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/) or [Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
* Install [MongoDB Compass](https://www.mongodb.com/try/download/compass2)

## Running development mode
1. Running an ```npm install``` command in the root directory to install all dependencies
2. Create an ```.env.local``` file in the root directory and add the following in
````javascript
PORT=3000
MONGO_INITDB_DATABASE=ics
MONGO_INITDB_HOST=localhost
MONGO_INITDB_PORT=27017
NODE_ENV=development
FRONT_URL=https://localhost:4242
````
3. Running an ```npm run start:dev``` command in the root directory to launch local dev server
4. Navigate to `http://localhost:3000/api/v1` in a browser to see a docs

> The app will automatically reload if you change any of the source files.

## Running production mode
1. Create an mongo db atlas account and set up the the network and database access
2. Create an ```.env``` file in the root directory and add the following in
````javascript
PORT=3000
MONGO_INITDB_ROOT_USERNAME=<Your mongo db username>
MONGO_INITDB_ROOT_PASSWORD=<Your mongo db password>
MONGO_INITDB_DATABASE=<Your mongo db name>
MONGO_INITDB_HOST=<Your mongo db host>
NODE_ENV=production
FRONT_URL=<Your url frontend>
````
2. Running a docker container ```make prod``` in the root directory

> In order to stop a docker contaienr in the root directory to run an ```make stop``` command

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
