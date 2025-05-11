import useNotifications from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";
import Section from "@/shared/components/Section";
import Content from "@/shared/components/Content";
import { Loader } from "lucide-react";

export default function NotificationsPage() {
  const { notifications, isLoading, markAsRead, deleteNotification } =
    useNotifications();
    
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin w-6 h-6 text-text-500" />
      </div>
    );
  }

  return (
    <Content>
      <h2>Mes notifications</h2>
      <Section>
        {notifications.length === 0 ? (
          <p className="text-center text-text-500">
            Aucune notification reçue.
          </p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <NotificationCard
                key={notif._id}
                notif={notif}
                onRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
          </div>
        )}
      </Section>
    </Content>
  );
}
