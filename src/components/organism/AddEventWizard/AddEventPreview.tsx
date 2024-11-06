"use client";
import { useAddEventWizardStore } from "@/stores";
import React, { useState } from "react";
import { Button, Loader } from "@/components/atoms";
import { generateEventVisibilityEndDate } from "@/utils";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/constants/common";
import { useParams, useRouter } from "next/navigation";
import { paths } from "@/constants/paths";
import { EventPreview } from "@/components/molecules";
import { useTranslation } from "@/app/i18n/client";
import { addEvent } from "@/app/actions";
import { Prisma } from "@prisma/client";

const AddEventPreview = () => {
  const router = useRouter();
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const eventData = useAddEventWizardStore((state) => state.addData);
  const prevStep = useAddEventWizardStore((state) => state.prevStep);

  const onAddEvent = async () => {
    if (eventData === undefined) return;
    setIsLoading(true);
    await addEvent({ ...eventData } as unknown as Prisma.EventCreateInput)
      .then(() => {
        const successPageQuery = {
          email: eventData.email,
          endDate: format(
            generateEventVisibilityEndDate(eventData.category, eventData),
            DATE_FORMAT,
          ),
        };
        const params = new URLSearchParams(successPageQuery).toString();
        const fullPath = `${paths.EventAddConfirm}?${params}`;
        router.push(fullPath);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  if (!eventData || isLoading) return <Loader lng={lng as string} />;
  return (
    <EventPreview eventData={eventData} lng={lng as string}>
      <div className="flex justify-between">
        <Button
          classNames="h-[38px] md:text-xl pl-3 pr-5 bg-red-400"
          variant="icon"
          text={t("fix")}
          icon="pen-to-square"
          onClick={prevStep}
        />
        <Button
          classNames="h-[38px] bg-grass-45 md:text-xl pl-3 pr-5"
          variant="icon"
          icon="futbol"
          text={t("accept")}
          onClick={onAddEvent}
        />
      </div>
    </EventPreview>
  );
};

export default AddEventPreview;
