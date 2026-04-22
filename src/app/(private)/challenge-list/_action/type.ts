export type ChallengeListResponse = {
  challengeId: number;
  createDt: string;
  title: string;
  type: "TERM" | "WEEKLY";
  content: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "TERMINATED";
  participationPoint: number;
  midPoint: number | null;
  completionPoint: number;
}[];

export type ChallengeNotice = {
  paragraph: number;
  title: string;
  subTitle?: string | null;
  contents: {
    order: number;
    content: string;
  }[];
};

export type ChallengeHashtag = {
  name: string;
};

export type ChallengeDetailResponse = {
  challengeId: number;
  title: string;
  thumbnailUrl: string;
  certificationGuideUrl: string;
  type: "TERM" | "WEEKLY";
  content: string;
  linkUrl: string;
  startDate: string;
  endDate: string;
  term: number;
  rejoinAllowYn: "Y" | "N";
  requiredCertificationCount: number;
  dailyCertificationCount: number;
  participationPoint: number;
  completionPoint: number;
  midPointYn: "Y" | "N";
  midPoint: number | null;
  midPointPeriodDuration: number;
  midPointRequiredSatisfactionCount: number;
  participantLimitYn: "Y" | "N";
  maxParticipantCount: number;
  notices: ChallengeNotice[];
  hashtags: ChallengeHashtag[];
};
