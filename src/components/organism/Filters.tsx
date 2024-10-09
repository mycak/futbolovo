"use client";
import "react-datepicker/dist/react-datepicker.css";
import { categoryOptions } from "@/constants/inputOptions";
import { addDays } from "date-fns";

import {
  SelectInput,
  LocalizationInput,
  SearchInput,
  DateRangeInput,
  PageWrapper,
  Button,
} from "../atoms";
import {
  Control,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormSetValue,
} from "react-hook-form";
import { useEffect, useState } from "react";
import {
  EventCategoryEnum,
  LocationInputState,
  MapFilters,
} from "@/types/common";
import { paths } from "@/constants/paths";
import { useEventsStore } from "@/stores";

const Filters = () => {
  const setFilters = useEventsStore((state) => state.setFilters);

  const { handleSubmit, watch, control, setValue } = useForm<MapFilters>();
  const [dateRangeDisabled, setDateRangeDisabled] = useState<boolean>(false);

  useEffect(() => {
    const rangeCategories: EventCategoryEnum[] = [
      EventCategoryEnum.TOURNAMENT,
      EventCategoryEnum.CAMP,
      EventCategoryEnum.MATCH,
    ];
    const subscription = watch(({ categories }) => {
      if (
        rangeCategories.some((rangeCategory) =>
          categories?.map((item) => item).includes(rangeCategory)
        ) ||
        categories?.length === 0
      ) {
        setDateRangeDisabled(false);
      } else {
        setDateRangeDisabled(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<MapFilters> = (data) => setFilters(data);

  const onLocationChange = (data: LocationInputState) => {
    const { latitude, longitude } = data;
    setValue("coords", { latitude, longitude });
  };

  return (
    <PageWrapper classNames="mb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center gap-x-8 gap-y-2 flex-wrap"
      >
        <SelectInput
          control={control as unknown as Control<FieldValues>}
          label="Kategoria"
          id="categories"
          name="categories"
          isMulti
          closeMenuOnSelect={false}
          placeholder="Wybierz kategorię"
          options={categoryOptions}
        />
        <LocalizationInput
          label="Lokalizacja"
          placeholder="Miasto, województwo, ulica"
          onChangeCallback={onLocationChange}
        />

        <div className="relative">
          <DateRangeInput
            name="dateRange"
            label="Zakres dat"
            placeholder="Wybierz"
            startDate={new Date()}
            endDate={addDays(new Date(), 14)}
            disabled={dateRangeDisabled}
            control={control as unknown as Control<FieldValues>}
          />
          {dateRangeDisabled && (
            <p className="absolute top-16 text-sm text-grass-50">
              Dotyczy kategorii obozów, meczy lub turniejów.
            </p>
          )}
        </div>
        <SearchInput
          label="Szukaj"
          placeholder="Wpisz frazę"
          setValue={setValue as unknown as UseFormSetValue<FieldValues>}
          name="search"
        />
        <div className="flex gap-4">
          <Button
            classNames="h-[38px] mt-6 text-xl pl-3 pr-5 bg-red-400"
            variant="icon"
            icon="add"
            text="Dodaj"
            asLink
            href={paths.EventAdd}
          />
          <Button
            classNames="h-[38px] mt-6 bg-grass-45 text-xl pl-3 pr-5"
            variant="icon"
            icon="search"
            text="Szukaj"
            type="submit"
          />
        </div>
      </form>
    </PageWrapper>
  );
};

export default Filters;
