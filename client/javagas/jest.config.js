/** @type {@link jest.Config} */
module.exports = {
  verbose: true,
  displayName: "JaVagas",
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: {
    "^@app/(.*)": "<rootDir>/src/app/$1",
    "^@components/(.*)": "<rootDir>/src/app/components/$1",
    "^@services/(.*)": "<rootDir>/src/app/services/$1",
    "^@custom-types/(.*)": "<rootDir>/src/app/types/$1",
  },
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: ["html", "json"],
};
