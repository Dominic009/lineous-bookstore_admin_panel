"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-card/85 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input placeholder="Search..." className="pl-10" />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-xl border p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>

        <Avatar>
          <AvatarFallback>DG</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
