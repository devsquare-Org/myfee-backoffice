"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CustomFormLabel from "@/components/custom-form-label";
import { cn } from "@/lib/utils";

import { updateChallengeParams } from "@/app/(private)/challenge-list/_action/schema";
import { challengeUpdateAction } from "@/app/(private)/challenge-list/_action/action";
import { ChallengeDetailResponse } from "@/app/(private)/challenge-list/_action/type";

type Props = {
  data: ChallengeDetailResponse;
};

type FormValues = z.infer<typeof updateChallengeParams>;

export default function ChallengeDetailEdit({ data }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(data.thumbnailUrl);

  const form = useForm<FormValues>({
    resolver: zodResolver(updateChallengeParams),
    mode: "onChange",
    defaultValues: {
      id: data.challengeId.toString(),
      title: data.title,
      content: data.content,
      thumbnailUrl: data.thumbnailUrl,
      thumbnailFile: undefined as File | undefined,
      linkUrl: data.linkUrl ?? "",
      certificationGuideUrl: data.certificationGuideUrl ?? "",
      hashtags: data.hashtags.map((item) => ({ name: item.name })),
    },
  });

  const { execute, isExecuting } = useAction(challengeUpdateAction, {
    onSuccess: ({ data: resData }) => {
      toast.success(resData?.message ?? "챌린지를 수정했습니다.");
      const nextThumbnailUrl = resData?.thumbnailUrl ?? form.getValues("thumbnailUrl");
      form.reset({
        ...form.getValues(),
        thumbnailUrl: nextThumbnailUrl,
        thumbnailFile: undefined,
      });
      setPreviewUrl(nextThumbnailUrl);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message ?? "챌린지 수정에 실패했습니다.");
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "hashtags",
  });

  const [hashtagInput, setHashtagInput] = useState("");
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

  function handleThumbnailChange(file: File | undefined) {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    form.setValue("thumbnailFile", file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  function handleResetThumbnail() {
    setPreviewUrl(data.thumbnailUrl);
    form.setValue("thumbnailFile", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function onSubmit(values: FormValues) {
    execute(values);
  }

  const hashtagError = (() => {
    const err = form.formState.errors.hashtags;
    if (!err) return undefined;
    if ("message" in err) return err as unknown as FieldError;
    if (Array.isArray(err)) return err.find((item) => item?.name)?.name;
    return undefined;
  })();

  const hasNewFile = !!form.watch("thumbnailFile");

  return (
    <Card>
      <Label className="text-lg font-semibold mb-6">수정 가능한 정보</Label>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="thumbnailFile"
            render={({ field: { name, onBlur } }) => (
              <FormItem>
                <CustomFormLabel
                  error={
                    form.formState.errors.thumbnailFile ??
                    form.formState.errors.thumbnailUrl
                  }
                >
                  썸네일
                </CustomFormLabel>

                <div className="relative w-full max-w-md">
                  {previewUrl ? (
                    <>
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border">
                        <Image
                          src={previewUrl}
                          alt="썸네일 미리보기"
                          fill
                          className="object-cover"
                          unoptimized={previewUrl.startsWith("blob:")}
                        />
                      </div>
                      {hasNewFile && (
                        <button
                          type="button"
                          onClick={handleResetThumbnail}
                          className="absolute -top-2 -right-2 bg-secondary rounded-full p-1 shadow-lg transition-colors cursor-pointer"
                          aria-label="썸네일 되돌리기"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  ) : (
                    <FormLabel
                      className={cn(
                        "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer w-full aspect-[16/9] bg-background dark:bg-input/30",
                        form.formState.errors.thumbnailFile &&
                          "border-destructive"
                      )}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </FormLabel>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    썸네일 변경
                  </Button>
                  {hasNewFile && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleResetThumbnail}
                    >
                      되돌리기
                    </Button>
                  )}
                </div>

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
                <p className="text-xs text-muted-foreground mt-1">
                  16:9 비율, 10MB 이하 이미지 파일만 업로드 가능합니다.
                </p>
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel error={form.formState.errors.content}>
                  챌린지 설명
                </CustomFormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="챌린지 설명을 입력해주세요"
                    className="min-h-24"
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  최대 200자 이내로 입력해주세요.
                </p>
              </FormItem>
            )}
          />

          <FormItem>
            <CustomFormLabel error={hashtagError}>태그</CustomFormLabel>
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
                      onClick={() => {
                        remove(index);
                        form.trigger("hashtags");
                      }}
                      className="rounded-full hover:bg-primary-foreground/20 p-0.5 transition-colors cursor-pointer"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </FormItem>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={
                !form.formState.isDirty ||
                !form.formState.isValid ||
                isExecuting
              }
            >
              {isExecuting ? "수정 중..." : "수정하기"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
