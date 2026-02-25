import { Label } from "@/components/ui/label";
import { useCreateChallenge } from "../lib/use-create";

export default function BasicSection() {
  return (
    <div className="rounded-lg p-6 border">
      <Label className="text-lg font-semibold mb-10">기본 정보</Label>
    </div>
  );
}
