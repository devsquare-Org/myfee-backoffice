"use client";

import {
  SunIcon,
  MoonIcon,
  Send,
  Plus,
  CheckCircle,
  LogOut,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useTheme } from "next-themes";
import { logoutAction } from "@/app/signin/_action/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/lib/routes-config";
import { useGlobalCommand } from "@/hooks/use-global-command";

export function GlobalCommand() {
  const { setTheme, theme } = useTheme();
  const { open, setOpen } = useGlobalCommand();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false);
  }

  function goToRoute(path: string) {
    router.push(path);
    setOpen(false);
  }

  function logout() {
    logoutAction();
    setOpen(false);
  }

  const commandMenu = [
    {
      label: "대기중인 챌린지 인증 리스트",
      icon: CheckCircle,
      path: `${ROUTES.CHALLENGE_REVIEW_LIST}?status=REVIEWING`,
    },
    {
      label: "승인된 챌린지 인증 리스트",
      icon: CheckCircle,
      path: `${ROUTES.CHALLENGE_REVIEW_LIST}?status=APPROVED`,
    },
    {
      label: "반려된 챌린지 인증 리스트",
      icon: CheckCircle,
      path: `${ROUTES.CHALLENGE_REVIEW_LIST}?status=REJECTED`,
    },
    {
      label: "푸시 알림 발송",
      icon: Send,
      path: ROUTES.NOTIFICATION_SEND,
    },
    { label: "배너 추가", icon: Plus, path: ROUTES.BANNER_CREATE },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput className="text-xs" placeholder="검색어를 입력하세요." />
      <CommandList>
        <CommandEmpty>결과가 없습니다.</CommandEmpty>
        <CommandGroup heading="Quick Access">
          {commandMenu.map((value) => (
            <CommandItem
              key={value.path}
              onSelect={() => goToRoute(value.path)}
            >
              <value.icon />
              <span className="text-xs font-medium">{value.label}</span>
            </CommandItem>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={toggleTheme}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span className="text-xs font-medium">테마 변경</span>
            </CommandItem>
            <CommandItem onSelect={logout}>
              <LogOut />
              <span className="text-xs font-medium">로그아웃</span>
            </CommandItem>
          </CommandGroup>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
