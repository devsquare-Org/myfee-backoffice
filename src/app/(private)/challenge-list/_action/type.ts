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
