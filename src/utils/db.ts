export const getMongoURI = () => {
  const {
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_NAME,
    MONGODB_HOST
  } = process.env

  return `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_NAME}?retryWrites=true&w=majority`
}
