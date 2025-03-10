'use client';

import { useEffect, useState } from 'react';
import {
  useNotificationsStore,
  Notification as NotificationType,
} from '@/stores/notificationsStore';
import {
  notificationContainerStyles,
  generateNotificationStyles,
  closeButtonStyles,
  notificationAnimation,
} from '@/components/atoms/notifications/styles';

interface NotificationProps {
  notification: NotificationType;
  onRemove: (id: string) => void;
}

const Notification = ({ notification, onRemove }: NotificationProps) => {
  const { id, type, message, duration = 500000 } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [id, duration, onRemove]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation on mount
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(id), 300); // Wait for animation to complete
  };

  // Determine icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className='fa-solid fa-check-circle mr-2' />;
      case 'error':
        return <i className='fa-solid fa-exclamation-circle mr-2' />;
      case 'info':
        return <i className='fa-solid fa-info-circle mr-2' />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${generateNotificationStyles(type)} ${
        isVisible
          ? notificationAnimation.enterActive
          : notificationAnimation.exit
      }`}
      role='alert'
    >
      <div className='flex items-center'>
        {getIcon()}
        <span>{message}</span>
      </div>
      <button
        onClick={handleClose}
        className={closeButtonStyles}
        aria-label='Close notification'
      >
        <i className='fa-solid fa-times'></i>
      </button>
    </div>
  );
};

export const Notifications = () => {
  const { notifications, removeNotification } = useNotificationsStore();

  return (
    <div className={notificationContainerStyles}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default Notifications;
