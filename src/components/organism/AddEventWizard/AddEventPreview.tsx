"use client";
import { useAddEventWizardStore } from "@/stores";
import React, { useEffect, useState } from "react";
import { Button, Divider, Loader } from "@/components/atoms";
import { generateEventEndDate, translateEventType } from "@/utils";
import { format } from "date-fns";
import { currentCurrencySign, DATE_FORMAT } from "@/constants/common";
import { EventCategoryEnum } from "@/types/common";
import { useRouter } from "next/navigation";
import { paths } from "@/constants/paths";
import { EventImage } from "@/components/molecules";

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
            generateEventEndDate(eventData.category, eventData),
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
    <div>
      <Divider />
      <h1 className="mt-8 text-3xl font-bold text-center text-grass-50 mb-6">
        {eventData.name}
      </h1>
      <div className="mx-auto w-max">
        <EventImage eventData={eventData} />
      </div>
      <Divider />

      <div className="grid grid-cols-2 gap-y-4 gap-x-8 justify-center max-w-lg mx-auto mt-8">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-futbol text-grass-50" />
          <p>{translateEventType(eventData.category)}</p>
        </div>

        {eventData.category === EventCategoryEnum.TOURNAMENT && (
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-calendar-days text-grass-50" />
            <p>
              {eventData.date
                ? format(new Date(eventData.date), DATE_FORMAT)
                : "-"}
            </p>
          </div>
        )}
        {eventData.category === EventCategoryEnum.CAMP && (
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-calendar-days text-grass-50" />
            <p>
              {eventData.dateRange
                ? `${format(
                    new Date(eventData.dateRange[0] as Date),
                    DATE_FORMAT
                  )} - ${format(
                    new Date(eventData.dateRange[1] as Date),
                    DATE_FORMAT
                  )}`
                : "-"}
            </p>
          </div>
        )}
        {[
          EventCategoryEnum.CAMP,
          EventCategoryEnum.TOURNAMENT,
          EventCategoryEnum.SCHOOL,
        ].includes(eventData.category) && (
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-child-reaching text-grass-50" />
            <p>
              {eventData.ageCategories
                ? eventData.ageCategories.join(", ").replace("9999", "Open")
                : "-"}
            </p>
          </div>
        )}
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-coins text-grass-50" />
          <p>
            {eventData.price} {currentCurrencySign}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <i className="fa-regular fa-envelope text-grass-50" />
          <p>{eventData.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-phone-flip text-grass-50" />
          <p>{eventData.phoneNumber}</p>
        </div>
        <div className="flex items-center gap-3 col-span-2">
          <i className="fa-solid fa-location-dot text-grass-50" />
          <p>{eventData?.location.addressName}</p>
        </div>
        <div className="flex items-center gap-3 col-span-2">
          <i className="fa-regular fa-comment text-grass-50" />
          <p>{eventData.description}</p>
        </div>
      </div>
      <Divider />
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
    </div>
  );
};

export default AddEventPreview;
