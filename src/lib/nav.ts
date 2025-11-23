import {
  FlowerIcon,
  LayoutDashboardIcon,
  LogsIcon,
  UsersIcon,
} from "lucide-react";
import AdminDashboard from "@/pages/admin-dashboard.tsx";
import Users from "@/pages/users.tsx";
import Sessions from "@/pages/sessions.tsx";
import Kids from "@/pages/kids.tsx";

export const navItems = [
  {
    title: "Oyun Alanı",
    pathname: "/",
    icon: LayoutDashboardIcon,
    component: AdminDashboard,
  },
  {
    title: "Veliler",
    pathname: "/veliler",
    icon: UsersIcon,
    component: Users,
  },
  {
    title: "Çocuklar",
    pathname: "/cocuklar",
    icon: FlowerIcon,
    component: Kids,
  },
  {
    title: "Giriş Çıkışlar",
    pathname: "/giris-cikislar",
    icon: LogsIcon,
    component: Sessions,
  },
];

export const pathnameSegments = () => window.location.pathname.split("/");

export const route = () => `/${pathnameSegments().at(1)}`;

export const routeId = () => pathnameSegments().at(2);
