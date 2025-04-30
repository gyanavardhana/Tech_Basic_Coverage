import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn", // Warn about unused variables
        {
          argsIgnorePattern: "^_",  // Ignore unused args starting with "_"
          varsIgnorePattern: "^_",  // Ignore unused variables starting with "_"
        },
      ],
      "@typescript-eslint/ban-ts-comment": "warn",
    },
  },
]);
