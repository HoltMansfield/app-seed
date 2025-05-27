const { FlatCompat } = require("@eslint/eslintrc");
const jsxA11y = require("eslint-plugin-jsx-a11y");

// __dirname is available by default in CommonJS
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const requireHighlightImport = require("./eslint-rules/require-highlight-import.cjs");

module.exports = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jsx-a11y/recommended"
  ),
  {
    plugins: {
      "require-highlight-import": requireHighlightImport,
      "jsx-a11y": jsxA11y
    },
    rules: {
      "require-highlight-import/require-highlight-import": "warn",
      "no-unused-vars": ["warn", { varsIgnorePattern: "^H$" }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^H$" },
      ],
      // You can override or add jsx-a11y rules here if needed
    },
  },
  // ...any other configs
];
