export const ROUTES = {
  DASHBOARD: "/dashboard",
  CHALLENGE_LIST: "/challenge-list",
  CHALLENGE_CREATE: "/challenge-list/create",
  CHALLENGE_REVIEW_LIST: "/challenge-review",
  USERS: "/users",
  NOTIFICATION: "/notification",
  NOTIFICATION_SEND: "/notification/send",
  BANNER: "/banner",
  BANNER_CREATE: "/banner/create",
  SIGNIN: "/signin",
  SHOPBY_TEST: "/shopby-test",
} as const;

// 페이지 라벨 매핑 (경로별)
export const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "대시보드",
  "/challenge-list": "챌린지 관리",
  "/challenge-list/create": "챌린지 등록",
  "/challenge-review": "챌린지 인증",
  "/users": "유저 관리",
  "/notification": "푸시 알림",
  "/notification/send": "푸시 알림 발송",
  "/banner": "배너 관리",
  "/banner/create": "배너 추가",
};

// 하위 페이지 라벨 매핑 (세그먼트별)
export const SEGMENT_LABELS: Record<string, string> = {
  send: "발송",
  detail: "상세",
  edit: "수정",
  create: "생성",
};
