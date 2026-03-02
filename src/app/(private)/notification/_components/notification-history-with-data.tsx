import NotificationHistory from "./notification-history";
import { fetchNotificationHistory } from "@/app/(private)/notification/_action/data";

type Props = {
  startDate: string;
  endDate: string;
  page: string;
};

export async function NotificationHistoryWithData({
  startDate,
  endDate,
  page,
}: Props) {
  const { data } = await fetchNotificationHistory({
    startDate,
    endDate,
    page,
  });

  return (
    <NotificationHistory
      notificationHistory={data}
      startDate={startDate}
      endDate={endDate}
    />
  );
}
