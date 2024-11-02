"use client";
import React, { useState } from "react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { Loader } from "@/components/atoms";
import { generateDummyPoster } from "@/utils";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { Event } from "@prisma/client";
import { AddEventInputs } from "@/schemas/addEventSchema";

const EventImage = ({
  eventData,
  classNames,
}: {
  eventData: Event | AddEventInputs;
  classNames?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { lng } = useParams();

  return (
    <div className={clsx("relative mx-auto max-w-full", classNames)}>
      {isLoading && eventData.image && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader lng={lng as string} />
        </div>
      )}

      {eventData.image ? (
        <CldImage
          width="424"
          priority
          height="600"
          src={eventData?.image}
          alt={eventData?.name}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      ) : (
        <Image
          src={generateDummyPoster(eventData.category)}
          width={400}
          height={610}
          priority
          alt={eventData?.name}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      )}
    </div>
  );
};

export default EventImage;
