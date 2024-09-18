"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navigationItems } from "@/constants/navigation";
import { NavigationKey } from "@/types/common";
import { useOutsideClick } from "@/hooks";
import { usePathname } from "next/navigation";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const ref = useOutsideClick(() => setIsOpen(false));

  useEffect(() => setIsOpen(false), [pathname]);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="max-w-max"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup={isOpen}
          onClick={toggleMenu}
        >
          <i className="fa-solid fa-bars fa-2xl text-grass-45 mx-auto transition-colors duration-500 hover:text-grass-20" />
        </button>
      </div>

      <div
        className={`absolute right-0 z-10 mt-6 w-56 origin-top-right rounded-md bg-grass-45 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
        transition-all duration-300 ease-out transform ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
        ref={ref}
      >
        <div className="py-1" role="none">
          {Object.keys(navigationItems(true)).map((key, index) => (
            <div key={key}>
              {navigationItems(true)[key as NavigationKey].map(
                ({ text, to }) => (
                  <Link
                    href={to}
                    key={text}
                    className="block px-4 py-2 text-xl transition-all duration-300 hover:bg-grass-40"
                  >
                    {text}
                  </Link>
                )
              )}
              {index !== 2 && (
                <div className="border-b border-grass-40 mx-2 my-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
