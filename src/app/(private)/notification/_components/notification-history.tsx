"use client";

import { NotificationHistoryResponse } from "@/app/(private)/notification/_action/type";
import { CustomAlert } from "@/components/custom-alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaginationControls } from "@/components/pagination-controls";

type Props = {
  notificationHistory: NotificationHistoryResponse;
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
      {notificationHistory.contents.length === 0 ? (
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
            {notificationHistory.contents.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.aliasName}</TableCell>
                <TableCell>{notification.title}</TableCell>
                <TableCell>{notification.body}</TableCell>
                <TableCell>
                  {notification.sendDt.split("T")[0] +
                    " " +
                    notification.sendDt.split("T")[1]}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      notification.marketingYn === "Y" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {notification.marketingYn === "Y" ? "광고" : "일반"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {notificationHistory.totalPages > 1 && (
        <PaginationControls
          pageSize={notificationHistory.size}
          totalItems={notificationHistory.totalElements}
          searchParams={{ startDate, endDate }}
        />
      )}
    </div>
  );
}
