/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest.js';
const dotenv = require('dotenv');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

dotenv.config({path: '.env.local'});

const config: Config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
