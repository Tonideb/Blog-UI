import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Add custom rules/overrides
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable 'any' rule
      "@next/next/no-img-element": "off", // Disable <img> warning
    },
  },
];

export default eslintConfig;
