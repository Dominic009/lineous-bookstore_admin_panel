"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
      <div className="border-b border-sidebar-border p-6">
        <Logo />
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",

                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-ring/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />

                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
