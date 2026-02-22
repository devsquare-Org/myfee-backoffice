"use client";
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
  pointHistory: {
    id: string;
    point: number;
    type: string;
    reason: string;
    createdAt: string;
    adminId?: string;
  }[];
};

export default function Point({ pointHistory }: Props) {
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
        {pointHistory.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              {item.type === "지급" ? (
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
            <TableCell>{item.point.toLocaleString()}</TableCell>
            <TableCell>{item.reason}</TableCell>
            <TableCell>{item.adminId || "system"}</TableCell>
            <TableCell>{item.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
