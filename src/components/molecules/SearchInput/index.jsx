import { Input } from "@/components/atoms/Input/Input";
import { FaSearch } from "react-icons/fa";
import classes from "./SearchInput.module.css";

export default function SearchInput({
  setSearch,
  search,
  label,
  placeholder,
  inputClass,
  noBorder,
  rightIconGreenVariant,
  rightIconColor,
  rightIconClass,
}) {
  return (
    <Input
      value={search}
      setValue={setSearch}
      label={label}
      placeholder={placeholder}
      rightIconClass={rightIconClass}
      labelStyle={classes.labelClass}
      rightIcon={
        <FaSearch
          className="cursor-pointer"
          color={rightIconColor}
          size={19.01}
        />
      }
      noBorder={noBorder}
      inputClass={inputClass}
      rightIconGreenVariant={rightIconGreenVariant}
    />
  );
}
