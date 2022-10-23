import type { Config } from 'jest'

export default async (): Promise<Config> => ({
  verbose: true,
  preset: 'ts-jest',
  roots: [ '<rootDir>/src' ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [ 'lcov' ],
  collectCoverageFrom: [ '**/*.(t|j)s' ],
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
