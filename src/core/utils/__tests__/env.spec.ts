import { getEnvFilePath } from '../env'

describe('env utils', () => {
  describe('getEnvFilePath', () => {
    const originalEnv = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = {
        ...originalEnv,
        NODE_ENV: 'dev',
      }
    })

    afterEach(() => {
      process.env = originalEnv
    })

    it('should return path to env file according to the NODE_ENV variable', () => {
      const expectedPath = '.env.dev'

      expect(getEnvFilePath()).toBe(expectedPath)
    })
  })
})
