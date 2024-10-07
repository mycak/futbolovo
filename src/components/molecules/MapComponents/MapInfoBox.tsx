"use client";
import { useEffect, useRef, useState } from "react";
import { InfoBox } from "@react-google-maps/api";
import {
  generateMapIcon,
  // translateEventType
} from "@/utils";
import { format } from "date-fns";
import { EventCategoryEnum, Event } from "@/types/common";
import { currentCurrencySign, DATE_FORMAT } from "@/constants/common";
import clsx from "clsx";
import Image from "next/image";
import { paths } from "@/constants/paths";
import { Button, Divider } from "@/components/atoms";
import EventImage from "../Events/EventImage";

const MapInfoBox = ({
  event,
  resetCurrent,
  currentId,
}: {
  currentId: string | number | null;
  event: Event;
  resetCurrent: () => void;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  // InfoBox options for positioning and disabling default close button
  const boxOptions = {
    enableEventPropagation: true,
    pixelOffset: new google.maps.Size(-150, -150),
    closeBoxURL: "", // Remove default close icon
  };

  // Effect to handle showing and hiding the InfoBox with animation
  useEffect(() => {
    if (currentId === event.id) {
      setIsRendered(true);
      timeoutId.current = setTimeout(() => setIsVisible(true), 10); // Trigger fade-in animation after a small delay
    } else {
      setIsVisible(false);
      timeoutId.current = setTimeout(() => setIsRendered(false), 300); // Remove component from DOM after animation
    }

    return () => clearTimeout(timeoutId.current);
  }, [currentId, event.id]);

  const handleClose = () => {
    setIsVisible(false);
    timeoutId.current = setTimeout(() => {
      resetCurrent();
      setIsRendered(false);
    }, 300);
  };

  if (!isRendered) return null;

  return (
    <InfoBox
      position={
        new google.maps.LatLng(
          event.location.latitude as number,
          event.location.longitude as number
        )
      }
      options={boxOptions}
      onCloseClick={handleClose}
    >
      <div
        className={clsx(
          "relative flex flex-row border border-grass-50 rounded-lg bg-emerald-900 p-5 text-ivory-150",
          "hover:cursor-pointer focus:outline-none focus:border-grass-40",
          "transition-all duration-300 ease-out",
          isVisible ? "opacity-95 " : "opacity-0"
        )}
      >
        <EventImage eventData={event} classNames="w-48 mr-4" />
        <button
          className="absolute top-2 right-2 text-ivory-150 hover:text-grass-30"
          onClick={handleClose}
        >
          &#10005;
        </button>
        <div className="flex flex-col gap-1 w-80">
          <div className="flex justify-center">
            <Image
              src={generateMapIcon(event.category)}
              alt="Event icon"
              width={40}
              height={40}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-center text-grass-30">
              {event.name}
            </h1>
            <Divider contained classNames="!my-3" />
          </div>

          <div className="flex flex-col gap-1">
            {event.category === EventCategoryEnum.TOURNAMENT && (
              <div className="flex items-center gap-3">
                <div className="w-3 flex flex-col items-center">
                  <i className="fa-solid fa-calendar-days text-grass-50" />
                </div>
                <p className="text-sm">
                  {event.date ? format(new Date(event.date), DATE_FORMAT) : "-"}
                </p>
              </div>
            )}
            {event.category === EventCategoryEnum.CAMP && (
              <div className="flex items-center gap-3">
                <div className="w-3 flex flex-col items-center">
                  <i className="fa-solid fa-calendar-days text-grass-50" />
                </div>
                <p className="text-sm">
                  {event.dateRange
                    ? `${format(
                        new Date(event.dateRange[0] as Date),
                        DATE_FORMAT
                      )} - ${format(
                        new Date(event.dateRange[1] as Date),
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
            ].includes(event.category) && (
              <div className="flex items-center gap-3">
                <div className="w-3 flex flex-col items-center">
                  <i className="fa-solid fa-child-reaching text-grass-50" />
                </div>
                <p className="text-sm">
                  {event.ageCategories
                    ? event.ageCategories.join(", ").replace("9999", "Open")
                    : "-"}
                </p>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="w-3 flex flex-col items-center">
                <i className="fa-solid fa-coins text-grass-50" />
              </div>
              <p className="text-sm">
                {event.price} {currentCurrencySign}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 flex flex-col items-center">
                <i className="fa-solid fa-location-dot text-grass-50" />
              </div>
              <p className="text-sm">{event?.location.addressName}</p>
            </div>
          </div>

          <div className="mt-auto self-center mb-2">
            <Button
              asLink
              href={paths.Event(event.id)}
              text="Więcej!"
              classNames="text-sm px-2 py-0 bg-grass-40 "
            />
          </div>
        </div>
      </div>
    </InfoBox>
  );
};

export default MapInfoBox;
