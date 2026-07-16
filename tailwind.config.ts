import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        "border-strong": "hsl(var(--border-strong))",
        "border-subtle": "hsl(var(--border-subtle))",
        "border-emphasis": "hsl(var(--border-emphasis))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        "background-alt": "hsl(var(--background-alt))",
        "background-primary": "hsl(var(--background-primary))",
        "background-secondary": "hsl(var(--background-secondary))",
        "background-elevated": "hsl(var(--background-elevated))",
        "background-inverse": "hsl(var(--background-inverse))",
        "background-process": "hsl(var(--background-process))",
        foreground: "hsl(var(--foreground))",
        heading: "hsl(var(--heading))",
        ink: "hsl(var(--ink))",
        paper: "hsl(var(--paper))",
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-tertiary": "hsl(var(--text-tertiary))",
        "text-inverse": "hsl(var(--text-inverse))",
        navy: {
          DEFAULT: "hsl(var(--navy))",
          950: "hsl(var(--navy-950))",
          900: "hsl(var(--navy-900))",
          800: "hsl(var(--navy-800))",
          700: "hsl(var(--navy-700))",
        },
        olive: {
          DEFAULT: "hsl(var(--olive))",
          800: "hsl(var(--olive-800))",
          700: "hsl(var(--olive-700))",
        },
        chiffon: {
          DEFAULT: "hsl(var(--lemon-chiffon))",
          100: "hsl(var(--chiffon-100))",
          200: "hsl(var(--chiffon-200))",
        },
        cream: "hsl(var(--cream))",
        slate: {
          DEFAULT: "hsl(var(--slate))",
          500: "hsl(var(--slate-500))",
          ink: "hsl(var(--slate-ink))",
        },
        surface: {
          card: "hsl(var(--surface-card))",
          "card-hover": "hsl(var(--surface-card-hover))",
          selected: "hsl(var(--surface-selected))",
        },
        signal: {
          success: "hsl(var(--signal-success))",
          processing: "hsl(var(--signal-processing))",
          inactive: "hsl(var(--signal-inactive))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        // Functional status tier (success / warning / danger / info)
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          primary: "hsl(var(--accent-primary))",
          secondary: "hsl(var(--accent-secondary))",
          active: "hsl(var(--accent-active))",
          text: "hsl(var(--accent-text))",
        },
        "accent-text": "hsl(var(--accent-text))",
        slot: {
          primary: "hsl(var(--slot-primary))",
          secondary: "hsl(var(--slot-secondary))",
          accent: "hsl(var(--slot-accent))",
          background: "hsl(var(--slot-background))",
          surface: "hsl(var(--slot-surface))",
          inverse: "hsl(var(--slot-inverse))",
          neutral: "hsl(var(--slot-neutral))",
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
      fontFamily: {
        display: ["var(--font-inter-tight)", "sans-serif"],
        ui: ["var(--font-plus-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "tk-h1": ["2.5rem", { lineHeight: "2.75rem", fontWeight: "600" }],
        "tk-h2": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        "tk-h3": ["1.5rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "tk-sub": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "500" }],
        "tk-eyebrow": ["0.75rem", { lineHeight: "1rem", fontWeight: "600", letterSpacing: "0.22em" }],
        "tk-body": ["1rem", { lineHeight: "1.5rem" }],
        "tk-body-sm": ["0.875rem", { lineHeight: "1.25rem" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
