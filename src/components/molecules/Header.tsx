import React from "react";
import { DashboardHeading, Divider, Logo, PageWrapper } from "../atoms";
import NavigationMenu from "@/components/organism/NavigationMenu";

const Header = () => {
  return (
    <>
      <PageWrapper classNames="grid grid-cols-[30px_auto_30px] items-center w-full pt-4">
        <div />
        <Logo />
        <div className="justify-self-end">
          <NavigationMenu />
        </div>
      </PageWrapper>
      <DashboardHeading classNames="my-4" />
      <Divider classNames="!mt-0 mb-6 md:mb-12" />
    </>
  );
};

export default Header;
