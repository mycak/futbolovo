import "react-datepicker/dist/react-datepicker.css";
import { categoryOptions } from "@/constants/inputOptions";
import { startOfMonth } from "date-fns";

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
import { EventCategoryEnum, LocationInputState } from "@/types/common";
import { paths } from "@/constants/paths";

type MapInputs = {
  categories: EventCategoryEnum[];
  coords: {
    latitude: number | undefined;
    longitude: number | undefined;
  };
  search: string;
  dateRange: [Date | null, Date | null];
};

const Filters = () => {
  const { handleSubmit, watch, control, setValue } = useForm<MapInputs>();
  const [dateRangeDisabled, setDateRangeDisabled] = useState<boolean>(false);

  useEffect(() => {
    const rangeCategories: EventCategoryEnum[] = [
      EventCategoryEnum.TOURNAMENT,
      EventCategoryEnum.CAMP,
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

  const onSubmit: SubmitHandler<MapInputs> = (data) => console.log(data);

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

        <div>
          <DateRangeInput
            name="dateRange"
            label="Zakres dat"
            startDate={startOfMonth(new Date())}
            disabled={dateRangeDisabled}
            control={control as unknown as Control<FieldValues>}
          />
          {dateRangeDisabled && (
            <p className="text-sm text-grass-50">
              Dotyczy jedynie kategorii obozów lub turniejów.
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
            classNames="h-[38px] mt-6 bg-grass-45 text-xl flex items-center pl-3 pr-5 opacity-90 transition-all duration-300 hover:opacity-100"
            variant="icon"
            icon="search"
            text="Szukaj"
            type="submit"
          />
          <Button
            classNames="h-[38px] mt-6 bg-grass-45 text-xl flex items-center pl-3 pr-5 opacity-90 transition-all duration-300 bg-red-400 hover:opacity-100"
            variant="icon"
            icon="add"
            text="Dodaj"
            asLink
            href={paths.EventAdd}
          />
        </div>
      </form>
    </PageWrapper>
  );
};

export default Filters;
