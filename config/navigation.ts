import {
  BookOpen,
  LayoutDashboard,
  Users,
  ShoppingCart,
  GraduationCap,
  Library,
  FolderTree,
  Image,
  Star,
  Settings,
  ScrollText,
  Building2,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Books",
    href: "/books",
    icon: BookOpen,
  },

  {
    title: "Users",
    href: "/users",
    icon: Users,
  },

  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },

  {
    title: "Publications",
    href: "/publications",
    icon: Building2,
  },

  {
    title: "Subjects",
    href: "/subjects",
    icon: Library,
  },

  {
    title: "Categories",
    href: "/categories",
    icon: FolderTree,
  },

  {
    title: "Teachers",
    href: "/teachers",
    icon: GraduationCap,
  },

  {
    title: "Banners",
    href: "/banners",
    icon: Image,
  },

  {
    title: "Reviews",
    href: "/reviews",
    icon: Star,
  },

  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },

  {
    title: "Audit Logs",
    href: "/audit-logs",
    icon: ScrollText,
  },
] as const;
