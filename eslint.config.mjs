import { FlatCompat } from "@eslint/eslintrc";
import typeScriptEsLintPlugin from "@typescript-eslint/eslint-plugin";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: typeScriptEsLintPlugin.configs["recommended"],
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "plugin:@typescript-eslint/recommended"],
    rules: {
      quotes: ["error", "double"],
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "no-console": "warn",
      "import/no-anonymous-default-export": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  }),
];

export default eslintConfig;
