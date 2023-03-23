import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextTitle, Options, CheckboxView } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

const Checkbox = ({ text, onChange, checked }) => {
  return (
    <Options onPress={() => onChange(!checked)} flex={1}>
      <TextTitle fontSize="18">{text}</TextTitle>
      {checked ? (
        <CheckboxView>
          <FontAwesome5 name="check" size={RFValue(10)} color="white" />
        </CheckboxView>
      ) : (
        <CheckboxView />
      )}
    </Options>
  );
};

export default Checkbox;
