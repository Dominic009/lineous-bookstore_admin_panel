"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  if (pathname === "/admin/auth/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border/60 bg-card/80 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
            className="h-10 rounded-xl border-border/60 bg-muted/30 pl-10 pr-4 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="flex items-center gap-3 pl-3">
          <div className="text-right">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@bookstore.com</p>
          </div>
          <Avatar className="h-10 w-10 rounded-xl">
            <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-semibold">
              AU
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
