import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next", "next/core-web-vitals"),
  {
    ignores: [
      "src/components/LanguageToggle.tsx",
      "src/components/1 Navbar/**",
      "src/components/2 Hero/**",
      "src/components/3 Projects/**",
      "src/components/5 Footer/**",
    ],
  },
  {
    rules: {
      "react/no-unescaped-entities": "off", // Desactiva esta regla
    },
  },
];

export default eslintConfig;
