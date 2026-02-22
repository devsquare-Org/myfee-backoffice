"use client";

import { notificationHistoryResponse } from "@/app/(private)/notification/_action/res-schema";
import { CustomAlert } from "@/components/custom-alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { PaginationControls } from "@/components/pagination-controls";

type Props = {
  notificationHistory: z.infer<typeof notificationHistoryResponse>;
  startDate?: string;
  endDate?: string;
};

export default function NotificationHistory({
  notificationHistory,
  startDate,
  endDate,
}: Props) {
  return (
    <div>
      {notificationHistory.length === 0 ? (
        <CustomAlert type="simple" title="발송 내역이 없습니다." />
      ) : (
        <Table className="text-xs">
          <TableHeader>
            <TableRow className="font-semibold">
              <TableHead>관리자 아이디</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>내용</TableHead>
              <TableHead>발송일시</TableHead>
              <TableHead>광고 알림 여부</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notificationHistory.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.adminId}</TableCell>
                <TableCell>{notification.title}</TableCell>
                <TableCell>{notification.content}</TableCell>
                <TableCell>{notification.createdAt}</TableCell>
                <TableCell>
                  <Badge
                    variant={notification.isAd ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {notification.isAd ? "광고" : "일반"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <PaginationControls
        pageSize={10}
        totalItems={100}
        searchParams={{ startDate, endDate }}
      />
    </div>
  );
}
