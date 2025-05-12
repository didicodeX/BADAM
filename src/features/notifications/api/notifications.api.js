import { api } from "@/shared/lib/axios";

export const getMyNotifications = () => api.get("/notifications");

export const markNotificationAsRead = (id) => api.patch(`/notifications/${id}/read`);

export const deleteNotification = (id) => api.delete(`/notifications/${id}`);
