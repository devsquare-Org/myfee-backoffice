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
  nickname: string;
  name: string;
  phone: string;
  email: string;
  shopbyUserId: string;
};

export type UserPointHistoryResponse = {
  id: string;
  point: number;
  reason: string;
  type: string;
  createdAt: string;
}[];

export type UserChallengeHistoryResponse = {
  id: string;
  name: string;
  reviewCount: number;
  result: string;
  createdAt: string;
}[];
