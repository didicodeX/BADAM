import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as NotificationAPI from "../api/notifications.api";
import { useEffect } from "react";
import { socket } from "@/shared/lib/socket";
import { toastSuccess } from "@/shared/components/toast";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function useNotifications() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore(); // doit contenir `user._id`

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: NotificationAPI.getMyNotifications,
    enabled: !!user?._id,
  });

  // ➕ Ecoute de Socket.io
  useEffect(() => {
    if (!user?._id) return;

    socket.emit("joinRoom", user._id); // on entre dans la room privée

    const handleNewNotif = (notif) => {
      toastSuccess(notif.message);
      queryClient.invalidateQueries(["notifications"]); // recharge la page
    };

    socket.on("new_notification", handleNewNotif);

    return () => {
      socket.off("new_notification", handleNewNotif);
    };
  }, [user?._id, queryClient]);

  const markAsRead = useMutation({
    mutationFn: NotificationAPI.markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const deleteNotif = useMutation({
    mutationFn: NotificationAPI.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

const notifications = Array.isArray(data?.data.data) ? data.data.data : [];

const hasUnread = notifications.some((n) => !n.read);


  return {
    notifications: data?.data.data || [],
    isLoading,
    markAsRead: markAsRead.mutate,
    deleteNotification: deleteNotif.mutate,
    hasUnreadNotifications: hasUnread,
  };
}
