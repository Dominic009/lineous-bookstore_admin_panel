"use client";

import { useUsers } from "@/lib/hooks/use-users";
import type { User } from "@/lib/types/book";
import { UserActions, UserRoleBadge, UserStatusBadge } from "./user.actions";

interface UsersTableProps {
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function UsersTable({ onView, onEdit, onDelete }: UsersTableProps) {
  const { data: users, isLoading, error } = useUsers();

  const handleDelete = (user: User) => {
    onDelete?.(user);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load users";
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-destructive">{errorMessage}</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
      <table className="w-full">
       <thead className="bg-gray-100 font-bold">
          <tr className="border-b border-border/60 bg-muted/30 text-left text-sm">
             <th className="px-6 py-4 font-semibold text-gray-500">
              User
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500">
              Email
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500">
              Role
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500">
              Status
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500">
              Provider
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500">
              Created
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500"></th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/20"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.firstName || user.email}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium">
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user.email}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {user.phone || "No phone"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {user.email}
              </td>

              <td className="px-6 py-4">
                <UserRoleBadge role={user.role} />
              </td>

              <td className="px-6 py-4">
                <UserStatusBadge status={user.status} />
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {user.provider}
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <UserActions
                  user={user}
                  onView={() => onView?.(user)}
                  onEdit={() => onEdit?.(user)}
                  onDelete={() => handleDelete(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
