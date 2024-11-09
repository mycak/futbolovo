import { useEffect, useRef } from 'react';

export const useOutsideClick = (
  callback: () => void,
  additionalRefs: React.RefObject<HTMLElement>[] = []
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      const isInsideDropdown = ref.current?.contains(target);
      const isInsideButton = additionalRefs.some((buttonRef) =>
        buttonRef.current?.contains(target)
      );

      if (!isInsideDropdown && !isInsideButton) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback, additionalRefs]);

  return ref;
};
