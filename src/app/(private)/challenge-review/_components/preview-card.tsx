"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  BadgeCheck,
  ChevronRight,
  InfoIcon,
  MessageCircle,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ApprovedDialog } from "@/app/(private)/challenge-review/_components/approved-dialog";
import { motion } from "framer-motion";
import { RejectDialog } from "@/app/(private)/challenge-review/_components/reject-dialog";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { ContextMenuSeparator } from "@/components/ui/context-menu";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ReviewItem } from "@/app/(private)/challenge-review/_action/type";
import { formatUtcToKst } from "@/lib/utils";

type Props = {
  reviewItem: ReviewItem | null;
  onRefreshAction: () => void;
};

export function PreviewCard({ reviewItem, onRefreshAction }: Props) {
  const searchParams = useSearchParams();
  const [openDialog, setOpenDialog] = useState<"approve" | "reject" | null>(
    null
  );
  const [isActionExecuting, setIsActionExecuting] = useState(false);
  const status = searchParams.get("status")?.toString() || "REVIEWING";

  if (!reviewItem) return <EmptyPreviewCard />;

  const reviewId = reviewItem.feedId.toString();
  const mediaRatioClass =
    reviewItem.ratio === "RATIO_3_4" ? "aspect-[3/4]" : "aspect-square";

  return (
    <ContextMenu>
      <ContextMenuTrigger
        disabled={isActionExecuting || status !== "REVIEWING"}
      >
        <div className="flex flex-col bg-border h-full">
          <div className="bg-background  text-center py-2 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium">
              <p className="font-semibold">미리보기 화면</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    대기 중인 인증인 경우 미리보기 영역 내에서 우클릭하여 승인
                    또는 반려 처리 할 수 있습니다.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <Button
                disabled={isActionExecuting || status !== "REVIEWING"}
                variant="outline"
                size="sm"
                onClick={() => setOpenDialog("reject")}
              >
                반려
              </Button>
              <Button
                disabled={isActionExecuting || status !== "REVIEWING"}
                variant="default"
                size="sm"
                onClick={() => setOpenDialog("approve")}
              >
                승인
              </Button>
            </div>
          </div>
          <motion.div
            key={reviewItem.feedId}
            className="flex-1 flex items-center justify-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full max-w-[320px] mx-auto shadow-[0_0_10px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_0_rgba(255,255,255,0.1)] rounded-xl bg-background max-h-[564px] overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/icons/empty-profile-image.svg" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="text-[10px]">
                    <p className="font-semibold">{reviewItem.memberId}</p>
                    <p>{formatUtcToKst(reviewItem.createDt)}</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={`relative w-full max-w-[320px] mx-auto ${mediaRatioClass}`}
                >
                  <Image
                    src={reviewItem.mainMediaUrl}
                    alt="preview"
                    fill
                    sizes="(max-width: 320px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#046A63] px-4 py-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="min-w-[24px] min-h-[24px]" />
                    <p className="text-sm font-semibold line-clamp-1">
                      {reviewItem.title}
                    </p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="py-3 px-4">
                  <p className="text-xs leading-[140%]">{reviewItem.content}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <MessageCircle
                      size={14}
                      className="text-muted-foreground"
                    />
                    <p className="text-xs text-muted-foreground">
                      첫번째 댓글을 남겨보세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="cursor-pointer text-xs font-medium "
          disabled={isActionExecuting}
          onSelect={() => {
            setOpenDialog("approve");
          }}
        >
          승인 처리하기
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="cursor-pointer text-destructive text-xs font-medium"
          disabled={isActionExecuting}
          onSelect={() => {
            setOpenDialog("reject");
          }}
        >
          반려 처리하기
        </ContextMenuItem>
      </ContextMenuContent>

      <ApprovedDialog
        challengeId={reviewItem.challengeId.toString()}
        feedId={reviewId}
        memberId={reviewItem.memberId}
        setIsActionExecuting={setIsActionExecuting}
        isOpen={openDialog === "approve"}
        setIsOpen={(isOpen) => setOpenDialog(isOpen ? "approve" : null)}
        onRefreshAction={onRefreshAction}
      />

      <RejectDialog
        challengeId={reviewItem.challengeId.toString()}
        feedId={reviewId}
        memberId={reviewItem.memberId}
        setIsActionExecuting={setIsActionExecuting}
        isOpen={openDialog === "reject"}
        setIsOpen={(isOpen) => setOpenDialog(isOpen ? "reject" : null)}
        onRefreshAction={onRefreshAction}
      />
    </ContextMenu>
  );
}

function EmptyPreviewCard() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-xs text-muted-foreground font-medium">
          표시할 리뷰가 없습니다.
        </p>
      </div>
    </div>
  );
}
