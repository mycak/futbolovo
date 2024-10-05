"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { InfoBox } from "@react-google-maps/api";
import { generateMapIcon, translateEventType } from "@/utils";
import { format } from "date-fns";
import { BulkEvents, EventCategoryEnum } from "@/types/common";
import { currentCurrencySign, DATE_FORMAT } from "@/constants/common";
import clsx from "clsx";
import Image from "next/image";
import { paths } from "@/constants/paths";
import { Button } from "@/components/atoms";

const MapInfoBoxExtended = ({
  events,
  close,
  mapRef,
}: {
  events: BulkEvents;
  close: () => void;
  mapRef: MutableRefObject<google.maps.Map | null>;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  // InfoBox options for positioning and disabling default close button
  const boxOptions = {
    enableEventPropagation: true,
    pixelOffset: new google.maps.Size(-150, -50),
    closeBoxURL: "", // Remove default close icon
  };

  // Effect to handle showing and hiding the InfoBox with animation
  useEffect(() => {
    if (events.items?.length > 0) {
      setIsRendered(true);
      timeoutId.current = setTimeout(() => setIsVisible(true), 10); // Trigger fade-in animation after a small delay
    } else {
      setIsVisible(false);
      timeoutId.current = setTimeout(() => setIsRendered(false), 300); // Remove component from DOM after animation
    }

    return () => clearTimeout(timeoutId.current);
  }, [events.items]);

  const handleClose = () => {
    setIsVisible(false);
    timeoutId.current = setTimeout(() => {
      close();
      setIsRendered(false);
    }, 300);
  };

  const handleMouseEnter = () => {
    // Disable map dragging when mouse is over the infobox
    mapRef.current?.setOptions({
      scrollwheel: false,
    });
  };

  const handleMouseLeave = () => {
    // Enable map dragging when mouse leaves the infobox
    mapRef.current?.setOptions({
      scrollwheel: true,
    });
  };

  if (!isRendered) return null;

  return (
    <InfoBox
      position={new google.maps.LatLng(events.position as google.maps.LatLng)}
      options={boxOptions}
      onCloseClick={handleClose}
    >
      <div
        className="max-h-96 overflow-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-labelledby="infoBox-title"
        role="dialog"
      >
        <div
          className={clsx(
            "relative flex flex-col gap-1 border border-grass-50 rounded-sm bg-emerald-900 p-4 w-80 text-ivory-150 ",
            "hover:cursor-pointer focus:outline-none focus:border-grass-40",
            "transition-all duration-300 ease-out",
            isVisible ? "opacity-95 " : "opacity-0"
          )}
        >
          <button
            className="absolute top-2 right-2 text-ivory-150 hover:text-grass-30"
            onClick={handleClose}
          >
            &#10005;
          </button>
          <div>
            {events.items.map((event) => (
              <div key={event.id}>
                <div className="flex justify-center">
                  <Image
                    src={generateMapIcon(event.category)}
                    alt="Event icon"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-center text-grass-50">
                    {event.name}
                  </h1>
                  <p className="text-center text-sm text-grass-30 mb-1">
                    ({translateEventType(event.category)})
                  </p>
                </div>

                {event.category === EventCategoryEnum.TOURNAMENT && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 flex flex-col items-center">
                      <i className="fa-solid fa-calendar-days text-grass-50" />
                    </div>
                    <p className="text-sm">
                      {event.date
                        ? format(new Date(event.date), DATE_FORMAT)
                        : "-"}
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

                <div className="flex justify-center">
                  <Button
                    asLink
                    href={paths.Map}
                    text="Więcej!"
                    classNames="mt-2 text-sm px-2 py-0 bg-grass-40"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InfoBox>
  );
};

export default MapInfoBoxExtended;
