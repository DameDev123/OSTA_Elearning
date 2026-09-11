import {
  Outlet,
  Link,
} from "react-router-dom";

import {
  Menu,
  Bell,
} from "lucide-react";

import Sidebar from "@components/layout/Sidebar";
import LanguageSwitcher from "@components/ui/LanguageSwitcher";
import ThemeToggle from "@components/ui/ThemeToggle";

import {
  INSTRUCTOR_SIDEBAR_NAV,
} from "@constants/navigation";

import {
  useSidebarDrawer,
} from "@hooks/useSidebarDrawer";

import {
  useNotifications,
} from "@context/NotificationContext";

import {
  useAuth,
} from "@context/AuthContext";

export default function InstructorLayout() {
  const drawer =
    useSidebarDrawer();

  const {
    unreadCount,
  } = useNotifications();

  const {
    user,
  } = useAuth();

  function getInitial() {
    if (!user) {
      return "U";
    }

    if (user.first_name) {
      return user.first_name[0].toUpperCase();
    }

    if (user.name) {
      return user.name[0].toUpperCase();
    }

    if (user.email) {
      return user.email[0].toUpperCase();
    }

    return "U";
  }

  return (
    <div className="min-h-screen bg-surface font-sans text-ink dark:bg-structure">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        navItems={
          INSTRUCTOR_SIDEBAR_NAV
        }
        isOpen={
          drawer.isOpen
        }
        onClose={
          drawer.close
        }
        subtitle="Instructor workspace"
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface-elevated/95 px-4 shadow-subtle backdrop-blur dark:border-structure-border dark:bg-structure-surface/95 lg:pl-64">

        {/* MOBILE MENU */}

        <button
          type="button"
          className="rounded-lg p-2 text-ink-soft transition hover:bg-surface-hover hover:text-ink dark:hover:bg-structure-border lg:hidden"
          aria-label="Open navigation"
          onClick={
            drawer.open
          }
        >
          <Menu size={20} />
        </button>

        {/* DESKTOP SPACER */}

        <div className="hidden lg:block" />

        {/* =================================================
            HEADER ACTIONS
        ================================================= */}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />

          {/* NOTIFICATIONS */}

          <Link
            to="/notifications"
            className="relative rounded-full p-2 text-ink-soft transition hover:bg-surface-hover hover:text-ink dark:hover:bg-structure-border"
            aria-label="Notifications"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-danger-foreground ring-2 ring-surface-elevated dark:ring-structure-surface">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* PROFILE */}

          <Link
            to="/profile"
            aria-label="Your profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-black uppercase text-primary transition hover:ring-2 hover:ring-primary/30"
          >
            {getInitial()}
          </Link>
        </div>
      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="pb-8 lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}