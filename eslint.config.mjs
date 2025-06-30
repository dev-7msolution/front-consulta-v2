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

  // Aqui você sobrescreve ou desativa regras
  {
    rules: {
      "no-console": "off",        // desativa console.log
      "react/react-in-jsx-scope": "off", // para projetos Next.js
    },
  },
];

export default eslintConfig;
