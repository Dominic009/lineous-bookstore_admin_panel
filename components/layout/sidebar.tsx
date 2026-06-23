"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function Sidebar() {
  const pathname = usePathname();

  if (pathname === "/admin/auth/login") {
    return null;
  }

  return (
    <aside className="hidden w-72 border-r border-sidebar-border/60 bg-sidebar text-sidebar-foreground lg:flex lg:flex-col sticky top-0 h-dvh">
      <div className="border-b border-sidebar-border/60 p-5">
        <Logo />
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1.5">
          {navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-ring/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-sidebar-border/60 p-4">
        <div className="rounded-xl bg-sidebar-accent/50 p-4">
          <p className="text-xs text-sidebar-foreground/60">
            Bookstore CMS v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}
