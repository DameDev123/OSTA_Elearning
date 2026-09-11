
import { Link, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { X, ChevronRight } from "lucide-react";

export default function Sidebar({
  navItems = [],
  isOpen = false,
  onClose,
  title = "OSTA",
  subtitle = "Learning Platform",
}) {
  const location = useLocation();

  /**
   * Check whether navigation item is active.
   * Supports both exact routes and nested routes.
   */
  function isItemActive(href) {
    if (!href) return false;

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

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-30
            bg-slate-950/40
            backdrop-blur-[2px]
            transition-opacity
            lg:hidden
          "
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed left-0 top-0 z-40
          flex h-dvh w-72 flex-col
          border-r
          bg-white
          shadow-xl shadow-slate-900/5
          transition-all duration-300 ease-in-out

          border-slate-200

          dark:bg-slate-950
          dark:border-slate-800
          dark:shadow-black/20

          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =================================================
            BRAND HEADER
        ================================================== */}
        <div
          className="
            relative flex items-center gap-3
            border-b border-slate-100
            px-5 py-5

            dark:border-slate-800
          "
        >
          {/* Brand Logo */}
          <div
            className="
              relative flex h-11 w-11 shrink-0
              items-center justify-center
              overflow-hidden
              rounded-xl
              bg-primary
              text-sm font-black
              text-white
              shadow-lg shadow-primary/20
            "
          >
            {/* Subtle glow */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-br
                from-white/20
                to-transparent
              "
            />

            <span className="relative">
              {title?.[0]?.toUpperCase() || "O"}
            </span>
          </div>

          {/* Brand Text */}
          <div className="min-w-0 flex-1">
            <p
              className="
                truncate
                text-sm
                font-extrabold
                tracking-wide
                text-slate-900

                dark:text-white
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
                text-slate-400

                dark:text-slate-500
              "
            >
              {subtitle}
            </p>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition

              hover:bg-slate-100
              hover:text-slate-700

              focus:outline-none
              focus:ring-2
              focus:ring-primary/30

              dark:text-slate-500
              dark:hover:bg-slate-800
              dark:hover:text-slate-200

              lg:hidden
            "
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}
        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            py-5

            scrollbar-thin
            scrollbar-thumb-slate-200
            scrollbar-track-transparent

            dark:scrollbar-thumb-slate-700
          "
          aria-label="Main navigation"
        >
          {/* Optional navigation label */}
          <div
            className="
              mb-3
              px-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-slate-400

              dark:text-slate-600
            "
          >
            Main Menu
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon =
                Icons[item.icon] || Icons.Circle;

              const isActive = isItemActive(item.href);

              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  to={item.href}
                  onClick={onClose}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                  className={`
                    group
                    relative
                    flex items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    transition-all
                    duration-200

                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/30

                    ${
                      isActive
                        ? `
                          bg-primary/10
                          font-bold
                          text-primary

                          dark:bg-primary/15
                          dark:text-primary
                        `
                        : `
                          font-medium
                          text-slate-600

                          hover:bg-slate-50
                          hover:text-slate-900

                          dark:text-slate-400
                          dark:hover:bg-slate-900
                          dark:hover:text-white
                        `
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-7
                        w-1
                        -translate-y-1/2
                        rounded-r-full
                        bg-primary
                      "
                    />
                  )}

                  {/* Icon container */}
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

                      ${
                        isActive
                          ? `
                            bg-primary
                            text-white
                            shadow-md
                            shadow-primary/20
                          `
                          : `
                            bg-slate-100
                            text-slate-500

                            group-hover:bg-slate-200
                            group-hover:text-slate-800

                            dark:bg-slate-900
                            dark:text-slate-500
                            dark:group-hover:bg-slate-800
                            dark:group-hover:text-slate-200
                          `
                      }
                    `}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </span>

                  {/* Label */}
                  <span className="min-w-0 flex-1 truncate">
                    {item.label}
                  </span>

                  {/* Optional Badge */}
                  {item.badge !== undefined &&
                    item.badge !== null && (
                      <span
                        className={`
                          rounded-full
                          px-2
                          py-0.5
                          text-[10px]
                          font-bold

                          ${
                            isActive
                              ? `
                                bg-primary/10
                                text-primary
                                dark:bg-primary/20
                              `
                              : `
                                bg-slate-100
                                text-slate-500

                                dark:bg-slate-800
                                dark:text-slate-400
                              `
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}

                  {/* Arrow */}
                  <ChevronRight
                    size={15}
                    className={`
                      shrink-0
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? "translate-x-0 opacity-100 text-primary"
                          : `
                            -translate-x-1
                            opacity-0
                            text-slate-400

                            group-hover:translate-x-0
                            group-hover:opacity-100

                            dark:text-slate-500
                          `
                      }
                    `}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* =================================================
            SIDEBAR FOOTER
        ================================================== */}
        <div
          className="
            border-t
            border-slate-100
            p-4

            dark:border-slate-800
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-100
              bg-slate-50
              px-3
              py-3

              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            {/* Status */}
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-emerald-500/10
                text-emerald-500
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                  shadow-sm
                  shadow-emerald-500/50
                "
              />
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-xs
                  font-bold
                  text-slate-700

                  dark:text-slate-200
                "
              >
                System Online
              </p>

              <p
                className="
                  truncate
                  text-[10px]
                  text-slate-400

                  dark:text-slate-500
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

