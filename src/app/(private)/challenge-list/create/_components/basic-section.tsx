"use client";

import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FieldError, UseFormReturn, useFieldArray } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import CustomFormLabel from "@/components/custom-form-label";
import { createChallengeParams } from "@/app/(private)/challenge-list/_action/schema";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type Props = {
  form: UseFormReturn<z.infer<typeof createChallengeParams>>;
};

export default function BasicSection({ form }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleThumbnailChange(file: File | undefined) {
    if (!file) return;
    form.setValue("thumbnail", file, { shouldValidate: true });
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveThumbnail() {
    form.resetField("thumbnail");
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const [hashtagInput, setHashtagInput] = useState("");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "hashtags",
  });

  const MAX_HASHTAGS = 5;
  const isFull = fields.length >= MAX_HASHTAGS;

  function handleHashtagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing) return;
    if (e.key !== "Enter") return;
    e.preventDefault();

    const trimmed = hashtagInput.trim();
    if (!trimmed || isFull) return;

    const isDuplicate = fields.some((field) => field.name === trimmed);
    if (isDuplicate) {
      setHashtagInput("");
      return;
    }

    append({ name: trimmed });
    setHashtagInput("");
  }

  return (
    <Card>
      <Label className="text-lg font-semibold mb-6">기본 정보</Label>

      <div className="flex gap-8 items-start">
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field: { name, onBlur } }) => (
            <FormItem>
              <CustomFormLabel error={form.formState.errors.thumbnail}>
                썸네일
              </CustomFormLabel>

              {previewUrl ? (
                <div className="relative w-full min-w-sm">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border">
                    <Image
                      src={previewUrl}
                      alt="썸네일 미리보기"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveThumbnail}
                    className="absolute -top-2 -right-2 bg-secondary rounded-full p-1 shadow-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <FormLabel
                    className={cn(
                      "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer w-full min-w-sm aspect-[16/9] bg-background dark:bg-input/30",
                      form.formState.errors.thumbnail && "border-destructive"
                    )}
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </FormLabel>
                  <ul className="text-xs text-muted-foreground font-medium space-y-1 mt-2">
                    <li>16:9 비율의 이미지가 가장 알맞게 표기돼요.</li>
                    <li>
                      챌린지를 가장 잘 설명할 수 있는 이미지로 업로드 해주세요.
                    </li>
                    <li>
                      썸네일은 jpg/png 확장자, 최대 10MB 이하 이미지만 추가 할
                      수 있어요.
                    </li>
                  </ul>
                </>
              )}

              <FormControl>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => handleThumbnailChange(e.target.files?.[0])}
                  className="hidden"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="w-full space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel error={form.formState.errors.title}>
                  챌린지 제목
                </CustomFormLabel>

                <FormControl>
                  <Input {...field} placeholder="챌린지 제목을 입력해주세요" />
                </FormControl>

                <p className="text-xs text-muted-foreground">
                  최대 20자 이내로 입력해주세요.
                </p>
              </FormItem>
            )}
          />

          <div className="flex gap-4 item-center w-full">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <CustomFormLabel error={form.formState.errors.startDate}>
                    게시 시작일
                  </CustomFormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                            form.formState.errors.startDate &&
                              "!border !border-destructive"
                          )}
                        >
                          <CalendarIcon className="h-4 w-4" />
                          {field.value
                            ? format(
                                new Date(field.value),
                                "yyyy년 MM월 dd일",
                                {
                                  locale: ko,
                                }
                              )
                            : "시작일을 선택해주세요"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={ko}
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd") : ""
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">
                    최소 1일부터 10년까지 설정할 수 있어요.
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <CustomFormLabel error={form.formState.errors.endDate}>
                    게시 종료일
                  </CustomFormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                            form.formState.errors.endDate &&
                              "!border !border-destructive"
                          )}
                        >
                          <CalendarIcon className="h-4 w-4" />
                          {field.value
                            ? format(
                                new Date(field.value),
                                "yyyy년 MM월 dd일",
                                {
                                  locale: ko,
                                }
                              )
                            : "종료일을 선택해주세요"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={ko}
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd") : ""
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs opacity-0">-</p>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel error={form.formState.errors.description}>
                  챌린지 설명
                </CustomFormLabel>

                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="챌린지 설명을 입력해주세요"
                  />
                </FormControl>

                <p className="text-xs text-muted-foreground">
                  최대 200자 이내로 입력해주세요.
                </p>
              </FormItem>
            )}
          />

          <FormItem>
            <CustomFormLabel
              error={(() => {
                const err = form.formState.errors.hashtags;
                if (!err) return undefined;
                if ("message" in err) return err as unknown as FieldError;
                if (Array.isArray(err))
                  return err.find((item) => item?.name)?.name;
                return undefined;
              })()}
            >
              태그
            </CustomFormLabel>

            <Input
              aria-invalid={!!form.formState.errors.hashtags}
              className={cn(
                form.formState.errors.hashtags && "border-destructive"
              )}
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={handleHashtagKeyDown}
              placeholder={
                isFull
                  ? `최대 갯수인 ${MAX_HASHTAGS}개를 모두 입력했어요`
                  : "태그를 입력 후 Enter를 눌러주세요"
              }
              disabled={isFull}
            />

            <p className="text-xs text-muted-foreground">
              태그는 최대 20자 이내, 최대 {MAX_HASHTAGS}개의 태그를 추가할 수
              있어요.
            </p>

            {fields.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {fields.map((field, index) => (
                  <span
                    key={field.id}
                    className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
                  >
                    {field.name}
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded-full hover:bg-primary-foreground/20 p-0.5 transition-colors cursor-pointer"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </FormItem>
        </div>
      </div>
    </Card>
  );
}
