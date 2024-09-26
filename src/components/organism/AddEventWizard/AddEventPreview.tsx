import { useAddEventStore } from "@/stores";
import { CldImage } from "next-cloudinary";
import React from "react";
import Image from "next/image";
import { Divider } from "@/components/atoms";
import { translateEventType } from "@/utils";
import { format } from "date-fns";
import { currentCurrencySign, DATE_FORMAT } from "@/constants/common";
import { EventCategoryEnum } from "@/types/common";

const AddEventPreview = () => {
  const eventData = useAddEventStore((state) => state.addData);

  if (!eventData) return null;
  return (
    <div>
      <Divider />
      <h1 className="mt-8 text-3xl font-bold text-center text-grass-50 mb-6">
        {eventData.name}
      </h1>
      <div className="mx-auto w-max">
        {eventData.image ? (
          <CldImage
            width="424"
            height="600"
            src={eventData?.image}
            sizes="100vw"
            alt={eventData?.name}
          />
        ) : (
          <Image
            src="/images/posters/tournament-poster.jpg"
            width={400}
            height={610}
            alt="Tournament"
          />
        )}
      </div>
      <Divider />

      <div className="grid grid-cols-2 gap-y-4 gap-x-8 justify-center max-w-lg mx-auto mt-8">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-futbol text-grass-50" />
          <p>{translateEventType(eventData.category)}</p>
        </div>
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-location-dot text-grass-50" />
          <p>{eventData?.location.addressName}</p>
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
                    new Date(eventData.dateRange[0]),
                    DATE_FORMAT
                  )} ${format(new Date(eventData.dateRange[1]), DATE_FORMAT)}`
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
        <div className="flex items-center gap-3 col-span-2">
          <i className="fa-regular fa-comment text-grass-50" />
          <p>{eventData.description}</p>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default AddEventPreview;
