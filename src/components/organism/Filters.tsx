import { categoryOptions } from "@/constants/inputOptions";
import SelectInput from "../atoms/inputs/SelectInput";
import LocalizationInput from "../atoms/inputs/LocalizationInput";

const Filters = () => {
  return (
    <div className="flex justify-center gap-8">
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
    </div>
  );
};

export default Filters;
