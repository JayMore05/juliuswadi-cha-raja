import {
  LayoutDashboard,
  Images,
  Bell,
  BookOpen,
  Users,
  Settings,
  Shirt,
  Globe2,
} from "lucide-react";

export const adminMenu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: Images,
  },
  {
    title: "Aarti Sangrah",
    href: "/admin/aarti",
    icon: BookOpen,
  },
  {
    title: "Updates",
    href: "/admin/updates",
    icon: Bell,
  },
  {
    title: "Committee",
    href: "/admin/committee",
    icon: Users,
  },
  {
    title: "T-Shirt Management",
    href: "/admin/tshirts",
    icon: Shirt,
  },
  {
    title: "Online T-Shirt Requests",
    href: "/admin/tshirts/online",
    icon: Globe2,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];