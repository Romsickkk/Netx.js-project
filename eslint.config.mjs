import simpleImportSort from "eslint-plugin-simple-import-sort";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Получение __dirname в ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Конфигурация ESLint
const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\\u0000"], ["^@?\\w"], ["^[^.]"], ["^\\."]],
        },
      ],
      "simple-import-sort/exports": "error",
    },
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },
];

export default config;
