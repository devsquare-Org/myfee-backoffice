"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  BadgeCheck,
  Bookmark,
  ChevronRight,
  Heart,
  InfoIcon,
  Loader2,
  MessageCircle,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchChallengeReviewDetail } from "@/app/(private)/challenge-review/_action/data";
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

type ReviewItem = {
  id: number;
  title: string;
  image: string;
  body: string;
  createdAt: string;
  nickname: string;
  profileImage: string;
};

export function PreviewCard() {
  const searchParams = useSearchParams();
  const [reviewDetail, setReviewDetail] = useState<ReviewItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState<"approve" | "reject" | null>(
    null
  );
  const [isActionExecuting, setIsActionExecuting] = useState(false);
  const reviewItemId = searchParams.get("reviewItemId")?.toString() || "";
  const status = searchParams.get("status")?.toString() || "pending";

  useEffect(() => {
    async function fetchReviewDetail() {
      if (!reviewItemId) return;

      setIsLoading(true);

      const { data } = await fetchChallengeReviewDetail({
        id: reviewItemId,
      });

      setReviewDetail(data || null);
      setIsLoading(false);
    }

    fetchReviewDetail();
  }, [reviewItemId]);

  if (isLoading) return <ReviewDetailSkeleton />;

  if (!reviewItemId || !reviewDetail) return <EmptyPreviewCard />;

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={isActionExecuting || status !== "pending"}>
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
                disabled={isActionExecuting || status !== "pending"}
                variant="outline"
                size="sm"
                onClick={() => setOpenDialog("reject")}
              >
                반려
              </Button>
              <Button
                disabled={isActionExecuting || status !== "pending"}
                variant="default"
                size="sm"
                onClick={() => setOpenDialog("approve")}
              >
                승인
              </Button>
            </div>
          </div>
          <motion.div
            className="flex-1 flex items-center justify-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="
            w-[375px] mx-auto shadow-[0_0_10px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_0_rgba(255,255,255,0.1)] rounded-xl bg-background max-h-[564px] overflow-y-auto
          "
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={reviewDetail?.profileImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-[10px]">
                    <p className="font-semibold">{reviewDetail?.nickname}</p>
                    <p>1분 전</p>
                  </div>
                </div>
                <SquareArrowOutUpRight size={16} />
              </div>
              <div>
                <div className="relative">
                  <Image
                    src={reviewDetail?.image || ""}
                    alt="preview"
                    width={320}
                    height={320}
                    className="aspect-square w-full"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 justify-center bg-primary/50 rounded-full px-2 py-1">
                    <Heart fill="red" stroke="red" className="w-4 h-4" />
                    <p className="text-[13px] text-primary-foreground">1,046</p>
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center justify-center bg-primary/50 rounded-full p-2">
                    <Bookmark className="w-4 h-4" fill="white" stroke="white" />
                  </div>
                </div>
                <div className="bg-[#046A63] px-4 py-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="min-w-[24px] min-h-[24px]" />
                    <p className="text-sm font-semibold line-clamp-1">
                      {reviewDetail?.title}
                    </p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="py-3 px-4">
                  <p className="text-xs leading-[140%]">{reviewDetail?.body}</p>
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
        setIsActionExecuting={setIsActionExecuting}
        reviewId={reviewItemId}
        isOpen={openDialog === "approve"}
        setIsOpen={(isOpen) => setOpenDialog(isOpen ? "approve" : null)}
      />
      <RejectDialog
        setIsActionExecuting={setIsActionExecuting}
        reviewId={reviewItemId}
        isOpen={openDialog === "reject"}
        setIsOpen={(isOpen) => setOpenDialog(isOpen ? "reject" : null)}
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

function ReviewDetailSkeleton() {
  return (
    <div className="flex bg-border h-full flex-col">
      <div className="bg-background  text-center py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium">
          <p className="font-semibold">미리보기 화면</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                대기 중인 인증인 경우 미리보기 영역 내에서 우클릭하여 승인 또는
                반려 처리 할 수 있습니다.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            반려
          </Button>
          <Button variant="default" size="sm" disabled>
            승인
          </Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    </div>
  );
}
