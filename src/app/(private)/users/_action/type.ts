export type UserListResponse = {
  contents: {
    id: number;
    joinDt: string;
    name: string;
    mobile: string;
    birth: string;
    gender: string;
    pointBalance: number;
    totalFollower: number;
    totalFollowing: number;
    totalFeed: number;
    alias: string;
    profileImageUrl: string | null;
  }[];
  totalElements: number;
  totalPages: number;
  size: number;
};

export type UserDetailResponse = {
  id: number;
  joinDt: string;
  name: string;
  mobile: string;
  birth: string;
  gender: string;
  pointBalance: number;
  totalFollower: number;
  totalFollowing: number;
  totalFeed: number;
  alias: string;
  profileImageUrl: string | null;
};
export type UserPointHistoryResponse = {
  createDt: string;
  issuedBy: string;
  action: "EARN" | "SPEND" | "EXPIRE";
  amount: number;
  category:
    | "CHALLENGE_PARTICIPATION"
    | "CHALLENGE_MID_COMPLETE"
    | "CHALLENGE_COMPLETE"
    | "SIGNUP"
    | "REFERRER"
    | "SHOPPING_POINT_EXCHANGE"
    | "ADMIN"
    | "REFERRER"
    | "SHOPPING_POINT_EXCHANGE"
    | "ADMIN";
  reason: string;
  balanceAfter: number;
}[];

export type UserChallengeHistoryResponse = {
  id: string;
  name: string;
  reviewCount: number;
  result: string;
  createdAt: string;
}[];
