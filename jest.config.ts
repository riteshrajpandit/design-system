import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/processes/(.*)$': '<rootDir>/processes/$1',
    '^@/pages/(.*)$': '<rootDir>/_pages/$1',
    '^@/widgets/(.*)$': '<rootDir>/widgets/$1',
    '^@/features/(.*)$': '<rootDir>/features/$1',
    '^@/entities/(.*)$': '<rootDir>/entities/$1',
    '^@/shared/(.*)$': '<rootDir>/shared/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
