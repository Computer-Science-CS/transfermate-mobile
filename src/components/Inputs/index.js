import React from "react";

import { InputContainer, Input, InputCurrency, MaskInput } from "./styles";

export function InputField({
  placeholder,
  marginTop,
  borderColor,
  multiline,
  borderTopRightRadius,
  keyboardType,
  onChangeText,
  secureTextEntry,
  autoCapitalize,
  onBlur,
  onFocus,
  value,
  ref,
  onContentSizeChange,
  typeInput,
}) {
  const renderInput = () => {
    switch (typeInput) {
      case "currency":
        return (
          <InputCurrency
            placeholder={placeholder}
            placeholderTextColor="#5E5E5E"
            value={value}
            onChangeValue={onChangeText}
            delimiter=","
            separator="."
            precision={2}
          />
        );

      case "masked":
        return <></>;

      default:
        return (
          <Input
            borderColor={borderColor}
            placeholder={placeholder}
            placeholderTextColor="#5E5E5E"
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            borderTopRightRadius={borderTopRightRadius}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            onFocus={onFocus}
            onContentSizeChange={onContentSizeChange}
            fowardRef={ref}
          />
        );
    }
  };

  return <InputContainer>{renderInput()}</InputContainer>;
}
