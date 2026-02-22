import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomAlert } from "@/components/custom-alert";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

type PointDialogProps = {
  point: number;
  reason: string;
  type: "add" | "subtract";
  loading: boolean;
  disabled: boolean;
  onValidate: () => Promise<boolean>;
  setIsSubmit: (isSubmit: boolean) => void;
};
export default function PointDialog({
  point,
  reason,
  type,
  loading,
  disabled,
  onValidate,
  setIsSubmit,
}: PointDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [typeText, setTypeText] = useState(
    type === "add" ? "지급하기" : "차감하기"
  );

  function handleSend() {
    setIsSubmit(true);
    setIsOpen(false);
  }

  function handleCancel() {
    setIsSubmit(false);
    setIsOpen(false);
  }

  useEffect(() => {
    setTypeText(type === "add" ? "지급하기" : "차감하기");
  }, [type]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        disabled={loading || disabled}
        onClick={async () => {
          if (await onValidate()) setIsOpen(true);
        }}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : "적용하기"}
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>포인트 {typeText}</DialogTitle>
        </DialogHeader>
        <CustomAlert type="simple" title="실행 전 내용을 다시 확인해주세요." />
        <Label>포인트</Label>
        <Input value={point} disabled />
        <Label>사유</Label>
        <Input value={reason} disabled />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            className="w-full"
            type="button"
            variant="default"
            onClick={handleSend}
          >
            {typeText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
