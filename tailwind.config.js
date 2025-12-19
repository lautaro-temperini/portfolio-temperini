/** @type {import('tailwindcss').Config} */
const defaultConfig = require("tailwindcss/defaultConfig")

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        "neue-haas": ["var(--font-neue-haas)", "sans-serif"],
      },
      colors: {
        primary: "#8900C3",
        secondary: "#595959",
        accent: "#A6A6A6",
        background: "#0D0D0D",
        surface: "#111111",
        border: "#9C96A4",
        subtle: "#333", // Border sutil para cards y secciones
        light: "#F2F2F2",
        white: "#fff",
        dark: "#1A1A1A",
        // Tokens semánticos para contenedores y textos
        container: {
          DEFAULT: "#18181b", // Color base para contenedores oscuros
          light: "#F2F2F2", // Color base para contenedores claros
        },
        text: {
          light: "#F1F1F1", // Texto claro (ligeramente diferente de light para mejor contraste)
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-up": "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        tilt: 'tilt 3s linear infinite',
        flip: 'flipInX 1.2s cubic-bezier(0.6, 0.05, 0.2, 0.95)',
        shine: 'shine 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1.5deg)' },
          '75%': { transform: 'rotate(-1.5deg)' },
        },
        flipInX: {
          '0%': {
            transform: 'perspective(400px) rotateY(0deg)',
          },
          '100%': {
            transform: 'perspective(400px) rotateY(360deg)',
          },
        },
        shine: {
          '0%':   { 'background-position': '100%' },
          '50%':  { 'background-position': '-100%' },
          '100%': { 'background-position': '-200%' },
        },
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
       // Spacing personalizado (mantiene el de Tailwind por defecto)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'touch': '44px', // Touch target mínimo para accesibilidad (WCAG)
      },
      minHeight: {
        'touch': '44px', // Touch target mínimo para accesibilidad
      },
      
      // Border radius con nomenclatura clara
      borderRadius: {
        'none': '0',
        'xs': '0.125rem',    // 2px
        'sm': '0.25rem',     // 4px
        'DEFAULT': '0.375rem', // 6px
        'md': '0.5rem',      // 8px - tu --radius actual
        'lg': '0.75rem',     // 12px
        'xl': '1rem',        // 16px
        '2xl': '1.5rem',     // 24px
        '3xl': '2rem',       // 32px
        'full': '9999px',
      },
      
      // Tipografía ya la tenés, pero agregá weights consistentes
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      
      // Line heights específicos
      lineHeight: {
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      
      // Shadows consistentes
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(137, 0, 195, 0.3)',
        'multi-layer-shadow':
          '0 2px 4px rgba(0, 0, 0, 0.35), 0 8px 16px rgba(0, 0, 0, 0.28), 0 20px 32px rgba(0, 0, 0, 0.22)',
        none: 'none',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}