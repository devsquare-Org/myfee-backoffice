"use client";
import { UserPointHistoryResponse } from "@/app/(private)/users/_action/type";
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
  pointHistory: UserPointHistoryResponse;
};

export default function Point({ pointHistory }: Props) {
  const sortedPointHistory = pointHistory.sort((a, b) => {
    return new Date(b.createDt).getTime() - new Date(a.createDt).getTime();
  });

  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead>유형</TableHead>
          <TableHead>포인트</TableHead>
          <TableHead>사유</TableHead>
          <TableHead>실행 주체</TableHead>
          <TableHead>지급 / 차감일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPointHistory.map((item, idx) => (
          <TableRow key={item.createDt + idx}>
            <TableCell>
              {item.action === "EARN" ? (
                <Badge
                  variant="outline"
                  className="text-amber-500 border-amber-500"
                >
                  지급
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-teal-500 text-teal-500"
                >
                  차감
                </Badge>
              )}
            </TableCell>
            <TableCell>{item.amount.toLocaleString()}</TableCell>
            <TableCell>{item.reason}</TableCell>
            <TableCell>{item.issuedBy}</TableCell>
            <TableCell>{item.createDt.replace("T", " ")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
