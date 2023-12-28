export default {
  roots: ["<rootDir>/src"],
  moduleDirectories: ["node_modules"],
  testPathIgnorePatterns: ["./node_modules/"],
  testEnvironment: "node",
  testMatch: ["**/+(*.)+(spec|e2e|integration).+(ts|js)?(x)"],
  transform: {
    "^.+\\.[tj]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
  },
  preset: "ts-jest",
  maxWorkers: "25%",
  moduleFileExtensions: ["ts", "js"],
  restoreMocks: true,
  displayName: "backend",
  coverageDirectory: "../../coverage/apps/backend",
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
};
