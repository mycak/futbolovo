import React from "react";
import { Button, PageWrapper } from "../atoms";
import { paths } from "@/constants/paths";

const AddPlaceSection = () => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-max">
        <i className="fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto" />
      </div>
      <h2 className="text-5xl text-center text-grass-20 mt-8">
        Chcesz zaistnieć na mapie?
      </h2>
      <Button
        asLink
        href={paths.EventAdd}
        classNames="mt-8 px-5 py-3 text-3xl mt-8 mx-auto animate-shake block"
        text="Dodaj miejsce"
      />
      <p className="text-center text-ivory-150-60 text-2xl mt-8">
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
