"use client";

import { ROUTES } from "@/constants/routes";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@insta-puppeteer/ui/components/sidebar";
import {
  ClockFadingIcon,
  CogIcon,
  ImagesIcon,
  Instagram,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Route = {
  icon: LucideIcon;
  title: string;
  url: string;
};

type GroupedRoute = {
  key: string;
  label?: string;
  items: Route[];
};

const groupRoutes: GroupedRoute[] = [
  {
    key: "dashboard",
    items: [{ icon: LayoutDashboard, title: "Dashboard", url: ROUTES.home }],
  },
  {
    key: "mainMenu",
    label: "Main Menu",
    items: [
      {
        icon: CogIcon,
        title: "Automate",
        url: ROUTES.automate,
      },
      {
        icon: ClockFadingIcon,
        title: "Sessions",
        url: ROUTES.sessions,
      },
      {
        icon: ImagesIcon,
        title: "Posts",
        url: ROUTES.posts,
      },
    ],
  },
];

const isActive = (routeUrl: string, currentPath: string) => {
  if (routeUrl === "/") {
    return currentPath === "/";
  }

  return currentPath === routeUrl || currentPath.startsWith(`${routeUrl}/`);
};

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <ShadcnSidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href={ROUTES.home}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground bg-gradient-to-r from-indigo-500 to-indigo-600">
                  <Instagram className="stroke-white" size={16} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">InstaPuppeteer</span>
                  <span className="">v2.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {groupRoutes.map(({ key, label, items }) => {
          return (
            <SidebarGroup key={key}>
              {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
              <SidebarMenu className="gap-2">
                {items.map(({ icon, title, url }) => {
                  const Icon = icon;

                  return (
                    <SidebarMenuItem key={title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(url, pathname)}
                        tooltip={title}
                      >
                        <Link href={url}>
                          <Icon />
                          {title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </ShadcnSidebar>
  );
};
