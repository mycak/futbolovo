"use client";
import React, { useState } from "react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { Loader } from "@/components/atoms";
import { generateDummyPoster } from "@/utils";
import { AddEventInputs } from "@/schemas/addEventSchema";

const EventImage = ({ eventData }: { eventData: AddEventInputs }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative mx-auto w-max">
      {isLoading && eventData.image && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {eventData.image ? (
        <CldImage
          width="424"
          height="600"
          src={eventData?.image}
          sizes="100vw"
          alt={eventData?.name}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        <Image
          src={generateDummyPoster(eventData.category)}
          width={400}
          height={610}
          alt="Tournament"
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
};

export default EventImage;
