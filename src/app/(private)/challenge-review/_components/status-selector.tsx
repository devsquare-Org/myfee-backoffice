"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function StatusSelector({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedValue, setSelectedValue] = useState(
    searchParams.get("status")?.toString() || "pending"
  );

  useEffect(() => {
    setSelectedValue(searchParams.get("status")?.toString() || "pending");
  }, [searchParams, pathname]);

  function handleStatusChange(value: string) {
    setSelectedValue(value);
    const params = new URLSearchParams(searchParams);

    params.set("status", value);

    if (params.has("page")) params.set("page", "0");

    if (params.has("reviewItemId")) params.delete("reviewItemId");

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select value={selectedValue} onValueChange={handleStatusChange}>
      <SelectTrigger className={cn(className, "w-[80px]")}>
        <SelectValue placeholder="상태 선택" />
      </SelectTrigger>
      <SelectContent className="min-w-[80px]">
        <SelectItem className="cursor-pointer" value="pending">
          대기
        </SelectItem>
        <SelectItem className="cursor-pointer" value="approved">
          승인
        </SelectItem>
        <SelectItem className="cursor-pointer" value="rejected">
          반려
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
