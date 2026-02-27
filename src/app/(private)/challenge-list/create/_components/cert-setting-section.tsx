"use client";

import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import CustomFormLabel from "@/components/custom-form-label";
import { createChallengeParams } from "@/app/(private)/challenge-list/_action/schema";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type Props = {
  form: UseFormReturn<z.infer<typeof createChallengeParams>>;
};

export default function CertSettingSection({ form }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(file: File | undefined) {
    if (!file) return;
    form.setValue("certImage", file, { shouldValidate: true });
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    form.resetField("certImage");
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <Card>
      <Label className="text-lg font-semibold mb-6">인증 방법 작성</Label>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="certImage"
          render={({ field: { name, onBlur } }) => (
            <FormItem>
              <CustomFormLabel error={form.formState.errors.certImage}>
                인증 방법 이미지
              </CustomFormLabel>

              {previewUrl ? (
                <div className="relative w-full">
                  <div className="relative w-full overflow-hidden rounded-md border">
                    <Image
                      src={previewUrl}
                      alt="인증 방법 이미지 미리보기"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-secondary rounded-full p-1 shadow-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <FormLabel
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer w-full aspect-[4/3] bg-background dark:bg-input/30",
                    form.formState.errors.certImage && "border-destructive"
                  )}
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground font-medium">
                      이미지를 선택해주세요
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG (최대 10MB)
                    </p>
                  </div>
                </FormLabel>
              )}

              <FormControl>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                  className="hidden"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}
