"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  useCreateUser,
  useUpdateUser,
} from "@/lib/hooks/use-users";
import type { User, UpdateUserDto, UserRole, UserStatus } from "@/lib/types/book";
import { UserRole as UserRoleEnum, UserStatus as UserStatusEnum } from "@/constants/status";

type UserFormValues = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  role?: UserRole;
  avatar?: string;
  status?: UserStatus;
};

interface UserFormProps {
  user?: User | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const isEditing = !!user;

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const { register, handleSubmit, setValue, watch } = useForm<UserFormValues>({
    defaultValues: {
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      password: "",
      role: user?.role || "USER",
      avatar: user?.avatar || "",
      status: user?.status || "ACTIVE",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    if (isEditing && user) {
      const updateData: UpdateUserDto = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        password: data.password || undefined,
        avatar: data.avatar,
        role: data.role,
        status: data.status,
      };
      await updateMutation.mutateAsync({ id: user.id, data: updateData });
    } else {
      const createData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        password: data.password,
        role: data.role || "USER",
        avatar: data.avatar,
        status: data.status || "ACTIVE",
      };
      await createMutation.mutateAsync(createData);
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="user@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="+8801712345678"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="John"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="Doe"
          />
        </div>
      </div>

      {!isEditing && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Min. 6 characters"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select
            value={watch("role") || "USER"}
            onValueChange={(value) => setValue("role", value as UserRole)}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {UserRoleEnum.map((role: UserRole) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={watch("status") || "ACTIVE"}
            onValueChange={(value) => setValue("status", value as UserStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {UserStatusEnum.map((status: UserStatus) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar URL</Label>
        <Input
          id="avatar"
          {...register("avatar")}
          placeholder="https://example.com/avatar.png"
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {createMutation.isPending || updateMutation.isPending
            ? "Saving..."
            : isEditing
            ? "Update User"
            : "Create User"}
        </Button>
      </div>
    </form>
  );
}
