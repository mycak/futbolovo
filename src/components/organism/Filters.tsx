import "react-datepicker/dist/react-datepicker.css";
import { categoryOptions } from "@/constants/inputOptions";
import {
  SelectInput,
  LocalizationInput,
  SearchInput,
  DateRangeInput,
} from "../atoms";
import {
  Control,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormSetValue,
} from "react-hook-form";
import { useEffect } from "react";
import { LocationInputState } from "@/types/common";

type MapInputs = {
  categories: string[];
  coords: {
    latitude: number | undefined;
    longitude: number | undefined;
  };
  search: string;
  dateRange: [Date | null, Date | null];
};

const Filters = () => {
  const { handleSubmit, watch, control, setValue } = useForm<MapInputs>();

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<MapInputs> = (data) => console.log(data);

  const onLocationChange = (data: LocationInputState) => {
    const { latitude, longitude } = data;
    setValue("coords", { latitude, longitude });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center gap-8 flex-wrap"
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
        placeholder="Szukaj"
        onChangeCallback={onLocationChange}
      />
      <SearchInput
        label="Szukaj"
        placeholder="Wpisz frazę"
        setValue={setValue as unknown as UseFormSetValue<FieldValues>}
        name="search"
      />
      <DateRangeInput
        name="dateRange"
        label="Zakres dat"
        disabled={false}
        setValue={setValue as unknown as UseFormSetValue<FieldValues>}
      />
    </form>
  );
};

export default Filters;
