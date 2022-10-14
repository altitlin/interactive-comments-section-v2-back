const paramsSerializer = (params: Record<string, unknown>): string => {
  const PARAMS_SEPARATOR = '&'

  return Object.entries(params).reduce((acc, [ key, value ], idx, arr) => {
    // eslint-disable-next-line no-magic-numbers
    const isLastParam = idx === arr.length - 1

    acc += `${key}=${value}${!isLastParam ? PARAMS_SEPARATOR : ''}`.trim()

    return acc
  }, '?')
}

const getMongoURIDev = () => {
  const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_HOST,
    MONGO_INITDB_PORT,
    MONGO_INITDB_DATABASE,
  } = process.env

  const params: Record<string, unknown> = {
    authSource: 'admin',
  }

  return `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_INITDB_HOST}:${MONGO_INITDB_PORT}/${MONGO_INITDB_DATABASE}${paramsSerializer(params)}`
}

const getMongoURIProd = () => {
  const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_HOST,
    MONGO_INITDB_DATABASE,
  } = process.env

  const params: Record<string, unknown> = {
    retryWrites: true,
    w: 'majority',
  }

  return `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_INITDB_HOST}/${MONGO_INITDB_DATABASE}${paramsSerializer(params)}`
}

export const getMongoURI = () => ({
  development: getMongoURIDev,
  production: getMongoURIProd,
})[process.env.NODE_ENV]()
