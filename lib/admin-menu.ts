import {
  LayoutDashboard,
  Images,
  Bell,
  HandCoins,
  Users,
  Settings,
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
    title: "Updates",
    href: "/admin/updates",
    icon: Bell,
  },
  {
    title: "Donations",
    href: "/admin/donation",
    icon: HandCoins,
  },
  {
    title: "Committee",
    href: "/admin/committee",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];