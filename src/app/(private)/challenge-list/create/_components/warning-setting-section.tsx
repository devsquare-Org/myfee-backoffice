"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import CustomFormLabel from "@/components/custom-form-label";
import { createChallengeParams } from "@/app/(private)/challenge-list/_action/schema";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type FormValues = z.infer<typeof createChallengeParams>;

type Props = {
  form: UseFormReturn<FormValues>;
};

export default function WarningSettingSection({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "warnings",
  });
  const [hiddenSubTitles, setHiddenSubTitles] = useState<Set<string>>(
    new Set()
  );

  function addParagraph() {
    append({
      paragraph: fields.length + 1,
      title: "",
      subTitle: "",
      contents: [{ order: 1, content: "" }],
    });
  }

  function removeParagraph(index: number) {
    remove(index);
    setTimeout(() => {
      const current = form.getValues("warnings");
      current?.forEach((_, i) => {
        form.setValue(`warnings.${i}.paragraph`, i + 1);
      });
    }, 0);
  }

  function hideSubTitle(fieldId: string, paragraphIndex: number) {
    form.setValue(`warnings.${paragraphIndex}.subTitle`, undefined);
    setHiddenSubTitles((prev) => new Set(prev).add(fieldId));
  }

  return (
    <div className="rounded-lg p-6 border">
      <Label className="text-lg font-semibold mb-6">주의사항 작성</Label>

      <div className="space-y-0 mb-6">
        {fields.map((field, paragraphIndex) => (
          <div key={field.id}>
            {paragraphIndex > 0 && <Separator className="my-8" />}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  단락 {paragraphIndex + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeParagraph(paragraphIndex)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  단락 {paragraphIndex + 1} 삭제
                  <X className="size-4" />
                </button>
              </div>

              <div className="rounded-lg border p-4 space-y-4">
                <FormField
                  control={form.control}
                  name={`warnings.${paragraphIndex}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <CustomFormLabel
                          className="w-28 shrink-0"
                          error={
                            form.formState.errors.warnings?.[paragraphIndex]
                              ?.title
                          }
                        >
                          타이틀
                        </CustomFormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="주의사항 제목을 입력해주세요."
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                {!hiddenSubTitles.has(field.id) && (
                  <FormField
                    control={form.control}
                    name={`warnings.${paragraphIndex}.subTitle`}
                    render={({ field: subTitleField }) => (
                      <FormItem>
                        <div className="flex items-center gap-4">
                          <CustomFormLabel
                            className="w-28 shrink-0"
                            error={
                              form.formState.errors.warnings?.[paragraphIndex]
                                ?.subTitle
                            }
                          >
                            서브타이틀
                          </CustomFormLabel>
                          <div className="flex items-center gap-2 w-full">
                            <FormControl>
                              <Input
                                {...subTitleField}
                                placeholder="서브타이틀을 입력해주세요."
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() =>
                                hideSubTitle(field.id, paragraphIndex)
                              }
                              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              <X className="size-4" />
                            </button>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                )}

                <WarningContents form={form} paragraphIndex={paragraphIndex} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={addParagraph}>
        <Plus className="size-4" />
        항목 추가
      </Button>
    </div>
  );
}

function WarningContents({
  form,
  paragraphIndex,
}: {
  form: UseFormReturn<FormValues>;
  paragraphIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `warnings.${paragraphIndex}.contents`,
  });

  function addContent() {
    append({ order: fields.length + 1, content: "" });
  }

  function removeContent(index: number) {
    remove(index);
    setTimeout(() => {
      const contents = form.getValues(
        `warnings.${paragraphIndex}.contents`
      );
      contents?.forEach((_, i) => {
        form.setValue(
          `warnings.${paragraphIndex}.contents.${i}.order`,
          i + 1
        );
      });
    }, 0);
  }

  return (
    <div className="space-y-3">
      {fields.map((field, contentIndex) => (
        <FormField
          key={field.id}
          control={form.control}
          name={`warnings.${paragraphIndex}.contents.${contentIndex}.content`}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <CustomFormLabel
                  error={
                    form.formState.errors.warnings?.[paragraphIndex]
                      ?.contents?.[contentIndex]?.content
                  }
                  className="w-28 shrink-0"
                >
                  내용 {contentIndex + 1}
                </CustomFormLabel>
                <div className="flex items-center gap-2 w-full">
                  <span className="text-muted-foreground">●</span>
                  <FormControl>
                    <Input {...field} placeholder="내용을 입력해주세요." />
                  </FormControl>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContent(contentIndex)}
                      className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            </FormItem>
          )}
        />
      ))}

      <Button
        type="button"
        variant="ghost"
        onClick={addContent}
        className="w-full border border-dashed"
      >
        내용 추가
      </Button>
    </div>
  );
}
