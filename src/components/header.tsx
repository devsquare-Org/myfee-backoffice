"use client";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ROUTES, ROUTE_LABELS, SEGMENT_LABELS } from "@/lib/routes-config";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function getRouteInfo(path: string, pathIndex: number, allPaths: string[]) {
  // 전체 경로 재구성 (현재 인덱스까지)
  const pathSegments = allPaths.slice(0, pathIndex + 1);
  const reconstructedPath = `/${pathSegments.join("/")}`;

  // 정확한 경로가 라벨에 있는지 확인
  if (ROUTE_LABELS[reconstructedPath]) {
    return {
      path: reconstructedPath,
      label: ROUTE_LABELS[reconstructedPath],
    };
  }

  // 세그먼트별 라벨 확인
  if (SEGMENT_LABELS[path]) {
    return {
      path: "#",
      label: SEGMENT_LABELS[path],
    };
  }

  // 동적 라우트 처리 (예: [bannerId], 30|jmpark 등)
  const decoded = decodeURIComponent(path);
  if (decoded.includes("|") || path.match(/^\[.*\]$/) || path.match(/^[0-9a-f-]+$/)) {
    return {
      path: "#",
      label: "상세",
    };
  }

  // 기본값
  return {
    path: "#",
    label: decoded,
  };
}

export function Header() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  
  // 대시보드 페이지인 경우 추가 경로 처리 생략
  const isDashboard = pathname === ROUTES.DASHBOARD;

  return (
    <header className="sticky w-full bg-secondary/20 top-0 backdrop-blur-lg flex items-center justify-between border-b py-2 px-8 z-50">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="cursor-pointer" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link
                href={ROUTES.DASHBOARD}
                className={
                  isDashboard
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {ROUTE_LABELS[ROUTES.DASHBOARD]}
              </Link>
              {!isDashboard && paths.length > 0 && <ChevronRight className="h-4 w-4 ml-1.5" />}
            </BreadcrumbItem>

            {!isDashboard && paths.map((path: string, index: number) => {
              const routeInfo = getRouteInfo(path, index, paths);

              return (
                <BreadcrumbItem key={`${path}-${index}`}>
                  <Link
                    href={routeInfo.path}
                    className={
                      index === paths.length - 1
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground transition-colors"
                    }
                  >
                    {routeInfo.label}
                  </Link>
                  {index < paths.length - 1 && (
                    <ChevronRight className="h-4 w-4 ml-1.5" />
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </header>
  );
}
