"use client";

import React from "react";
import { DashboardHeading, Divider, Logo, PageWrapper } from "../atoms";
import NavigationMenu from "@/components/organism/NavigationMenu";
import { useTranslation } from "@/app/i18n/client";
import { mainTopics } from "@/constants/texts";
import { navigationItems } from "@/constants/navigation";

const Header = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);

  return (
    <>
      <PageWrapper classNames="grid grid-cols-[30px_auto_30px] items-center w-full pt-4">
        <div />
        <Logo />
        <div className="justify-self-end">
          <NavigationMenu navigationItems={navigationItems(true, t)} />
        </div>
      </PageWrapper>
      <DashboardHeading mainTopics={mainTopics(t)} classNames="my-4" />
      <Divider classNames="!mt-0 mb-6 md:mb-12" />
    </>
  );
};

export default Header;
