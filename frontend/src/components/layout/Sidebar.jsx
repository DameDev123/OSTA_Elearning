
import { Link, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import {
  X,
  ChevronRight,
  
} from "lucide-react";

import logoImage from "../../assets/logo.png";

/**
 * ============================================================
 * OSTA PROFESSIONAL SIDEBAR
 * ============================================================
 *
 * Features:
 * - Light / Dark theme support
 * - Responsive mobile drawer
 * - Active route detection
 * - Nested route support
 * - Active navigation indicator
 * - Optional navigation badges
 * - Optional navigation sections
 * - Dynamic Lucide icons
 * - Accessible navigation
 * - Keyboard focus states
 * - Professional hover states
 * - Custom scrollbar
 * - OSTA logo branding
 * - Smooth animations
 * - Reusable configuration
 * ============================================================
 */

export default function Sidebar({
  navItems = [],
  isOpen = false,
  onClose,
  title = "OSTA",
  subtitle = "Learning Platform",
}) {
  const location = useLocation();

  /**
   * ==========================================================
   * CHECK ACTIVE ROUTE
   * ==========================================================
   *
   * Supports:
   *
   * /instructor/courses
   * /instructor/courses/create
   * /instructor/courses/12
   *
   * The parent navigation remains active on nested pages.
   */
  function isItemActive(href) {
    if (!href) {
      return false;
    }

    // Exact route
    if (location.pathname === href) {
      return true;
    }

    // Nested route
    if (
      href !== "/" &&
      location.pathname.startsWith(`${href}/`)
    ) {
      return true;
    }

    return false;
  }

  /**
   * ==========================================================
   * ICON RESOLVER
   * ==========================================================
   *
   * Safely resolves icon name from navItems.
   *
   * Example:
   * icon: "LayoutDashboard"
   */
  function getIcon(iconName) {
    if (!iconName) {
      return Icons.Circle;
    }

    return Icons[iconName] || Icons.Circle;
  }

  /**
   * ==========================================================
   * RENDER NAVIGATION ITEM
   * ==========================================================
   */
  function renderNavItem(item) {
    const Icon = getIcon(item.icon);

    const isActive = isItemActive(item.href);

    return (
      <Link
        key={`${item.label}-${item.href}`}
        to={item.href}
        onClick={onClose}
        aria-current={isActive ? "page" : undefined}
        className={`
          group
          relative
          flex
          min-h-[44px]
          items-center
          gap-3
          rounded-xl
          px-3
          py-2.5
          text-sm
          transition-all
          duration-200
          ease-smooth

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          focus-visible:ring-offset-sidebar

          ${
            isActive
              ? `
                bg-sidebar-active
                font-semibold
                text-primary
              `
              : `
                font-medium
                text-sidebar-foreground
                hover:bg-sidebar-hover
                hover:text-ink
              `
          }
        `}
      >
        {/* ==================================================
            ACTIVE INDICATOR
        =================================================== */}
        {isActive && (
          <span
            aria-hidden="true"
            className="
              absolute
              left-0
              top-1/2
              h-7
              w-1
              -translate-y-1/2
              rounded-r-full
              bg-primary
              shadow-primary-glow
            "
          />
        )}

        {/* ==================================================
            ICON
        =================================================== */}
        <span
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            transition-all
            duration-200

            ${
              isActive
                ? `
                  bg-primary
                  text-primary-foreground
                  shadow-primary-glow
                `
                : `
                  bg-surface-muted
                  text-ink-muted

                  group-hover:bg-surface-hover
                  group-hover:text-ink
                `
            }
          `}
        >
          <Icon
            size={18}
            strokeWidth={isActive ? 2.25 : 2}
          />
        </span>

        {/* ==================================================
            LABEL
        =================================================== */}
        <span className="min-w-0 flex-1 truncate">
          {item.label}
        </span>

        {/* ==================================================
            OPTIONAL BADGE
        =================================================== */}
        {item.badge !== undefined &&
          item.badge !== null && (
            <span
              className={`
                min-w-[20px]
                rounded-full
                px-1.5
                py-0.5
                text-center
                text-[10px]
                font-bold
                leading-4

                ${
                  isActive
                    ? `
                      bg-primary/10
                      text-primary
                      dark:bg-primary/20
                    `
                    : `
                      bg-surface-muted
                      text-ink-muted
                    `
                }
              `}
            >
              {item.badge}
            </span>
          )}

        {/* ==================================================
            CHEVRON
        =================================================== */}
        <ChevronRight
          size={15}
          aria-hidden="true"
          className={`
            shrink-0
            transition-all
            duration-200

            ${
              isActive
                ? `
                  translate-x-0
                  text-primary
                  opacity-100
                `
                : `
                  -translate-x-1
                  text-ink-faint
                  opacity-0

                  group-hover:translate-x-0
                  group-hover:opacity-100
                `
            }
          `}
        />
      </Link>
    );
  }

  /**
   * ==========================================================
   * RENDER SECTION
   * ==========================================================
   *
   * Supports both:
   *
   * Simple:
   * navItems = [...]
   *
   * Grouped:
   * navItems = [
   *   {
   *     title: "Main",
   *     items: [...]
   *   }
   * ]
   */
  function renderNavigation() {
    if (!navItems.length) {
      return (
        <div
          className="
            rounded-xl
            border
            border-sidebar-border
            bg-sidebar-surface
            px-4
            py-6
            text-center
          "
        >
          <p
            className="
              text-xs
              font-medium
              text-sidebar-text-muted
            "
          >
            No navigation items
          </p>
        </div>
      );
    }

    /**
     * Detect grouped navigation.
     */
    const isGrouped = navItems.some(
      (item) =>
        Array.isArray(item.items)
    );

    if (!isGrouped) {
      return (
        <div className="space-y-1">
          {navItems.map(renderNavItem)}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {navItems.map((section, index) => {
          if (!section.items) {
            return renderNavItem(section);
          }

          return (
            <div
              key={
                section.title ||
                `section-${index}`
              }
              className="space-y-1"
            >
              {/* Section title */}
              {section.title && (
                <div
                  className="
                    mb-2
                    px-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-sidebar-text-muted
                  "
                >
                  {section.title}
                </div>
              )}

              {section.items.map(
                renderNavItem
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      <div
        className={`
          fixed
          inset-0
          z-modal
          bg-slate-950/50
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden

          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        id="osta-sidebar"
        aria-label="Main navigation"
        className={`
          fixed
          left-0
          top-0
          z-fixed
          flex
          h-dvh
          w-sidebar
          flex-col

          border-r
          border-sidebar-border

          bg-sidebar

          text-sidebar-foreground

          shadow-elevation
          dark:shadow-dark-card

          transition-transform
          duration-300
          ease-emphasized

          lg:translate-x-0

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ==================================================
            BRAND HEADER
        =================================================== */}
        <div
          className="
            relative
            flex
            shrink-0
            items-center
            gap-3

            border-b
            border-sidebar-border

            px-5
            py-5
          "
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={onClose}
            aria-label="OSTA Home"
            className="
              group
              relative
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-white
              shadow-subtle
              ring-1
              ring-black/5

              transition-transform
              duration-200

              hover:scale-[1.03]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
              focus-visible:ring-offset-sidebar
            "
          >
            <img
              src={logoImage}
              alt="OSTA Logo"
              className="
                h-full
                w-full
                object-contain
                p-1
              "
            />

            {/* Logo hover overlay */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-primary/5
                opacity-0
                transition-opacity
                group-hover:opacity-100
              "
            />
          </Link>

          {/* Brand text */}
          <div className="min-w-0 flex-1">
            <p
              className="
                truncate
                text-sm
                font-extrabold
                tracking-wide
                text-ink
              "
            >
              {title}
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-sidebar-text-muted
              "
            >
              {subtitle}
            </p>
          </div>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            aria-controls="osta-sidebar"
            className="
              ml-auto
              rounded-lg
              p-2

              text-sidebar-text-muted

              transition-all
              duration-200

              hover:bg-sidebar-hover
              hover:text-ink

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring

              lg:hidden
            "
          >
            <X
              size={18}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* ==================================================
            NAVIGATION
        =================================================== */}
        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            py-5

            scrollbar-thin
          "
        >
          {/* Navigation heading */}
          <div
            className="
              mb-3
              px-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-sidebar-text-muted
            "
          >
            Navigation
          </div>

          {renderNavigation()}
        </nav>

        {/* ==================================================
            SIDEBAR FOOTER
        =================================================== */}
        <div
          className="
            shrink-0
            border-t
            border-sidebar-border
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl

              border
              border-sidebar-border

              bg-sidebar-surface

              px-3
              py-3
            "
          >
            {/* Status indicator */}
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-success/10
              "
              aria-hidden="true"
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-success
                  shadow-sm
                  shadow-success/50
                  animate-pulse-subtle
                "
              />
            </div>

            {/* Status text */}
            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-xs
                  font-bold
                  text-ink
                "
              >
                System Online
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  text-sidebar-text-muted
                "
              >
                OSTA Platform
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
