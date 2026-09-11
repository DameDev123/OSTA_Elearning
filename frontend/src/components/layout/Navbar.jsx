
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { PUBLIC_NAV } from '@constants/navigation'
import Button from '@components/ui/Button'
import ThemeToggle from '@components/ui/ThemeToggle'
import LanguageSwitcher from '@components/ui/LanguageSwitcher'
import { useLanguage } from '@context/LanguageContext'

import logoImage from '../../assets/logo.png'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const location = useLocation()
  const { t } = useLanguage()

  /**
   * Check whether a navigation item is currently active.
   *
   * Exact match:
   *   /courses
   *
   * Nested match:
   *   /courses/123
   */
  function isActive(href) {
    if (!href) return false

    if (location.pathname === href) {
      return true
    }

    if (
      href !== '/' &&
      location.pathname.startsWith(`${href}/`)
    ) {
      return true
    }

    return false
  }

  function closeMobileMenu() {
    setMobileOpen(false)
  }

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-border/80
        bg-surface/85
        backdrop-blur-xl
        supports-[backdrop-filter]:bg-surface/70
        transition-colors duration-200
      "
    >
      <nav
        className="
          mx-auto flex h-16 w-full max-w-8xl
          items-center justify-between
          px-4 sm:px-6 lg:px-8 xl:px-10
        "
        aria-label="Main navigation"
      >
        {/* =========================================================
            BRAND
        ========================================================= */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="
            group flex shrink-0 items-center gap-3
            rounded-xl
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
            focus-visible:ring-offset-surface
          "
          aria-label="OSTA E-Learning home"
        >
          {/* Logo */}
          <span
            className="
              relative flex h-10 w-10 shrink-0
              items-center justify-center
              overflow-hidden rounded-xl
              border border-border
              bg-surface-card
              shadow-subtle
              transition-all duration-200
              group-hover:-translate-y-0.5
              group-hover:shadow-card
            "
          >
            <span
              className="
                absolute inset-0
                bg-primary-light/30
                opacity-0
                transition-opacity duration-200
                group-hover:opacity-100
              "
            />

            <img
              src={logoImage}
              alt="OSTA Logo"
              className="
                relative z-10
                h-7 w-7
                object-contain
                transition-transform duration-200
                group-hover:scale-105
              "
            />
          </span>

          {/* Brand Name */}
          <span className="hidden sm:flex flex-col leading-none">
            <span
              className="
                text-lg font-extrabold
                tracking-tight
                text-ink
                transition-colors
                group-hover:text-primary
              "
            >
              OSTA
            </span>

            <span
              className="
                mt-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-ink-faint
              "
            >
              E-Learning
            </span>
          </span>
        </Link>

        {/* =========================================================
            DESKTOP NAVIGATION
        ========================================================= */}

        <div
          id="nav-links"
          className="
            hidden lg:flex
            items-center
            gap-1
            xl:gap-1.5
          "
        >
          {PUBLIC_NAV.map((item) => {
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={active ? 'page' : undefined}
                className={`
                  relative
                  flex items-center
                  rounded-xl
                  px-3.5 py-2
                  text-sm
                  transition-all duration-150
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-surface

                  ${
                    active
                      ? `
                        bg-primary-light
                        font-semibold
                        text-primary
                      `
                      : `
                        font-medium
                        text-ink-soft
                        hover:bg-surface-hover
                        hover:text-ink
                      `
                  }
                `}
              >
                {t(item.labelKey || item.label)}

                {/* Active indicator */}
                {active && (
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0.5
                      left-1/2
                      h-0.5
                      w-5
                      -translate-x-1/2
                      rounded-full
                      bg-primary
                    "
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* =========================================================
            DESKTOP ACTIONS
        ========================================================= */}

        <div className="hidden lg:flex items-center gap-1.5">
          {/* Search */}
          <Link
            to="/search"
            aria-label={t('Search')}
            className="
              group
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              text-ink-soft
              transition-all duration-150
              hover:bg-surface-hover
              hover:text-ink
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
              focus-visible:ring-offset-surface
            "
          >
            <Search
              size={18}
              strokeWidth={2}
              className="
                transition-transform duration-150
                group-hover:scale-105
              "
            />
          </Link>

          {/* Divider */}
          <div
            className="
              mx-2
              h-6
              w-px
              bg-border-muted
            "
            aria-hidden="true"
          />

          {/* Theme */}
          <ThemeToggle />

          {/* Language */}
          <LanguageSwitcher />

          {/* Authentication */}
          <div className="ml-2 flex items-center gap-2">
            <Button
              as={Link}
              to="/login"
              variant="ghost"
              className="
                text-sm
                font-semibold
                text-ink-soft
                hover:text-ink
              "
            >
              {t('Sign In')}
            </Button>

            <Button
              as={Link}
              to="/register"
              variant="primary"
              className="
                text-sm
                font-semibold
                shadow-primary-glow
                hover:shadow-primary-glow-lg
              "
            >
              {t('Get Started')}
            </Button>
          </div>
        </div>

        {/* =========================================================
            MOBILE MENU BUTTON
        ========================================================= */}

        <button
          type="button"
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-border
            bg-surface-card
            text-ink-soft
            shadow-subtle
            transition-all duration-150
            hover:bg-surface-hover
            hover:text-ink
            active:scale-95
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
            focus-visible:ring-offset-surface
            lg:hidden
          "
          aria-label={
            mobileOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setMobileOpen((current) => !current)
          }
        >
          {mobileOpen ? (
            <X size={20} strokeWidth={2} />
          ) : (
            <Menu size={20} strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================= */}

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="
            border-t border-border
            bg-surface
            shadow-floating
            animate-slide-down
            lg:hidden
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-8xl
              px-4
              py-4
              sm:px-6
            "
          >
            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {PUBLIC_NAV.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-current={
                      active ? 'page' : undefined
                    }
                    onClick={closeMobileMenu}
                    className={`
                      flex items-center justify-between
                      rounded-xl
                      px-4 py-3
                      text-sm
                      transition-all duration-150

                      ${
                        active
                          ? `
                            bg-primary-light
                            font-semibold
                            text-primary
                          `
                          : `
                            font-medium
                            text-ink-soft
                            hover:bg-surface-hover
                            hover:text-ink
                          `
                      }
                    `}
                  >
                    <span>
                      {t(item.labelKey || item.label)}
                    </span>

                    <ChevronRight
                      size={16}
                      className={`
                        transition-transform duration-150
                        ${
                          active
                            ? 'text-primary'
                            : 'text-ink-faint'
                        }
                      `}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Divider */}
            <div
              className="
                my-4
                h-px
                bg-border-muted
              "
            />

            {/* Preferences */}
            <div
              className="
                flex items-center
                justify-between
                rounded-xl
                bg-surface-muted
                px-3 py-2.5
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-ink-faint
                "
              >
                Preferences
              </span>

              <div className="flex items-center gap-1">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>

            {/* Authentication */}
            <div
              className="
                mt-3
                grid
                grid-cols-2
                gap-2.5
              "
            >
              <Button
                as={Link}
                to="/login"
                variant="outline"
                onClick={closeMobileMenu}
                className="
                  w-full
                  justify-center
                  font-semibold
                "
              >
                {t('Sign In')}
              </Button>

              <Button
                as={Link}
                to="/register"
                variant="primary"
                onClick={closeMobileMenu}
                className="
                  w-full
                  justify-center
                  font-semibold
                  shadow-primary-glow
                "
              >
                {t('Get Started')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

