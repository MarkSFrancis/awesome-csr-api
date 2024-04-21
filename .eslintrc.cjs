/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", 'import'],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["./api/**/*.ts", "app.ts"],
      rules: {
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            ts: "never",
            js: "always",
          },
        ],
      },
    },
  ],
};
