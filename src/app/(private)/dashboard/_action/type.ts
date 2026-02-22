export type DashboardDataResponse = {
  startDate: string;
  endDate: string;
  postCount: number;
  challengeReviewCount: number;
  userCount: number;
  pointCount: number;
  userList: {
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
};
