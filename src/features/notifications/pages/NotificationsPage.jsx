import useNotifications from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";
import Section from "@/shared/components/Section";
import Content from "@/shared/components/Content";
import LoadingScreen from "@/shared/components/LoadingScreen";

export default function NotificationsPage() {
  const { notifications, isLoading, markAsRead, deleteNotification } =
    useNotifications();

  if (isLoading) return <LoadingScreen />;

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
