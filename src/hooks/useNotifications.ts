import {
  useNotificationsStore,
  NotificationType,
} from '@/stores/notificationsStore';

interface UseNotificationsReturn {
  showNotification: (
    message: string,
    type: NotificationType,
    duration?: number
  ) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const { addNotification, removeNotification, clearNotifications } =
    useNotificationsStore();

  const showNotification = (
    message: string,
    type: NotificationType,
    duration = 5000
  ) => {
    return addNotification({ message, type, duration });
  };

  return {
    showNotification,
    removeNotification,
    clearNotifications,
  };
};
