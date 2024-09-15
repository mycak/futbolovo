import { categoryOptions } from "@/constants/inputOptions";
import SelectInput from "../atoms/inputs/SelectInput";
import LocalizationInput from "../atoms/inputs/LocalizationInput";
import SearchInput from "../atoms/inputs/SearchInput";
import DateRangeInput from "../atoms/inputs/DateInput";
import "react-datepicker/dist/react-datepicker.css";

const Filters = () => {
  return (
    <div className="flex justify-center gap-8 flex-wrap">
      <SelectInput
        label="Kategoria"
        instanceId="esa"
        id="category"
        name="category"
        isMulti
        closeMenuOnSelect={false}
        placeholder="Wybierz kategorię"
        options={categoryOptions}
      />
      <LocalizationInput label="Lokalizacja" placeholder="Szukaj" />
      <SearchInput label="Szukaj" placeholder="Wpisz frazę" />
      <DateRangeInput label="Zakres dat" />
    </div>
  );
};

export default Filters;
