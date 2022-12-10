import { getMongoURI } from '../db'

const mockEnv = {
  NODE_ENV: 'dev',
  MONGO_INITDB_HOST: 'host',
  MONGO_INITDB_PORT: '4242',
  MONGO_INITDB_DATABASE: 'db',
}

describe('Database utils', () => {
  describe('getMongoURI', () => {
    const originalEnv = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = {
        ...originalEnv,
        ...mockEnv,
      }
    })

    afterEach(() => {
      process.env = originalEnv
    })

    it('should return the URI mongo according to the NODE_ENV variable', () => {
      const expectedURI = `mongodb://${mockEnv.MONGO_INITDB_HOST}:${mockEnv.MONGO_INITDB_PORT}/${mockEnv.MONGO_INITDB_DATABASE}`

      expect(getMongoURI()).toBe(expectedURI)
    })
  })
})
