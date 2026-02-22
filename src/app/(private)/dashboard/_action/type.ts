export type DashboardDataResponse = {
  startDate: string;
  endDate: string;
  postCount: number;
  challengeReviewCount: number;
  userCount: number;
  pointCount: number;
  userList: {
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
};
