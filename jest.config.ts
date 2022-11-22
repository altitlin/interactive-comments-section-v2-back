import type { Config } from 'jest'

export default async (): Promise<Config> => ({
  verbose: true,
  preset: 'ts-jest',
  roots: [ '<rootDir>/src' ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [ 'lcov' ],
  collectCoverageFrom: [
    'src/features/**/*.ts',
    'src/core/filters/**/*.ts',
    'src/core/lib/**/*.ts',
    'src/core/utils/**/*.ts',
    'src/core/pipes/**/*.ts',
    '!**/node_modules/**',
  ],
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
})
