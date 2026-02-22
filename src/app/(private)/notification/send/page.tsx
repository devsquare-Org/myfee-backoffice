import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationSend from "@/app/(private)/notification/_components/notification-send";

export default function SendPage() {
  return (
    <div>
      <PageHeader
        title="푸시 알림 발송"
        description="푸시 알림을 발송할 수 있습니다."
      />
      <Tabs defaultValue="send">
        <TabsList>
          <TabsTrigger value="send">발송</TabsTrigger>
        </TabsList>
        <TabsContent value="send">
          <NotificationSend />
        </TabsContent>
      </Tabs>
    </div>
  );
}
