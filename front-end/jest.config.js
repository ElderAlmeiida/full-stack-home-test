module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.test.tsx'],
    coverageDirectory: './coverage',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.tsx'],
  };
  