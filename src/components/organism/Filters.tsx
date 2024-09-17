import "react-datepicker/dist/react-datepicker.css";
import { categoryOptions } from "@/constants/inputOptions";
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
import { LocationInputState } from "@/types/common";

type MapInputs = {
  categories: {
    value: string;
    label: string;
  }[];
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
    const rangeCategories = ["tournaments", "camps"];
    const subscription = watch(({ categories }) => {
      if (
        rangeCategories.some((item) =>
          categories?.map((item) => item?.value).includes(item)
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
        className="flex justify-center gap-x-8 gap-y-2 "
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
            disabled={dateRangeDisabled}
            setValue={setValue as unknown as UseFormSetValue<FieldValues>}
          />
          <p className="text-sm text-grass-50">
            Dotyczy jedynie kategorii obozów lub turniejów.
          </p>
        </div>
        <SearchInput
          label="Szukaj"
          placeholder="Wpisz frazę"
          setValue={setValue as unknown as UseFormSetValue<FieldValues>}
          name="search"
        />
        <Button
          classNames="h-10 self-center mt-1 bg-grass-45 hover:bg-grass-0"
          type="icon"
          icon="search"
          onClick={onSubmit as unknown as SubmitHandler<FieldValues>}
        />
      </form>
    </PageWrapper>
  );
};

export default Filters;
