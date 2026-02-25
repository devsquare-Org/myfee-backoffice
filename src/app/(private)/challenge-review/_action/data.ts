"use server";

import {
  challengeReviewDetailParams,
  challengeReviewListParams,
} from "@/app/(private)/challenge-review/_action/schema";
import { ReviewList } from "@/app/(private)/challenge-review/_action/type";
import { myfeeFetch } from "@/lib/myfee-client";
import { getUserIdServer } from "@/lib/server-utils";
import z from "zod";

const reviewList = [
  {
    id: 1,
    title:
      "일주일에 헬스장 4번 가기일주일에 헬스장 4번 가기일주일에 헬스장 4번 가기",
    image: "https://picsum.photos/id/1011/320/320",
    body: "오운완 챌린지 재미있어요!오운완 챌린지 재미있어요!오운완 챌린지 재미있어요!",
    createdAt: "2025-01-01",
    nickname: "song123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    title: "(2000자)일주일에 헬스장 2번 가기",
    image: "https://picsum.photos/id/1027/320/320",
    body: "꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지는 않네요!꾸준히 하는 게 쉽지",
    createdAt: "2025-01-03",
    nickname: "shin123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    title: "매일 단백질 코코밥 섭취하기",
    image: "https://picsum.photos/id/1035/320/320",
    body: "코코밥 먹고 있어요!",
    createdAt: "2025-01-05",
    nickname: "kim123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 4,
    title: "아침 공복 유산소 20분 하기",
    image: "https://picsum.photos/id/1043/320/320",
    body: "처음엔 힘들었는데 점점 상쾌해져요!",
    createdAt: "2025-01-07",
    nickname: "choi123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 5,
    title: "주 3회 스트레칭 루틴 지키기",
    image: "https://picsum.photos/id/1050/320/320",
    body: "몸이 덜 뻐근해서 좋습니다.",
    createdAt: "2025-01-10",
    nickname: "goo123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 6,
    title: "매일 아침 물 500ml 마시기",
    image: "https://picsum.photos/id/1062/320/320",
    body: "습관 들이니까 하루가 상쾌해요!",
    createdAt: "2025-01-12",
    nickname: "bak123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 7,
    title: "야식 끊기 챌린지",
    image: "https://picsum.photos/id/1074/320/320",
    body: "처음에는 배고파서 힘들었지만 성공 중입니다.",
    createdAt: "2025-01-15",
    nickname: "hong123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 8,
    title: "일주일에 책 한 권 읽기",
    image: "https://picsum.photos/id/1084/320/320",
    body: "독서 습관이 조금씩 자리 잡고 있어요.",
    createdAt: "2025-01-18",
    nickname: "park123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 9,
    title: "매일 영어 단어 10개 외우기",
    image: "https://picsum.photos/id/109/320/320",
    body: "꾸준히 하니 어휘력이 늘고 있어요.",
    createdAt: "2025-01-20",
    nickname: "lee123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 10,
    title: "주말 아침 조깅하기",
    image: "https://picsum.photos/id/110/320/320",
    body: "상쾌하게 하루를 시작할 수 있어 만족합니다.",
    createdAt: "2025-01-22",
    nickname: "park123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 11,
    title: "주말 아침 조깅하기",
    image: "https://picsum.photos/id/111/320/320",
    body: "상쾌하게 하루를 시작할 수 있어 만족합니다.",
    createdAt: "2025-01-22",
    nickname: "hong123",
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 12,
    title: "주말 아침 조깅하기",
    image: "https://picsum.photos/id/112/320/320",
    body: "상쾌하게 하루를 시작할 수 있어 만족합니다.",
    createdAt: "2025-01-22",
    nickname: "kim123",
    profileImage: "https://github.com/shadcn.png",
  },
];

export async function fetchChallengeReviewList(
  params: z.infer<typeof challengeReviewListParams>
): Promise<{
  data: ReviewList;
  message: string;
}> {
  const res = await myfeeFetch({
    endpoint: `/api/admin/challenges/verifications?review=${params.status}&startDate=${params.startDate}&endDate=${params.endDate}&page=${params.page}&size=20`,
    requiresAuth: true,
  });

  console.log("fetchChallengeReviewList>>>>>>>>>>>>>>>>>>>>>>>>>", res);

  return {
    data: res,
    message: "챌린지 인증 목록을 성공적으로 조회하였습니다.",
  };
}

export async function fetchChallengeReviewDetail(
  params: z.infer<typeof challengeReviewDetailParams>
) {
  const review = reviewList.find((item) => item.id === Number(params.id));

  const userId = await getUserIdServer();

  if (!userId) throw new Error("userId가 없습니다.");

  return {
    data: review,
    message: "챌린지 인증 상세 정보를 성공적으로 조회하였습니다.",
  };
}
