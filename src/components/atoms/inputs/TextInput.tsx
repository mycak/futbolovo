import { FieldValues, UseFormRegister } from "react-hook-form";
import { customStyles } from "./styles";

const TextInput = ({
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
          type="text"
          id="text"
          className={customStyles}
          placeholder={placeholder}
          {...register(name)}
        />
      </label>
    </div>
  );
};

export default TextInput;
