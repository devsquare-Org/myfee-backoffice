import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 클라이언트에서 쿠키의 userId 가져오기
export function getUserIdClient(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const userIdCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("userId="),
  );

  if (userIdCookie) {
    return userIdCookie.split("=")[1];
  }

  return null;
}
