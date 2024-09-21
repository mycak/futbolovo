import { FieldValues, UseFormRegister } from "react-hook-form";
import { customStyles } from "./styles";

const NumberInput = ({
  label,
  placeholder,
  name,
  register,
}: {
  label: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <div>
      <label className="flex flex-col price">
        <span className="text-grass-20">{label}</span>
        <input
          type="number"
          id="number"
          className={customStyles}
          placeholder={placeholder}
          {...register(name)}
        />
      </label>
    </div>
  );
};

export default NumberInput;
