"use client";

import * as React from "react";
import {
  Users,
  Files,
  NotepadText,
  FileCog,
  Bot,
  User,
  LayoutDashboard,
  UserPen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/blocks/nav-main";
import { NavUser } from "@/components/blocks/nav-user";
import { NavProcess } from "./nav-process";

const data = {
  user: {
    name: "Aziz Mahfoudh",
    email: "mohamedazizmahfoudh@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: false,
      items: [],
    },
    {
      title: "Applications",
      url: "/dashboard/applications",
      icon: Files,
      isActive: false,
      items: [],
    },
    {
      title: "Candidates",
      url: "/dashboard/candidates",
      icon: Users,
      isActive: false,
      items: [],
    },
    {
      title: "Positions",
      url: "/dashboard/positions",
      icon: NotepadText,
      isActive: false,
      items: [],
    },
    {
      title: "Recruiters",
      url: "/dashboard/recruiters",
      icon: UserPen,
      isActive: false,
      items: [],
    },
  ],
  navProcess: [
    {
      title: "Interviews",
      url: "/dashboard/interviews",
      icon: User,
      isActive: false,
      items: [],
    },
    {
      title: "Configuration",
      url: "/dashboard/configuration",
      icon: FileCog,
      isActive: false,
      items: [],
    },
    {
      title: "Classification",
      url: "/dashboard/classification",
      icon: Bot,
      isActive: false,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProcess items={data.navProcess} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
