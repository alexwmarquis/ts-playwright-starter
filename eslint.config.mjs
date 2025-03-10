import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginPlaywright from "eslint-plugin-playwright";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintParserTypeScript from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const eslintConfig = [
    ...compat.extends(),
    {
        plugins: {
            prettier: eslintPluginPrettier,
            "@typescript-eslint": eslintPluginTypeScript
        },
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: eslintParserTypeScript,
            parserOptions: {
                ecmaVersion: "latest",
                tsconfigRootDir: __dirname,
                project: ["./tsconfig.json"],
                sourceType: "module"
            }
        },
        rules: {}
    },
    {
        ...eslintPluginPlaywright.configs["flat/recommended"],
        files: ["src/tests/**"],
        rules: {
            ...eslintPluginPlaywright.configs["flat/recommended"].rules,
            "playwright/expect-expect": "error",
            "playwright/max-nested-describe": "error",
            "playwright/missing-playwright-await": "error",
            "playwright/no-element-handle": "error",
            "playwright/no-eval": "error",
            "playwright/no-focused-test": "error",
            "playwright/no-force-option": "error",
            "playwright/no-nested-step": "error",
            "playwright/no-networkidle": "error",
            "playwright/no-page-pause": "error",
            "playwright/no-standalone-expect": "error",
            "playwright/no-unsafe-references": "error",
            "playwright/no-useless-await": "error",
            "playwright/no-useless-not": "error",
            "playwright/no-wait-for-selector": "error",
            "playwright/no-wait-for-timeout": "error",
            "playwright/prefer-web-first-assertions": "error",
            "playwright/valid-describe-callback": "error",
            "playwright/valid-expect-in-promise": "error",
            "playwright/valid-expect": "error",
            "playwright/valid-title": "error",
            "playwright/no-skipped-test": "off",
            "playwright/no-conditional-in-test": "off",
            "playwright/no-conditional-expect": "off"
        }
    }
];

export default eslintConfig;
