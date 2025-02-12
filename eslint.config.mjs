import "eslint-plugin-simple-import-sort";

import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    plugins: ["simple-import-sort"],
    rules: {
      quotes: ["error", "double"],
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "no-console": "warn",
    },
    overrides: [
      {
        files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
        rules: {
          "max-len": [
            "error",
            {
              code: 120,
              tabWidth: 2,
              ignoreStrings: true,
              ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
            },
          ],
          // "@typescript-eslint/ban-types": 1,
          "simple-import-sort/imports": [
            "warn",
            {
              groups: [
                // `react` first, `next` second, then packages starting with a character
                ["^react$"],
                // other packages
                ["^[a-z]"],
                // Packages starting with `@/`,
                ["^@/"],
                // Utils from project
                ["^(@/utils)(/.*|$)", "^(./utils)(/.*|$)"],
                // Style imports
                ["^.+\\.s?css$", "^.+\\.s?styled$"],
                // Assets imports
                ["^@/assets/"],
                // Imports starting with `../`
                ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                // Imports starting with `./`
                ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                // Packages starting with `~`
                ["^~"],
                // Interface && Type -- last import
                ["^.*\\u0000$"],
                ["^\\u0000"],
                ["^@?\\w"],
                ["^"],
                ["^\\."],
              ],
            },
          ],
        },
      },
    ],
  }),
];

export default eslintConfig;
