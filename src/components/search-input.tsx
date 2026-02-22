"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, useRef } from "react";
import { useRevalidate } from "@/hooks/use-revalidate";
import { Input } from "@/components/ui/input";

export default function SearchInput({
  placeholder,
  className,
  searchParamsName,
}: {
  placeholder: string;
  className?: string;
  searchParamsName: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(
    decodeURIComponent(searchParams.get(searchParamsName)?.toString() || "")
  );
  const { revalidatePage } = useRevalidate();

  // 이전 검색값을 추적
  const prevSearchValue = useRef<string | null>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    setInputValue(
      decodeURIComponent(searchParams.get(searchParamsName)?.toString() || "")
    );
  }, [searchParams, searchParamsName, pathname]);

  // 정교한 캐시 무효화: 실제 검색어가 변경되었을 때만
  useEffect(() => {
    const currentSearchValue = searchParams.get(searchParamsName);

    // 초기 로드 시에는 캐시 무효화 안함
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      prevSearchValue.current = currentSearchValue;
      return;
    }

    // 실제로 검색어가 변경되었을 때만 캐시 무효화
    if (prevSearchValue.current !== currentSearchValue) {
      revalidatePage(pathname);
      prevSearchValue.current = currentSearchValue;
    }
  }, [pathname, revalidatePage, searchParams, searchParamsName]);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) params.set(searchParamsName, encodeURIComponent(term));
    else params.delete(searchParamsName);

    if (params.has("page")) {
      params.set("page", "0");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  async function handleClear() {
    setInputValue("");
    const params = new URLSearchParams(searchParams);
    params.delete(searchParamsName);

    if (params.has("page")) {
      params.set("page", "0");
    }

    // URL 변경만 (캐시 무효화는 useEffect에서)
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={cn("relative flex flex-1 flex-shrink-0", className)}>
      <Input
        className="relative pl-8 shadow-none"
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleSearch(e.target.value);
        }}
        value={inputValue}
      />
      <Search
        size={14}
        strokeWidth={2.5}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full"
          type="button"
        >
          <X size={14} strokeWidth={2.5} className="text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
