"use client";
import { useEffect, useState } from "react";
import Select, { GroupBase, Props } from "react-select";
import { generateClassNames } from "./styles";

interface ExtendedProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  label: string;
}

const SelectInput = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  ...props
}: ExtendedProps<Option, IsMulti, Group>) => {
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <div className="flex flex-col">
      <label>
        <span className="mb-1 text-grass-20">{label}</span>
        <Select
          {...props}
          theme={(theme) => ({ ...theme, borderRadius: 0 })}
          id={id}
          unstyled
          classNamePrefix="react-select"
          hideSelectedOptions={false}
          classNames={generateClassNames()}
        />
      </label>
    </div>
  ) : null;
};

export default SelectInput;
