"use client";
import { Button, Loader } from "@/components/atoms";
import { paths } from "@/constants/paths";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAddEventWizardStore } from "@/stores";

const AddEventConfirm = () => {
  const params = useSearchParams();
  const clearState = useAddEventWizardStore((state) => state.clearState);

  const endDate = params.get("endDate");
  const email = params.get("email");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => clearState(), []);

  if (!endDate && !email) return <Loader />;

  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold text-center text-grass-50 mb-6">
        Dziękujemy za dodanie wydarzenia!
      </h1>
      <div className="max-w-80 mx-auto">
        <p className="text-center">
          Twoje wydarzenie zostało pomyślnie zapisane w naszej bazie danych.
          Zostanie ono opublikowane po zatwierdzeniu przez administratora.
        </p>
        <p className="text-center py-4">
          Data wygaśnięcia wydarzenia:{" "}
          <span className="text-grass-40">{endDate}</span>
        </p>
        <p className="text-center">
          W ciągu 24 goidzn na adres{" "}
          <span className="text-grass-40">{email}</span> zostanie wysłane
          potwierdzenie publikacji wydarzenia po jego akceptacji. Jeśli masz
          jakiekolwiek pytania, skontaktuj się z nami.
        </p>
        <p className="text-center text-xl text-grass-50 pt-4">Stay tuned!</p>
      </div>
      <div className="flex justify-between mt-8">
        <Button
          classNames="h-[38px] text-xl bg-grass-45"
          variant="icon"
          icon="plus"
          text="Dodaj kolejne"
          asLink
          href={paths.EventAdd}
        />
        <Button
          classNames="h-[38px] bg-red-400 text-xl"
          text="Zakończ"
          variant="icon"
          icon="map"
          asLink
          href={paths.Map}
        />
      </div>
    </div>
  );
};

export default AddEventConfirm;
