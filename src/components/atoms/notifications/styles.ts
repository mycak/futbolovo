import clsx from 'clsx';
import { NotificationType } from '@/stores/notificationsStore';

export const notificationContainerStyles =
  'fixed top-5 right-5 z-50 flex flex-col gap-2';

export const generateNotificationStyles = (type: NotificationType) => {
  const baseStyles =
    'px-4 py-3 rounded-sm shadow-lg min-w-[280px] max-w-sm transition-all duration-300 flex justify-between items-center text-ivory-150';

  const typeStyles = {
    success: 'bg-emerald-600 border border-grass-30',
    error: 'bg-red-700 border border-red-300',
    info: 'bg-emerald-900 border border-grass-50',
  };

  return clsx(baseStyles, typeStyles[type]);
};

export const closeButtonStyles =
  'text-ivory-150 hover:text-grass-30 transition-colors ml-2';

export const notificationAnimation = {
  enter: 'transform translate-x-full opacity-0',
  enterActive:
    'transform translate-x-0 opacity-100 transition-all duration-300',
  exit: 'transform translate-x-full opacity-0 transition-all duration-300',
};
