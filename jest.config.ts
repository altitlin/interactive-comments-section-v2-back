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
  moduleNameMapper: {
    '^@features(.*)$': '<rootDir>/src/features$1',
    '^@core(.*)$': '<rootDir>/src/core$1',
  },
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
})
