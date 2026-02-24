"use client";

import { CustomAlert } from "@/components/custom-alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChallengeListResponse } from "@/app/(private)/challenge-list/_action/type";

type Props = {
  challengeList: ChallengeListResponse;
};

export default function ChallengeList({ challengeList }: Props) {
  return (
    <div>
      {challengeList.length === 0 ? (
        <CustomAlert type="simple" title="챌린지 목록이 없습니다." />
      ) : (
        <Table className="text-xs">
          <TableHeader>
            <TableRow className="font-semibold">
              <TableHead>챌린지명</TableHead>
              <TableHead>내용</TableHead>
              <TableHead>타입</TableHead>
              <TableHead>시작일</TableHead>
              <TableHead>종료일</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {challengeList.map((challenge) => (
              <TableRow key={challenge.challengeId}>
                <TableCell>{challenge.title}</TableCell>
                <TableCell>{challenge.content}</TableCell>
                <TableCell>{getChallengeType(challenge.type)}</TableCell>
                <TableCell>{challenge.startDate}</TableCell>
                <TableCell>{challenge.endDate}</TableCell>
                <TableCell>{getChallengeStatus(challenge.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

function getChallengeType(type: "TERM" | "WEEKLY") {
  return type === "TERM" ? "기간" : "주간";
}

function getChallengeStatus(
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "TERMINATED"
) {
  switch (status) {
    case "PENDING":
      return "대기";
    case "IN_PROGRESS":
      return "진행";
    case "COMPLETED":
      return "완료";
    case "TERMINATED":
      return "종료";
  }
}
