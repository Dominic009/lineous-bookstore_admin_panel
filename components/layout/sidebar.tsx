"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, User, LogOut } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover";

const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return stored !== null ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  if (pathname === "/admin/auth/login") {
    return null;
  }

  return (
    <aside
      className={cn(
        "hidden border-r border-sidebar-border/60 bg-sidebar text-sidebar-foreground lg:flex lg:flex-col sticky top-2 h-[94dvh] rounded-r-2xl transition-all duration-300",
        isCollapsed ? "w-20" : "w-72",
      )}
    >
      <div className="border-b border-sidebar-border/60 p-5 flex items-center justify-between">
        {!isCollapsed && <Logo />}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "h-8 w-8 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isCollapsed && "mx-auto",
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
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
                  "group flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-ring/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed && "justify-center px-2",
                )}
              >
                <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                {!isCollapsed && item.title}
              </Link>
            );
          })}
        </div>
      </nav>

      <div
        className={cn(
          "flex items-center gap-3 py-3 px-3",
          isCollapsed && "justify-center px-3",
        )}
      >
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-3 focus:outline-none">
              <Avatar className="h-10 w-10 rounded-md cursor-pointer">
                <AvatarFallback className="rounded-md bg-primary text-primary font-semibold">
                  AU
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="text-left cursor-pointer">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@bookstore.com</p>
                </div>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={8}
            className="w-48 p-1.5 rounded-lg shadow-lg border-border/60"
          >
            <div className="flex flex-col gap-1">
              <Link
                href="/admin/profile"
                className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/admin/auth/login"
                className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="h-4 w-4 text-red-600" />
                Logout
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
}
