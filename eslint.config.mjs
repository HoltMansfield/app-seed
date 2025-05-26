import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import requireHighlightImport from "./eslint-rules/require-highlight-import.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jsx-a11y/recommended"
  ),
  {
    plugins: {
      "require-highlight-import": requireHighlightImport,
      "jsx-a11y": require.resolve("eslint-plugin-jsx-a11y")
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
];

export default eslintConfig;
