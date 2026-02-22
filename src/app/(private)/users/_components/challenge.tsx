"use client";
import { UserChallengeHistoryResponse } from "@/app/(private)/users/_action/type";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  challengeHistory: UserChallengeHistoryResponse | [];
};

export default function Challenge({ challengeHistory }: Props) {
  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead>챌린지명</TableHead>
          <TableHead>인증 횟수</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>참가일</TableHead>
          <TableHead>종료일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {challengeHistory.map((item) => (
          <TableRow key={item.challengeId}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.currentCount.toLocaleString()}</TableCell>
            <TableCell>
              <Badge variant="default">{mapJoinStatus[item.joinStatus]}</Badge>
            </TableCell>
            <TableCell>{item.joinDt.split("T")[0]}</TableCell>
            <TableCell>{item.endDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const mapJoinStatus: Record<string, string> = {
  MID_REVIEWING: "중간 리뷰 중",
  IN_PROGRESS: "진행 중",
  FINAL_REVIEWING: "최종 리뷰 중",
  COMPLETED: "완료",
  FAILED: "실패",
  TERMINATED: "중단",
};
