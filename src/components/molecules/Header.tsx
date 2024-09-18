import React from "react";
import { Logo, PageWrapper } from "../atoms";
import NavigationMenu from "@/components/organism/NavigationMenu";

const Header = () => {
  return (
    <PageWrapper classNames="grid grid-cols-[30px_auto_30px] items-center w-full pt-4">
      <div />
      <Logo />
      <div className="justify-self-end">
        <NavigationMenu />
      </div>
    </PageWrapper>
  );
};

export default Header;
