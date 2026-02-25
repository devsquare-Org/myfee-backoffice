export type ReviewItem = {
  memberId: number;
  challengeId: number;
  feedId: number;
  createDt: string;
  title: string;
  content: string;
  mainMediaUrl: string;
  mainMediaType:
    | "PROFILE_IMAGE"
    | "FEED_IMAGE"
    | "FEED_VIDEO"
    | "BANNER_IMAGE"
    | "CHALLENGE_THUMBNAIL";
  ratio: "RATIO_3_4" | "RATIO_1_1";
  review: "REVIEWING" | "APPROVED" | "REJECTED";
};

export type ReviewList = {
  contents: ReviewItem[];
  totalElements: number;
  totalPages: number;
  size: number;
};
