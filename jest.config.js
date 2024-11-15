const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Mapeia estilos e assets para evitar erros
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.ts",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/out/**",
    "!**/coverage/**",
    "!jest.config.js",
  ],
  coverageDirectory: "./coverage",
};

module.exports = createJestConfig(customJestConfig);
