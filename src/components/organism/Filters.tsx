"use client";
import "react-datepicker/dist/react-datepicker.css";
import { ageCategoryOptions, categoryOptions } from "@/constants/inputOptions";

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
  UseFormRegister,
  useWatch,
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
  const filters = useEventsStore((state) => state.filters);
  const { handleSubmit, control, setValue, register } = useForm<MapFilters>({
    values: filters,
  });
  const [dateRangeDisabled, setDateRangeDisabled] = useState<boolean>(false);
  const currentCategories = useWatch({ control, name: "categories" });

  useEffect(() => {
    const rangeCategories: EventCategoryEnum[] = [
      EventCategoryEnum.TOURNAMENT,
      EventCategoryEnum.CAMP,
      EventCategoryEnum.MATCH,
    ];

    if (
      rangeCategories.some((rangeCategory) =>
        currentCategories?.map((item) => item).includes(rangeCategory)
      ) ||
      !currentCategories?.length
    ) {
      setDateRangeDisabled(false);
    } else {
      setDateRangeDisabled(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategories]);

  const onSubmit: SubmitHandler<MapFilters> = (data) => setFilters(data);

  const onLocationChange = (data: LocationInputState) => {
    const { latitude, longitude } = data;
    setValue("coords", { latitude, longitude });
  };

  return (
    <PageWrapper classNames="mb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
      >
        <div className="flex justify-center gap-x-8 gap-y-2 flex-wrap">
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
            currentCoords={filters.coords}
          />

          <div className="relative">
            <DateRangeInput
              name="dateRange"
              label="Zakres dat"
              placeholder="Wybierz"
              disabled={dateRangeDisabled}
              control={control as unknown as Control<FieldValues>}
            />
            {dateRangeDisabled && (
              <p className="absolute top-16 text-sm text-grass-50">
                Dotyczy kategorii obozów, meczy lub turniejów.
              </p>
            )}
          </div>
          <div className="relative">
            <SelectInput
              control={control as unknown as Control<FieldValues>}
              label="Kategoria wiekowa"
              id="ageCategories"
              name="ageCategories"
              isMulti
              closeMenuOnSelect={false}
              placeholder="Wybierz"
              options={ageCategoryOptions}
            />
          </div>
          <SearchInput
            label="Szukaj"
            placeholder="Wpisz frazę"
            register={register as unknown as UseFormRegister<FieldValues>}
            name="search"
          />
        </div>
        <div className="flex gap-4 mx-auto">
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
