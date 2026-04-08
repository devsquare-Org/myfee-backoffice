"use client";

import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import CustomFormLabel from "@/components/custom-form-label";
import { createChallengeParams } from "@/app/(private)/challenge-list/_action/schema";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

type Props = {
  form: UseFormReturn<z.infer<typeof createChallengeParams>>;
};

const LIMITS_PER_DAY_OPTIONS = [1, 2, 3, 4, 5] as const;

export default function ConditionSettingSection({ form }: Props) {
  const type = form.watch("type");
  const isMidPoint = form.watch("isMidPoint");

  useEffect(() => {
    if (type === "TERM") {
      form.setValue("weeklyChallengePeriod", 0);
      form.setValue("weeklyNumOfDays", 0);
    } else if (type === "WEEKLY") {
      form.setValue("termChallengePeriod", 0);
      form.setValue("termNumOfCert", 0);
      form.setValue("weeklyChallengePeriod", 0);
      form.setValue("weeklyNumOfDays", 0);
    }
  }, [type, form]);

  useEffect(() => {
    if (isMidPoint) {
      form.setValue("midPoint", 0);
      if (type === "TERM") {
        form.setValue("termsOfPayment", 0);
        form.setValue("termsNumOfSuccess", 0);
        form.setValue("weeklyNumOfCompleted", undefined);
      } else if (type === "WEEKLY") {
        form.setValue("termsOfPayment", undefined);
        form.setValue("termsNumOfSuccess", undefined);
        form.setValue("weeklyNumOfCompleted", 0);
      }
    } else {
      form.setValue("termsOfPayment", undefined);
      form.setValue("termsNumOfSuccess", undefined);
      form.setValue("midPoint", undefined);
      form.setValue("weeklyNumOfCompleted", undefined);
    }
  }, [isMidPoint, form, type]);

  return (
    <Card className="p-6">
      <Label className="text-lg font-semibold mb-6">챌린지 정보 설정</Label>

      <div className="flex gap-6">
        <div className="space-y-6 w-1/2 border-r pr-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel error={form.formState.errors.type}>
                  챌린지 타입
                </CustomFormLabel>
                <FormControl>
                  <div className="inline-flex rounded-md border p-0.75 bg-background">
                    <button
                      type="button"
                      onClick={() => field.onChange("TERM")}
                      className={cn(
                        "px-4 py-1 text-sm font-medium rounded transition-colors cursor-pointer w-full",
                        field.value === "TERM"
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      기간타입
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("WEEKLY")}
                      className={cn(
                        "px-4 py-1 text-sm font-medium rounded transition-colors cursor-pointer w-full",
                        field.value === "WEEKLY"
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      주간타입
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {type === "TERM" && (
            <>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="termChallengePeriod"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem className="flex-1">
                      <CustomFormLabel
                        error={form.formState.errors.termChallengePeriod}
                      >
                        챌린지 기간
                      </CustomFormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            ref={ref}
                            type="number"
                            min={0}
                            placeholder="숫자만 입력 가능해요"
                            value={value === 0 ? "" : (value ?? "")}
                            onBlur={onBlur}
                            onChange={(e) =>
                              onChange(
                                e.target.value === ""
                                  ? 0
                                  : Number(e.target.value)
                              )
                            }
                            aria-invalid={
                              !!form.formState.errors.termChallengePeriod
                            }
                          />
                          <span className="text-sm text-muted-foreground shrink-0">
                            일
                          </span>
                        </div>
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        최대 90일까지 입력 가능해요.
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="termNumOfCert"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem className="flex-1">
                      <CustomFormLabel
                        error={form.formState.errors.termNumOfCert}
                      >
                        인증 횟수
                      </CustomFormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            ref={ref}
                            type="number"
                            min={0}
                            placeholder="숫자만 입력 가능해요"
                            value={value === 0 ? "" : (value ?? "")}
                            onBlur={onBlur}
                            onChange={(e) =>
                              onChange(
                                e.target.value === ""
                                  ? 0
                                  : Number(e.target.value)
                              )
                            }
                            aria-invalid={!!form.formState.errors.termNumOfCert}
                          />
                          <span className="text-sm text-muted-foreground shrink-0">
                            회
                          </span>
                        </div>
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        기간 동안 필요한 인증 횟수를 입력해주세요.
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="limitsPerDay"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel error={form.formState.errors.limitsPerDay}>
                      하루 인증 횟수 제한
                    </CustomFormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        {LIMITS_PER_DAY_OPTIONS.map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => field.onChange(num)}
                            className={cn(
                              "px-4 py-2 text-sm font-medium rounded-md border transition-colors cursor-pointer",
                              field.value === num
                                ? "bg-muted text-foreground border-input"
                                : "bg-background text-muted-foreground border-input hover:text-foreground"
                            )}
                          >
                            {num}회
                          </button>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}

          {type === "WEEKLY" && (
            <>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="weeklyChallengePeriod"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem className="flex-1">
                      <CustomFormLabel
                        error={form.formState.errors.weeklyChallengePeriod}
                      >
                        챌린지 기간
                      </CustomFormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            ref={ref}
                            type="number"
                            min={0}
                            placeholder="숫자만 입력 가능해요"
                            value={value === 0 ? "" : (value ?? "")}
                            onBlur={onBlur}
                            onChange={(e) =>
                              onChange(
                                e.target.value === ""
                                  ? 0
                                  : Number(e.target.value)
                              )
                            }
                            aria-invalid={
                              !!form.formState.errors.weeklyChallengePeriod
                            }
                          />
                          <span className="text-sm text-muted-foreground shrink-0">
                            주
                          </span>
                        </div>
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        최소 2주부터 최대 12주까지 입력 가능해요.
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weeklyNumOfDays"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem className="flex-1">
                      <CustomFormLabel
                        error={form.formState.errors.weeklyNumOfDays}
                      >
                        1주 인증 일수
                      </CustomFormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            ref={ref}
                            type="number"
                            min={0}
                            placeholder="숫자만 입력 가능해요"
                            value={value === 0 ? "" : (value ?? "")}
                            onBlur={onBlur}
                            onChange={(e) =>
                              onChange(
                                e.target.value === ""
                                  ? 0
                                  : Number(e.target.value)
                              )
                            }
                            aria-invalid={
                              !!form.formState.errors.weeklyNumOfDays
                            }
                          />
                          <span className="text-sm text-muted-foreground shrink-0">
                            일
                          </span>
                        </div>
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        최소 1일부터 최대 7일까지 입력 가능해요.
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dailyNumOfCert"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel
                      error={form.formState.errors.dailyNumOfCert}
                    >
                      하루 필요 인증 횟수
                    </CustomFormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        {LIMITS_PER_DAY_OPTIONS.map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => field.onChange(num)}
                            className={cn(
                              "px-4 py-2 text-sm font-medium rounded-md border transition-colors cursor-pointer",
                              field.value === num
                                ? "bg-muted text-foreground border-input"
                                : "bg-background text-muted-foreground border-input hover:text-foreground"
                            )}
                          >
                            {num}회
                          </button>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field: { value, onChange, onBlur, ref } }) => (
              <FormItem>
                <CustomFormLabel error={form.formState.errors.maxParticipants}>
                  최대 참여자 수 (옵션)
                </CustomFormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      ref={ref}
                      type="number"
                      placeholder="숫자만 입력 가능해요"
                      value={value ?? ""}
                      onBlur={onBlur}
                      onChange={(e) =>
                        onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      aria-invalid={!!form.formState.errors.maxParticipants}
                    />
                    <span className="text-sm text-muted-foreground shrink-0">
                      명
                    </span>
                  </div>
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  입력 시 선착순 챌린지로 변경돼요.(최대 1000명)
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rejoinable"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <div>
                    <CustomFormLabel>재참여 여부</CustomFormLabel>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {field.value ? (
                        <>
                          챌린지 완주/실패 후에도{" "}
                          <span className="text-green-600">재참여 가능</span>
                        </>
                      ) : (
                        <>
                          챌린지 완주/실패 후에는{" "}
                          <span className="text-destructive">
                            재참여 불가능
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 w-1/2">
          <FormField
            control={form.control}
            name="participationPoint"
            render={({ field: { value, onChange, onBlur, ref } }) => (
              <FormItem>
                <CustomFormLabel
                  error={form.formState.errors.participationPoint}
                >
                  참여 지급 포인트
                </CustomFormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      ref={ref}
                      type="number"
                      min={0}
                      placeholder="숫자만 입력 가능해요."
                      value={value ?? ""}
                      onBlur={onBlur}
                      onChange={(e) =>
                        onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                      aria-invalid={!!form.formState.errors.participationPoint}
                    />
                    <span className="text-sm text-muted-foreground shrink-0">
                      P
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="completionPoint"
            render={({ field: { value, onChange, onBlur, ref } }) => (
              <FormItem>
                <CustomFormLabel error={form.formState.errors.completionPoint}>
                  완주 지급 포인트
                </CustomFormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      ref={ref}
                      type="number"
                      min={0}
                      placeholder="숫자만 입력 가능해요."
                      value={value === 0 ? "" : (value ?? "")}
                      onBlur={onBlur}
                      onChange={(e) =>
                        onChange(
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      aria-invalid={!!form.formState.errors.completionPoint}
                    />
                    <span className="text-sm text-muted-foreground shrink-0">
                      P
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isMidPoint"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <div>
                    <CustomFormLabel>중간 챌린지 포인트 설정</CustomFormLabel>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      참여 후 조건에 따라 중간 포인트를 자동 지급할 수 있어요.
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>

                {field.value && (
                  <div className="mt-4 rounded-lg border p-4 space-y-4">
                    {type === "TERM" && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="termsOfPayment"
                          render={({
                            field: { value, onChange, onBlur, ref },
                          }) => (
                            <FormItem>
                              <CustomFormLabel
                                error={form.formState.errors.termsOfPayment}
                              >
                                며칠 동안
                              </CustomFormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    ref={ref}
                                    type="number"
                                    min={0}
                                    placeholder="숫자만 입력 가능해요"
                                    value={value === 0 ? "" : (value ?? "")}
                                    onBlur={onBlur}
                                    onChange={(e) =>
                                      onChange(
                                        e.target.value === ""
                                          ? 0
                                          : Number(e.target.value)
                                      )
                                    }
                                    aria-invalid={
                                      !!form.formState.errors.termsOfPayment
                                    }
                                  />
                                  <span className="text-sm text-muted-foreground shrink-0">
                                    일
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="termsNumOfSuccess"
                          render={({
                            field: { value, onChange, onBlur, ref },
                          }) => (
                            <FormItem>
                              <CustomFormLabel
                                error={form.formState.errors.termsNumOfSuccess}
                              >
                                인증 성공 횟수
                              </CustomFormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    ref={ref}
                                    type="number"
                                    min={0}
                                    placeholder="숫자만 입력 가능해요"
                                    value={value === 0 ? "" : (value ?? "")}
                                    onBlur={onBlur}
                                    onChange={(e) =>
                                      onChange(
                                        e.target.value === ""
                                          ? 0
                                          : Number(e.target.value)
                                      )
                                    }
                                    aria-invalid={
                                      !!form.formState.errors.termsNumOfSuccess
                                    }
                                  />
                                  <span className="text-sm text-muted-foreground shrink-0">
                                    회
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {type === "WEEKLY" && (
                      <FormField
                        control={form.control}
                        name="weeklyNumOfCompleted"
                        render={({
                          field: { value, onChange, onBlur, ref },
                        }) => (
                          <FormItem>
                            <CustomFormLabel
                              error={form.formState.errors.weeklyNumOfCompleted}
                            >
                              몇 주 동안 성공 시
                            </CustomFormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input
                                  ref={ref}
                                  type="number"
                                  min={0}
                                  placeholder="숫자만 입력 가능해요"
                                  value={value === 0 ? "" : (value ?? "")}
                                  onBlur={onBlur}
                                  onChange={(e) =>
                                    onChange(
                                      e.target.value === ""
                                        ? 0
                                        : Number(e.target.value)
                                    )
                                  }
                                  aria-invalid={
                                    !!form.formState.errors.weeklyNumOfCompleted
                                  }
                                />
                                <span className="text-sm text-muted-foreground shrink-0">
                                  주
                                </span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="midPoint"
                      render={({ field: { value, onChange, onBlur, ref } }) => (
                        <FormItem>
                          <CustomFormLabel
                            error={form.formState.errors.midPoint}
                          >
                            중간 지급 포인트
                          </CustomFormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input
                                ref={ref}
                                type="number"
                                min={0}
                                placeholder="숫자만 입력 가능해요"
                                value={value === 0 ? "" : (value ?? "")}
                                onBlur={onBlur}
                                onChange={(e) =>
                                  onChange(
                                    e.target.value === ""
                                      ? 0
                                      : Number(e.target.value)
                                  )
                                }
                                aria-invalid={!!form.formState.errors.midPoint}
                              />
                              <span className="text-sm text-muted-foreground shrink-0">
                                P
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </FormItem>
            )}
          />
        </div>
      </div>
    </Card>
  );
}
