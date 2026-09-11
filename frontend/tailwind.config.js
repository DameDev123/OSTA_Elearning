
/** @type {import('tailwindcss').Config} */

export default {
  /* =========================================================
     DARK MODE
     ---------------------------------------------------------
     Usage:
       <html class="dark">
     ========================================================= */
  darkMode: "class",

  /* =========================================================
     CONTENT
     ========================================================= */
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      /* =====================================================
         COLORS
      ===================================================== */
      colors: {
        /* ---------------------------------------------------
           PRIMARY
        --------------------------------------------------- */
        primary: {
          DEFAULT:
            "rgb(var(--color-primary) / <alpha-value>)",

          hover:
            "rgb(var(--color-primary-hover) / <alpha-value>)",

          light:
            "rgb(var(--color-primary-light) / <alpha-value>)",

          lighter:
            "rgb(var(--color-primary-lighter) / <alpha-value>)",

          dark:
            "rgb(var(--color-primary-dark) / <alpha-value>)",

          darker:
            "rgb(var(--color-primary-darker) / <alpha-value>)",

          border:
            "rgb(var(--color-primary-border) / <alpha-value>)",

          foreground:
            "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },

        /* ---------------------------------------------------
           SECONDARY
        --------------------------------------------------- */
        secondary: {
          DEFAULT:
            "rgb(var(--color-secondary) / <alpha-value>)",

          hover:
            "rgb(var(--color-secondary-hover) / <alpha-value>)",

          light:
            "rgb(var(--color-secondary-light) / <alpha-value>)",

          dark:
            "rgb(var(--color-secondary-dark) / <alpha-value>)",

          foreground:
            "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },

        /* ---------------------------------------------------
           ACCENT
        --------------------------------------------------- */
        accent: {
          DEFAULT:
            "rgb(var(--color-accent) / <alpha-value>)",

          hover:
            "rgb(var(--color-accent-hover) / <alpha-value>)",

          light:
            "rgb(var(--color-accent-light) / <alpha-value>)",

          dark:
            "rgb(var(--color-accent-dark) / <alpha-value>)",

          foreground:
            "rgb(var(--color-accent-foreground) / <alpha-value>)",
        },

        /* ---------------------------------------------------
           GOLD
        --------------------------------------------------- */
        gold: {
          DEFAULT:
            "rgb(var(--color-gold) / <alpha-value>)",

          light:
            "rgb(var(--color-gold-light) / <alpha-value>)",

          dark:
            "rgb(var(--color-gold-dark) / <alpha-value>)",
        },

        /* ---------------------------------------------------
           SUCCESS
        --------------------------------------------------- */
        success: {
          DEFAULT:
            "rgb(var(--color-success) / <alpha-value>)",

          hover:
            "rgb(var(--color-success-hover) / <alpha-value>)",

          light:
            "rgb(var(--color-success-light) / <alpha-value>)",

          dark:
            "rgb(var(--color-success-dark) / <alpha-value>)",

          foreground:
            "rgb(var(--color-success-foreground) / <alpha-value>)",
        },

        /* ---------------------------------------------------
           DANGER
        --------------------------------------------------- */
        danger: {
          DEFAULT:
            "rgb(var(--color-danger) / <alpha-value>)",

          hover:
            "rgb(var(--color-danger-hover) / <alpha-value>)",

          light:
            "rgb(var(--color-danger-light) / <alpha-value>)",

          dark:
            "rgb(var(--color-danger-dark) / <alpha-value>)",

          foreground:
            "rgb(var(--color-danger-foreground) / <alpha-value>)",
        },

        /* ---------------------------------------------------
           WARNING
        --------------------------------------------------- */
        warning: {
          DEFAULT:
            "rgb(var(--color-warning) / <alpha-value>)",

          hover:
            "rgb(var(--color-warning-hover) / <alpha-value>)",

          light:
            "rgb(var(--color-warning-light) / <alpha-value>)",

          dark:
            "rgb(var(--color-warning-dark) / <alpha-value>)",

          foreground:
            "rgb(var(--color-warning-foreground) / <alpha-value>)",
        },

        /* ---------------------------------------------------
           INFO
        --------------------------------------------------- */
        info: {
          DEFAULT:
            "rgb(var(--color-info) / <alpha-value>)",

          hover:
            "rgb(var(--color-info-hover) / <alpha-value>)",

          light:
            "rgb(var(--color-info-light) / <alpha-value>)",

          dark:
            "rgb(var(--color-info-dark) / <alpha-value>)",

          foreground:
            "rgb(var(--color-info-foreground) / <alpha-value>)",
        },

        /* ===================================================
           SURFACES
           ---------------------------------------------------
           These should be used instead of bg-white/bg-black
           throughout the application.
        =================================================== */

        surface: {
          DEFAULT:
            "rgb(var(--color-bg) / <alpha-value>)",

          canvas:
            "rgb(var(--color-bg-canvas) / <alpha-value>)",

          card:
            "rgb(var(--color-surface) / <alpha-value>)",

          muted:
            "rgb(var(--color-surface-muted) / <alpha-value>)",

          elevated:
            "rgb(var(--color-surface-elevated) / <alpha-value>)",

          overlay:
            "rgb(var(--color-surface-overlay) / <alpha-value>)",

          hover:
            "rgb(var(--color-surface-hover) / <alpha-value>)",

          active:
            "rgb(var(--color-surface-active) / <alpha-value>)",
        },

        /* ===================================================
           SIDEBAR
        =================================================== */
        sidebar: {
          DEFAULT:
            "rgb(var(--color-sidebar) / <alpha-value>)",

          surface:
            "rgb(var(--color-sidebar-surface) / <alpha-value>)",

          hover:
            "rgb(var(--color-sidebar-hover) / <alpha-value>)",

          active:
            "rgb(var(--color-sidebar-active) / <alpha-value>)",

          border:
            "rgb(var(--color-sidebar-border) / <alpha-value>)",

          foreground:
            "rgb(var(--color-sidebar-text) / <alpha-value>)",

          muted:
            "rgb(var(--color-sidebar-text-muted) / <alpha-value>)",
        },

        /* ===================================================
           BORDERS
        =================================================== */
        border: {
          DEFAULT:
            "rgb(var(--color-border) / <alpha-value>)",

          muted:
            "rgb(var(--color-border-muted) / <alpha-value>)",

          strong:
            "rgb(var(--color-border-strong) / <alpha-value>)",

          focus:
            "rgb(var(--color-border-focus) / <alpha-value>)",
        },

        /* ===================================================
           TYPOGRAPHY / INK
        =================================================== */
        ink: {
          DEFAULT:
            "rgb(var(--color-text) / <alpha-value>)",

          soft:
            "rgb(var(--color-text-soft) / <alpha-value>)",

          muted:
            "rgb(var(--color-text-muted) / <alpha-value>)",

          faint:
            "rgb(var(--color-text-faint) / <alpha-value>)",

          inverse:
            "rgb(var(--color-text-inverse) / <alpha-value>)",

          white: "#FFFFFF",
        },

        /* ===================================================
           STRUCTURE
        =================================================== */
        structure: {
          DEFAULT:
            "rgb(var(--color-structure) / <alpha-value>)",

          sidebar:
            "rgb(var(--color-structure-sidebar) / <alpha-value>)",

          surface:
            "rgb(var(--color-structure-surface) / <alpha-value>)",

          border:
            "rgb(var(--color-structure-border) / <alpha-value>)",
        },

        /* ===================================================
           INTERACTION
        =================================================== */
        focus: {
          DEFAULT:
            "rgb(var(--color-focus) / <alpha-value>)",
        },

        ring: {
          DEFAULT:
            "rgb(var(--color-ring) / <alpha-value>)",
        },
      },

      /* =====================================================
         FONT FAMILY
      ===================================================== */
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],

        display: [
          "Inter",
          "system-ui",
          "sans-serif",
        ],

        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },

      /* =====================================================
         FONT WEIGHT
      ===================================================== */
      fontWeight: {
        450: "450",
        550: "550",
        650: "650",
      },

      /* =====================================================
         BOX SHADOWS
      ===================================================== */
      boxShadow: {
        /* Light UI */
        subtle:
          "0 1px 3px 0 rgb(15 23 42 / 0.04), 0 1px 2px -1px rgb(15 23 42 / 0.04)",

        card:
          "0 4px 12px -2px rgb(15 23 42 / 0.06), 0 2px 6px -2px rgb(15 23 42 / 0.04)",

        elevation:
          "0 10px 25px -5px rgb(15 23 42 / 0.08), 0 8px 10px -6px rgb(15 23 42 / 0.05)",

        floating:
          "0 20px 40px -12px rgb(15 23 42 / 0.14)",

        /* Glass */
        glass:
          "0 8px 32px 0 rgb(15 23 42 / 0.08)",

        /* Primary */
        "primary-glow":
          "0 0 24px -4px rgb(var(--color-primary) / 0.30)",

        "primary-glow-lg":
          "0 0 40px -8px rgb(var(--color-primary) / 0.35)",

        /* Dark mode */
        "dark-card":
          "0 8px 30px rgb(0 0 0 / 0.25)",

        "dark-floating":
          "0 20px 45px rgb(0 0 0 / 0.35)",

        /* Inner */
        "inner-soft":
          "inset 0 1px 2px rgb(15 23 42 / 0.04)",
      },

      /* =====================================================
         BORDER RADIUS
      ===================================================== */
      borderRadius: {
        xs: "0.25rem",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      /* =====================================================
         TRANSITIONS
      ===================================================== */
      transitionTimingFunction: {
        smooth:
          "cubic-bezier(0.4, 0, 0.2, 1)",

        emphasized:
          "cubic-bezier(0.16, 1, 0.3, 1)",

        bounce:
          "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      transitionDuration: {
        150: "150ms",
        200: "200ms",
        250: "250ms",
        300: "300ms",
        400: "400ms",
      },

      /* =====================================================
         ANIMATIONS
      ===================================================== */
      animation: {
        "fade-in":
          "fadeIn 0.25s ease-in-out forwards",

        "fade-in-fast":
          "fadeIn 0.15s ease-out forwards",

        "slide-up":
          "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",

        "slide-down":
          "slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",

        "slide-in":
          "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",

        "scale-in":
          "scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",

        "pulse-subtle":
          "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",

        "shimmer":
          "shimmer 2s linear infinite",

        "spin-slow":
          "spin 2s linear infinite",
      },

      /* =====================================================
         KEYFRAMES
      ===================================================== */
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(-12px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },

        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.96)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        pulseSubtle: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.6",
          },
        },

        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
      },

      /* =====================================================
         Z-INDEX SYSTEM
      ===================================================== */
      zIndex: {
        base: "0",
        dropdown: "1000",
        sticky: "1100",
        fixed: "1200",
        modal: "1300",
        popover: "1400",
        toast: "1500",
        tooltip: "1600",
      },

      /* =====================================================
         MAX WIDTH
      ===================================================== */
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
      },

      /* =====================================================
         SIDEBAR WIDTHS
      ===================================================== */
      width: {
        sidebar: "18rem",
        "sidebar-collapsed": "5rem",
      },

      /* =====================================================
         SCREEN / APP HEIGHT
      ===================================================== */
      height: {
        screen: "100dvh",
        "screen-safe":
          "calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
      },
    },
  },

  /* =========================================================
     PLUGINS
     ========================================================= */
  plugins: [],
};

