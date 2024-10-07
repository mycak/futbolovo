"use client";
import { useAddEventWizardStore } from "@/stores";
import React, { useEffect, useState } from "react";
import { Button, Loader } from "@/components/atoms";
import { generateEventVisibilityEndDate } from "@/utils";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/constants/common";
import { useRouter } from "next/navigation";
import { paths } from "@/constants/paths";
import { EventPreview } from "@/components/molecules";

const AddEventPreview = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const eventData = useAddEventWizardStore((state) => state.addData);
  const prevStep = useAddEventWizardStore((state) => state.prevStep);

  useEffect(() => setIsLoading(false), []);

  const onAddEvent = () => {
    if (eventData === undefined) return;
    setIsLoading(true);
    //BACKEND ACTION - for now just promise resolved after 2 sec
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("Event added");
      }, 2000);
    })
      .then(() => {
        console.log("Add event");
        const successPageQuery = {
          email: eventData.email,
          endDate: format(
            generateEventVisibilityEndDate(eventData.category, eventData),
            DATE_FORMAT
          ),
        };
        const params = new URLSearchParams(successPageQuery).toString();
        const fullPath = `${paths.EventAddConfirm}?${params}`;
        router.push(fullPath);
      })
      .catch(() => console.log("Error"));
  };

  if (!eventData || isLoading) return <Loader />;
  return (
    <EventPreview eventData={eventData}>
      <div className="flex justify-between">
        <Button
          classNames="h-[38px] text-xl pl-3 pr-5 bg-red-400"
          variant="icon"
          text="Popraw"
          icon="pen-to-square"
          onClick={prevStep}
        />
        <Button
          classNames="h-[38px] bg-grass-45 text-xl pl-3 pr-5"
          variant="icon"
          icon="futbol"
          text="Akceptuj"
          onClick={onAddEvent}
        />
      </div>
    </EventPreview>
  );
};

export default AddEventPreview;
