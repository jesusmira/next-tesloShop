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
    // quitar el warning de la propiedad "any" por defecto no sale en el proyecto de next con typescript
    rules: {
      // '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      "no-unused-vars": "off",
      // 'react/display-name': 'off',
      // 'import/no-anonymous-default-export': 'off',
    },
  },
];

export default eslintConfig;
