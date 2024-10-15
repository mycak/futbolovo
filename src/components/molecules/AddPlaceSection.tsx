import React from "react";
import { Button, PageWrapper } from "../atoms";
import { paths } from "@/constants/paths";

const AddPlaceSection = () => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-max">
        <i className="fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto" />
      </div>
      <h3 className="text-3xl md:text-5xl text-center text-grass-20 mt-4 md:mt-8">
        Chcesz zaistnieć na mapie?
      </h3>
      <Button
        asLink
        size="lg"
        href={paths.EventAdd}
        classNames="mt-4 md:mt-8 mx-auto animate-shake block"
        text="Dodaj miejsce"
      />
      <p className="text-center text-ivory-150-60 text-lg md:text-2xl mt-4 md:mt-8">
        Dodaj swoje boisko, zorganizuj turniej, zaproponuj usługi lub stwórz
        obóz piłkarski! Udostępnij miejsce, które czeka na sportowców i drużyny
        z całej okolicy. Zareklamuj swoją ofertę,{" "}
        <span className="text-grass-50">
          daj się znaleźć i przyciągnij nowych uczestników!
        </span>
      </p>
    </PageWrapper>
  );
};

export default AddPlaceSection;
