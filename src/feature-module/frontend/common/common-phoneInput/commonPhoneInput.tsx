import React, { useCallback, useMemo } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type CommonPhoneInputProps = {
  value?: string;
  onChange?: (value?: string) => void;
  inputClassName?: string;
  containerClassName?: string;
  placeholder?: string;
};

const CommonPhoneInput: React.FC<CommonPhoneInputProps> = ({
  value,
  onChange,
  inputClassName = "",
  placeholder = "Enter phone number",
}) => {
  const handleChange = useCallback((val: string | undefined) => {
    if (onChange) {
      onChange(val);
    }
  }, [onChange]);

  const inputComponent = useMemo(() => {
    return (props: any) => (
      <input
        {...props}
        className={inputClassName ? `phone-input ${inputClassName}` : "phone-input"}
        autoComplete="tel"
      />
    );
  }, [inputClassName]);

  return (
    <div>
      <PhoneInput
        defaultCountry="US"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        inputComponent={inputComponent}
        international
        countryCallingCodeEditable={false}
      />
    </div>
  );
};

export default CommonPhoneInput;
