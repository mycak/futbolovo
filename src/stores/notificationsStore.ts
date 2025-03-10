import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

export interface NotificationsState {
  notifications: Notification[];
}

export interface NotificationsAction {
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const initialState: NotificationsState = {
  notifications: [],
};

export const useNotificationsStore = create<
  NotificationsState & NotificationsAction
>((set) => ({
  ...initialState,
  addNotification: (notification) => {
    const id = uuidv4();
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }],
    }));
    return id;
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },
  clearNotifications: () => {
    set({ notifications: [] });
  },
}));
