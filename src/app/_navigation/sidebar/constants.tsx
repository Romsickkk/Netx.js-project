import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";
import { NavItem } from "./types";
import { accountProfilePath, homePath, ticketsPath } from "@/paths";

export const navitems: NavItem[] = [
  {
    title: "All tickets",
    icon: <LucideLibrary />,
    href: homePath(),
  },
  {
    title: "My tickets",
    icon: <LucideBook />,
    href: ticketsPath(),
  },
  {
    separator: true,
    title: "Account",
    icon: <LucideCircleUser />,
    href: accountProfilePath(),
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
