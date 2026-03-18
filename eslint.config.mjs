import next from "@next/eslint-plugin-next"

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // Next.js recommended rules (flat config)
  next.configs.recommended,
  next.configs["core-web-vitals"],

  // Project ignores (replacement for .eslintignore)
  {
    ignores: [
      "src/components/LanguageToggle.tsx",
      "src/components/1 Navbar/**",
      "src/components/2 Hero/**",
      "src/components/3 Projects/**",
      "src/components/5 Footer/**",
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
    ],
  },

  // Local rule tweaks
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]

