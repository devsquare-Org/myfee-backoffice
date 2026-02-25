"use client";

import Image from "next/image";
import {
  Sidebar as SahdcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes-config";
import {
  Bell,
  CheckCircle,
  Home,
  List,
  Loader2,
  SquareMousePointer,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { logoutAction } from "@/app/signin/_action/action";
import { openGlobalCommand } from "@/hooks/use-global-command";

export const menu = [
  {
    label: "대시보드",
    icon: Home,
    path: ROUTES.DASHBOARD,
  },
  {
    label: "챌린지 관리",
    icon: List,
    path: ROUTES.CHALLENGE_LIST,
  },
  {
    label: "챌린지 인증",
    icon: CheckCircle,
    path: `${ROUTES.CHALLENGE_REVIEW_LIST}?status=REVIEWING`,
  },
  {
    label: "유저 관리",
    icon: User,
    path: ROUTES.USERS,
  },
  {
    label: "푸시 알림",
    icon: Bell,
    path: ROUTES.NOTIFICATION,
  },
  {
    label: "배너 관리",
    icon: SquareMousePointer,
    path: ROUTES.BANNER,
  },
];

export function Sidebar() {
  const { execute, isExecuting } = useAction(logoutAction);
  const pathname = usePathname();

  return (
    <SahdcnSidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="MyFee Logo"
                width={20}
                height={20}
              />
              <p className="text-sm font-medium">MyFee Backoffice</p>
            </div>
          </SidebarGroupLabel>
          <Button
            variant="outline"
            onClick={openGlobalCommand}
            className="w-full mt-1 mb-3"
          >
            빠른 접근
            <span className="ml-auto text-muted-foreground">⌘J</span>
          </Button>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((value) => (
                <SidebarMenuItem key={value.path}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-colors rounded-md hover:bg-border hover:text-primary text-sm",
                      (value.path.includes("?")
                        ? pathname.includes(value.path.split("?")[0])
                        : pathname.includes(value.path)) &&
                        "bg-border text-primary"
                    )}
                  >
                    <Link href={value.path}>
                      <value.icon className="w-4 h-4 mr-2" />
                      <span className="font-medium">{value.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="space-y-2">
        <Button
          variant="outline"
          onClick={() => execute()}
          disabled={isExecuting}
        >
          {isExecuting ? <Loader2 className="animate-spin" /> : "로그아웃"}
        </Button>
      </SidebarFooter>
    </SahdcnSidebar>
  );
}
