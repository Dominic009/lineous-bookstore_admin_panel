"use client";

import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { User, UserRole, UserStatus } from "@/lib/types/book";

interface UserActionsProps {
  user: User;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const roleColors: Record<UserRole, string> = {
  ADMIN: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  USER: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
};

const statusColors: Record<UserStatus, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  INACTIVE: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-400",
  SUSPENDED: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
};

export function UserActions({ onView, onEdit, onDelete }: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-md">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="rounded-md">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem className="text-destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserRoleBadge({ role }: { role: UserRole }) {
  return (
    <Badge className={roleColors[role]}>{role}</Badge>
  );
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  return (
    <Badge className={statusColors[status]}>{status}</Badge>
  );
}
