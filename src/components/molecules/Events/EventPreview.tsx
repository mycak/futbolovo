import { Event, EventCategoryEnum } from "@/types/common";
import React from "react";
import { Divider } from "../../atoms";
import EventImage from "./EventImage";
import { formatPhoneNumber, translateEventType } from "@/utils";
import { currentCurrencySign, DATE_FORMAT } from "@/constants/common";
import { differenceInDays, format } from "date-fns";
import { AddEventInputs } from "@/schemas/addEventSchema";

const EventPreview = ({
  eventData,
  children,
}: {
  eventData: Event | AddEventInputs;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-center text-grass-30 mb-6">
        {eventData.name}
      </h1>
      <div className="mx-auto max-w-96">
        <EventImage eventData={eventData} />
      </div>
      <Divider />

      <div className="grid grid-cols-2 gap-y-4 gap-x-8 justify-center max-w-lg mx-auto mt-4 md:mt-8">
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
        {(eventData.category === EventCategoryEnum.CAMP ||
          eventData.category === EventCategoryEnum.MATCH) && (
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
        {eventData.category === EventCategoryEnum.CAMP && (
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-calendar-plus text-grass-50" />
            <p>
              {eventData.dateRange
                ? differenceInDays(
                    new Date(eventData.dateRange[1] as Date),
                    new Date(eventData.dateRange[0] as Date)
                  )
                : "-"}{" "}
              dni
            </p>
          </div>
        )}
        {[
          EventCategoryEnum.MATCH,
          EventCategoryEnum.CAMP,
          EventCategoryEnum.TOURNAMENT,
          EventCategoryEnum.SCHOOL,
        ].includes(eventData.category) && (
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-child-reaching text-grass-50" />
            <p>
              {eventData.ageCategories
                ? eventData.ageCategories.join(", ")
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
          <p>{formatPhoneNumber(eventData.phoneNumber)}</p>
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
      {children}
    </div>
  );
};

export default EventPreview;
