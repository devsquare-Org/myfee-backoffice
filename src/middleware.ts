import { tokenManager } from "@/lib/token-manager";
import { parseJwt } from "@/lib/utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/signin", "/shopby-test"];
const TOKEN_REFRESH_BUFFER_SECONDS = 5 * 60;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isSigninPage = pathname === "/signin";

  // 루트 경로 → 토큰 유무에 따라 리다이렉트
  if (pathname === "/") {
    const dest = accessToken ? "/dashboard" : "/signin";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // 토큰 없이 프라이빗 경로 접근 → 로그인으로
  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 토큰 있는 상태에서 로그인 페이지 접근 → 대시보드로
  if (accessToken && isSigninPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 액세스 토큰 만료 체크 및 갱신
  if (accessToken && refreshToken) {
    const decoded = parseJwt(accessToken);
    const expMs = decoded.exp * 1000;
    const now = Date.now();
    const expiresIn = expMs - now;
    const expiresInSeconds = Math.floor(expiresIn / 1000);
    const expiresInMinutes = Math.floor(expiresInSeconds / 60);

    console.log("=== Myfee Access Token Info ===");
    console.log("만료 시간:", new Date(expMs).toLocaleString("ko-KR"));
    console.log("현재 시간:", new Date(now).toLocaleString("ko-KR"));
    const bufferRemaining = expiresInSeconds - TOKEN_REFRESH_BUFFER_SECONDS;
    const bufferMinutes = Math.floor(Math.abs(bufferRemaining) / 60);
    const bufferSecs = Math.abs(bufferRemaining) % 60;
    console.log(
      "남은 시간 (토큰):",
      `${expiresInMinutes}분 ${expiresInSeconds % 60}초`,
    );
    console.log(
      "남은 시간 (갱신까지):",
      bufferRemaining > 0
        ? `${bufferMinutes}분 ${bufferSecs}초`
        : `${bufferMinutes}분 ${bufferSecs}초 초과`,
    );
    console.log("만료 여부:", expMs <= now ? "만료됨" : "유효함");
    console.log(
      "갱신 필요:",
      expiresInSeconds < TOKEN_REFRESH_BUFFER_SECONDS
        ? `예 (${TOKEN_REFRESH_BUFFER_SECONDS / 60}분 이내)`
        : "아니오",
    );

    if (expiresInSeconds < TOKEN_REFRESH_BUFFER_SECONDS) {
      const tokens = await tokenManager.refreshMyfeeAccessToken({
        refreshToken,
      });

      if (tokens) {
        const response = NextResponse.next();
        response.cookies.set("accessToken", tokens.accessToken, cookieOptions);
        response.cookies.set(
          "refreshToken",
          tokens.refreshToken,
          cookieOptions,
        );
        return response;
      }

      // 갱신 실패 → 쿠키 제거 후 로그인 페이지로
      const response = NextResponse.redirect(new URL("/signin", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
