"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

interface DateRangePickerProps {
  placeholder?: string;
  className?: string;
}

export function DateRangePicker({
  placeholder = "날짜를 선택하세요",
  className,
}: DateRangePickerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(new Date());

  // URL 쿼리스트링에서 날짜 범위 초기화
  useEffect(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (startDate && endDate) {
      const newDateRange = {
        from: new Date(startDate),
        to: new Date(endDate),
      };
      setDateRange(newDateRange);
      setTempDateRange(newDateRange);
      setMonth(newDateRange.from);
    } else {
      // 쿼리스트링이 없으면 날짜 범위를 undefined로 설정 (전체 기간)
      setDateRange(undefined);
      setTempDateRange(undefined);
    }
  }, [searchParams]);

  // tempDateRange 초기화
  useEffect(() => {
    setTempDateRange(dateRange);
    if (dateRange?.from) {
      setMonth(dateRange.from);
    }
  }, [dateRange]);

  function formatDateRange(dateRange: DateRange | undefined) {
    if (!dateRange?.from) {
      return placeholder;
    }

    if (dateRange.to) {
      return `${format(dateRange.from, "yyyy.MM.dd", {
        locale: ko,
      })} - ${format(dateRange.to, "yyyy.MM.dd", { locale: ko })}`;
    }

    return format(dateRange.from, "yyyy.MM.dd", { locale: ko });
  }

  function handleApply() {
    setDateRange(tempDateRange);

    if (tempDateRange?.from && tempDateRange?.to) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("startDate", format(tempDateRange.from, "yyyy-MM-dd"));
      params.set("endDate", format(tempDateRange.to, "yyyy-MM-dd"));
      if (params.has("page")) params.set("page", "1");
      if (params.has("reviewItemId")) params.delete("reviewItemId");
      router.push(`?${params.toString()}`, { scroll: false });
    } else {
      // 날짜 범위가 모두 지워진 경우
      const params = new URLSearchParams(searchParams.toString());
      params.delete("startDate");
      params.delete("endDate");
      router.push(`?${params.toString()}`, { scroll: false });
    }

    setOpen(false);
  }

  function handleCancel() {
    setTempDateRange(dateRange);
    setOpen(false);
  }

  function handleReset() {
    setTempDateRange(undefined);
  }

  function handleClear() {
    setDateRange(undefined);
    const params = new URLSearchParams(searchParams.toString());
    params.set("startDate", format(new Date(), "yyyy-MM-dd"));
    params.set("endDate", format(new Date(), "yyyy-MM-dd"));
    if (params.has("page")) params.set("page", "1");
    if (params.has("reviewItemId")) params.delete("reviewItemId");
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) {
      // 팝오버가 닫힐 때 임시 값을 원래 값으로 리셋
      setTempDateRange(dateRange);
    }
    setOpen(newOpen);
  }

  return (
    <div className={cn(className)}>
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button
              id="date-range"
              variant="outline"
              className={cn(
                "w-[280px] justify-between text-left font-normal shadow-none",
                !dateRange?.from && "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange?.from
                  ? formatDateRange(dateRange)
                  : "날짜를 선택하세요"}
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex flex-col">
              <Calendar
                mode="range"
                month={month}
                onMonthChange={setMonth}
                selected={tempDateRange}
                onSelect={(dateRange) => {
                  setTempDateRange(dateRange);
                  // 시작일이 선택되면 해당 월로 이동
                  if (dateRange?.from && !tempDateRange?.from) {
                    setMonth(dateRange.from);
                  }
                }}
                numberOfMonths={2}
                locale={ko}
                captionLayout="dropdown"
                className="border-b"
                pagedNavigation
                fixedWeeks
                showOutsideDays={false}
                disabled={(date) => date > new Date()}
                toMonth={new Date()}
              />
              <div className="flex items-center justify-between p-3 border-t bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground">
                    {tempDateRange?.from && tempDateRange?.to
                      ? `${format(tempDateRange.from, "yyyy.MM.dd", {
                        locale: ko,
                      })} - ${format(tempDateRange.to, "yyyy.MM.dd", {
                        locale: ko,
                      })}`
                      : tempDateRange?.from
                        ? `${format(tempDateRange.from, "yyyy.MM.dd", {
                          locale: ko,
                        })} - 종료일 선택`
                        : "날짜를 선택하세요"}
                  </div>
                  {tempDateRange?.from && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="h-6 px-2 text-xs"
                      title="다시 선택"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      다시선택
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    className="h-8 px-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleApply}
                    disabled={!tempDateRange?.from || !tempDateRange?.to}
                    className="h-8 px-3"
                  >
                    적용
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {(dateRange?.from || dateRange?.to) && (
          <Button
            className="h-9 shadow-none"
            variant="outline"
            size="sm"
            onClick={handleClear}
          >
            최근 30일
          </Button>
        )}
      </div>
    </div>
  );
}
