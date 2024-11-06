"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { NavigationItem, NavigationKey } from "@/types/common";
import { useOutsideClick } from "@/hooks";
import { usePathname } from "next/navigation";

const NavigationMenu = ({
  navigationItems,
}: {
  navigationItems: Record<NavigationKey, NavigationItem[]>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useOutsideClick(() => setIsOpen(false), [buttonRef]);

  useEffect(() => setIsOpen(false), [pathname]);
  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="max-w-max"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup={isOpen}
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
          ref={buttonRef}
        >
          <i className="fa-solid fa-bars fa-xl text-grass-45 mx-auto transition-colors duration-500 hover:text-grass-20" />
        </button>
      </div>

      <div
        ref={dropdownRef}
        className={`absolute right-0 mt-2 md:mt-6 w-56 origin-top-right rounded-md bg-grass-45 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
        transition-all duration-300 ease-out transform ${
          isOpen ? "opacity-100 scale-100 z-50" : "opacity-0 scale-95 -z-10"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          <ul role="menu">
            {Object.keys(navigationItems).map((key, index) => (
              <li key={key} role="none">
                {navigationItems[key as NavigationKey].map(({ text, to }) => (
                  <Link
                    href={to}
                    key={text}
                    role="menuitem"
                    className="block px-4 py-2 md:text-xl transition-all duration-300 hover:bg-grass-40"
                  >
                    {text}
                  </Link>
                ))}
                {index !== 2 && (
                  <div
                    className="border-b border-grass-40 mx-2 my-2"
                    role="separator"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
