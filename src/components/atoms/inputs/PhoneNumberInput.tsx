import { FieldValues, UseFormRegister } from "react-hook-form";
import { customStyles } from "./styles";

const PhoneNumberInput = ({
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
      <label className="flex flex-col">
        <span className="text-grass-20">{label}</span>
        <input
          type="tel"
          id="tel"
          pattern="^\+48[0-9]{9}$"
          className={customStyles}
          placeholder={placeholder}
          {...register(name)}
        />
      </label>
    </div>
  );
};

export default PhoneNumberInput;
