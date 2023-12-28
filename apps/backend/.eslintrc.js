const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  ignorePatterns: ["node_modules/", "dist/", "**/.eslintrc.js"],
  parserOptions: {
    project: project,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "import", "no-only-tests"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: "**/tsconfig.json",
      },
      node: true,
    },
    "import/external-module-folders": ["node_modules", ".yarn"],
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    semi: "off",
    "@typescript-eslint/semi": "error",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  overrides: [
    {
      files: ["**/*.spec.ts", "**/*.integration.ts", "**/*.e2e.ts"],
      rules: {
        "no-only-tests/no-only-tests": "error",
      },
    },
  ],
};
