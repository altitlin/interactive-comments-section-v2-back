# Intro

This is a interactive comments section.

**Technology stack:** NestJS, TypeScript, MongoDB, MongoDB Atlas, Docker, Jest

# Preliminary requirements
* [Docker](https://www.docker.com/)
* [Postman](https://www.postman.com/downloads/)

## Running development mode

### Setting up development environment variables
Create an ```.env.local``` file in the root directory and add the folloing in
````javascript
PORT=3000
MONGO_INITDB_ROOT_USERNAME=<Your mongo db username>
MONGO_INITDB_ROOT_PASSWORD=<Your mongo db password>
MONGO_INITDB_DATABASE=<Your mongo db name>
MONGO_INITDB_HOST=<Your mongo db host>
MONGO_INITDB_PORT=27017
NODE_ENV=development
````

### Running a docker container for development
```bash
$ make dev
```

> The app will automatically reload if you change any of the source files.

### Stopping a docker container for development
```bash
$ make stop
```

## Running production mode

### Create an account
Create an mongo db atlas account and setup the the network and database access

### Setting up production environment variables
Create an ```.env``` file in the root directory and add the folloing in
````javascript
PORT=3000
MONGO_INITDB_ROOT_USERNAME=<Your mongo db username>
MONGO_INITDB_ROOT_PASSWORD=<Your mongo db password>
MONGO_INITDB_DATABASE=<Your mongo db name>
MONGO_INITDB_HOST=<Your mongo db host>
NODE_ENV=production
````

### Running a docker container for production
```bash
$ make prod
```

### Stopping a docker container for production
```bash
$ make stop
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
