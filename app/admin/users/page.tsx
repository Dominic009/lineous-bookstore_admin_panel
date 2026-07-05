"use client";

import { useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SearchableDropdown } from "@/components/ui/searchable-dropdown";
import { UsersTable } from "@/components/users/users-table";
import { UserDialog } from "@/components/users/user-dialog";
import type { User, UserRole, UserStatus } from "@/lib/types/book";
import { UserRole as UserRoleEnum, UserStatus as UserStatusEnum } from "@/constants/status";

export default function UsersPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="mt-2 text-muted-foreground">
            Manage user accounts and permissions.
          </p>
        </div>

        <UserDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          trigger={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          }
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="h-10 rounded-md border-border/60 bg-muted/30 pl-10 pr-4"
          />
        </div>

        <SearchableDropdown
          items={[{ id: "all", label: "All Roles" }, ...UserRoleEnum.map((role) => ({ id: role, label: role }))]}
          value={roleFilter}
          onChange={(item) => {
            if (item) setRoleFilter(item.id as string);
          }}
          placeholder="Filter by role"
          buttonClassName="w-[150px] h-10"
        />

        <SearchableDropdown
          items={[{ id: "all", label: "All Statuses" }, ...UserStatusEnum.map((status) => ({ id: status, label: status.charAt(0) + status.slice(1).toLowerCase() }))]}
          value={statusFilter}
          onChange={(item) => {
            if (item) setStatusFilter(item.id as string);
          }}
          placeholder="Filter by status"
          buttonClassName="w-[150px] h-10"
        />

        <Button variant="outline" className="gap-2 rounded-md">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <UsersTable onEdit={handleEdit} onDelete={handleDelete} />

      {/* Edit Dialog */}
      <UserDialog
        user={selectedUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &#34;{selectedUser?.email}&#34;? This action will soft delete the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
