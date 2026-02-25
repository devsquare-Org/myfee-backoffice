import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { rejectChallengeReviewAction } from "@/app/(private)/challenge-review/_action/action";
import { toast } from "sonner";
import { useFetchReviewList } from "@/app/(private)/challenge-review/_hooks/use-fetch-review-list";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import * as z from "zod";
import { rejectChallengeReviewParams } from "@/app/(private)/challenge-review/_action/schema";
import CustomFormLabel from "@/components/custom-form-label";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REJECT_REASON } from "../constant";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { CustomAlert } from "@/components/custom-alert";

type Props = {
  reviewId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsActionExecuting: (isActionExecuting: boolean) => void;
};

export function RejectDialog({
  reviewId,
  isOpen,
  setIsOpen,
  setIsActionExecuting,
}: Props) {
  const [isDirectInput, setIsDirectInput] = useState(false);
  const { fetchReviewList } = useFetchReviewList();
  const { execute, isExecuting } = useAction(rejectChallengeReviewAction, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      setIsOpen(false);
      fetchReviewList();
      form.reset();
      setIsActionExecuting(isExecuting);
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
      setIsActionExecuting(isExecuting);
      fetchReviewList();
      setIsOpen(false);
      form.reset();
    },
  });

  function handleReject() {
    setIsActionExecuting(isExecuting);
    execute({ id: reviewId, reason: form.getValues("reason") });
    setIsActionExecuting(isExecuting);
  }

  const form = useForm<z.infer<typeof rejectChallengeReviewParams>>({
    resolver: zodResolver(rejectChallengeReviewParams),
    mode: "onChange",
    defaultValues: {
      id: reviewId,
      reason: undefined,
    },
  });

  useEffect(() => {
    setIsDirectInput(false);
    form.reset();
  }, [isOpen]);

  useEffect(() => {
    setIsActionExecuting(isExecuting);
  }, [isExecuting]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>인증 반려</DialogTitle>
        </DialogHeader>
        <p className="text-sm font-medium">인증 반려 사유를 입력해주세요.</p>

        <div
          className="border bg-background px-3 py-1 h-9 rounded-md dark:bg-input/30 flex items-center justify-between gap-2 cursor-pointer"
          onClick={() => {
            const newValue = !isDirectInput;
            setIsDirectInput(newValue);
            form.resetField("reason");
          }}
        >
          <Label htmlFor="airplane-mode">직접 입력</Label>
          <Switch
            checked={isDirectInput}
            onCheckedChange={(checked) => {
              setIsDirectInput(checked === true);
              form.resetField("reason");
            }}
          />
        </div>

        <Form {...form}>
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel error={form.formState.errors.reason}>
                  사유
                </CustomFormLabel>
                <FormControl>
                  <div>
                    {isDirectInput ? (
                      <Input
                        {...field}
                        value={field.value || ""}
                        className="w-full"
                      />
                    ) : (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="사유 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {REJECT_REASON.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value}
                              className="cursor-pointer"
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </Form>

        <CustomAlert
          type="destructive"
          title="요청이 완료될 때까지 모달을 닫지마세요."
        />

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isExecuting}
            onClick={() => setIsOpen(false)}
          >
            취소
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleReject}
            disabled={isExecuting || !form.formState.isValid}
          >
            {isExecuting ? <Loader2 className="animate-spin" /> : "반려"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
