"use client";

import { UserDetailResponse } from "@/app/(private)/users/_action/type";
import { CustomAlert } from "@/components/custom-alert";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type Props = {
  userDetail: UserDetailResponse;
};

export default function BasicInfo({ userDetail }: Props) {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("클립보드에 복사되었습니다.");
  }

  return (
    <div className="grid grid-cols-4">
      <Card className="col-span-3 max-w-xl">
        <Label className="mb-2">이름</Label>
        <div className="flex items-center gap-2 mb-6">
          <Input value={userDetail.name} readOnly />
          <button
            type="button"
            onClick={() => copyToClipboard(userDetail.name)}
            className="border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30"
          >
            <Copy className="w-[14px] h-[14px]" />
          </button>
        </div>

        <Label className="mb-2">닉네임</Label>
        <div className="flex items-center gap-2 mb-6">
          <Input value={userDetail.alias} readOnly />
          <button
            type="button"
            onClick={() => copyToClipboard(userDetail.alias)}
            className="border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30"
          >
            <Copy className="w-[14px] h-[14px]" />
          </button>
        </div>

        <Label className="mb-2">전화번호</Label>
        <div className="flex items-center gap-2 mb-6">
          <Input value={userDetail.mobile} readOnly />
          <button
            onClick={() => copyToClipboard(userDetail.mobile)}
            className="border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30"
          >
            <Copy className="w-[14px] h-[14px]" />
          </button>
        </div>

        <Label className="mb-2">가입일</Label>
        <div className="flex items-center gap-2 mb-6">
          <Input value={userDetail.joinDt.split("T")[0]} readOnly />
          <div className="w-9 h-9" />
        </div>

        <Label className="mb-2">생년월일</Label>
        <div className="flex items-center gap-2 mb-6">
          <Input value={userDetail.birth} readOnly />
          <div className="w-9 h-9" />
        </div>

        <Label className="mb-2">성별</Label>
        <div className="flex items-center gap-2 mb-6">
          <Input value={userDetail.gender} readOnly />
          <div className="w-9 h-9" />
        </div>

        <Label className="mb-2">보유 포인트</Label>
        <div className="flex items-center gap-2  mb-6">
          <Input value={userDetail.pointBalance.toLocaleString()} readOnly />
          <div className="w-9 h-9" />
        </div>

        <Label className="mb-2">팔로워</Label>
        <div className="flex items-center gap-2  mb-6">
          <Input value={userDetail.totalFollower.toLocaleString()} readOnly />
          <div className="w-9 h-9" />
        </div>

        <Label className="mb-2">팔로잉</Label>
        <div className="flex items-center gap-2  mb-6">
          <Input value={userDetail.totalFollowing.toLocaleString()} readOnly />
          <div className="w-9 h-9" />
        </div>

        <Label className="mb-2">게시물</Label>
        <div className="flex items-center gap-2  mb-6">
          <Input value={userDetail.totalFeed.toLocaleString()} readOnly />
          <div className="w-9 h-9" />
        </div>

        <Label className="mb-2">쇼핑몰 아이디</Label>
        <div className="flex items-center gap-2">
          <Input value={userDetail.id} readOnly />

          <button
            type="button"
            onClick={() => copyToClipboard(userDetail.id.toString())}
            className="border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30"
          >
            <Copy className="w-[14px] h-[14px]" />
          </button>
        </div>
      </Card>
      <CustomAlert
        className="mb-4 col-span-1"
        title="유저 정보 안내"
        description={
          <ul className="flex flex-col gap-1 mt-2 list-disc list-outside">
            <li>유저 상세 정보는 관리자가 수정할 수 없습니다.</li>
            <li>
              주문 내역이나 적립금, 쿠폰 등의 쇼핑 데이터는 쇼핑 어드민에서 확인
              가능합니다.
            </li>
            <li>
              유저의 쇼핑 데이터를 보기 위해서는 샵바이 관리자에 로그인
              되어있어야 합니다.
            </li>
          </ul>
        }
        type="default"
      />
    </div>
  );
}
