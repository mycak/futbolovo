'use-client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { useOutsideClick } from '@/hooks';
import { locales } from '@/configs/i18n';

const LanguageSwitcher = ({
  classNames,
  lng,
}: {
  classNames?: string;
  lng: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname().slice(4); // Pathname without language prefix

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useOutsideClick(() => setIsOpen(false), [buttonRef]);

  useEffect(() => setIsOpen(false), [pathname]);
  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <div className={clsx('relative inline-block text-left', classNames)}>
      <div>
        <button
          type='button'
          className='max-w-max cursor-pointer group'
          aria-expanded={isOpen}
          aria-haspopup={isOpen}
          aria-label='Toggle language menu'
          onClick={toggleMenu}
          ref={buttonRef}
        >
          <span className='text-grass-45 text-xs mx-auto transition-colors duration-500 group-hover:text-grass-20 font-medium'>
            {lng.toUpperCase()}
          </span>
          <i className='fa-solid fa-language text-grass-45 transition-colors duration-500 group-hover:text-grass-20' />
        </button>
      </div>

      <div
        ref={dropdownRef}
        className={clsx(
          'absolute top-full mt-2 md:mt-2 min-w-max w-auto origin-top-right rounded-md bg-grass-45 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          'transition-all duration-300 ease-out transform',
          isOpen ? 'opacity-100 scale-100 z-50' : 'opacity-0 scale-95 -z-10'
        )}
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='language-menu-button'
        tabIndex={-1}
      >
        <div className='py-1' role='none'>
          <ul role='menu'>
            {locales
              .filter((item) => item !== lng)
              .map((lang) => (
                <li key={lang} role='none'>
                  <button
                    onClick={() => {
                      window.location.href = `/${lang}/${pathname}`;
                      setIsOpen(false);
                    }}
                    className={clsx(
                      'cursor-pointer block w-full text-left px-4 py-2 md:text-xl whitespace-nowrap transition-all duration-300 hover:bg-grass-40',
                      lng === lang && 'font-bold'
                    )}
                    role='menuitem'
                  >
                    {lang.toUpperCase()}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
