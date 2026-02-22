export type NotificationHistoryResponse = {
  contents: {
    id: number;
    memberId: number;
    aliasName: string;
    title: string;
    body: string;
    sendDt: string;
    marketingYn: "Y" | "N";
  }[];
  totalElements: number;
  totalPages: number;
  size: number;
};
