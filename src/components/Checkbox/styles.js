import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const TextTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_400Regular"
    : "sans-serif-light"};
  color: #eeeeee;
`;

export const Options = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 5px;
  margin: 2.5px;
`;

export const CheckboxView = styled.View`
  height: ${RFValue(20)}px;
  width: ${RFValue(20)}px;
  border-radius: ${RFValue(10)}px;

  border: 2px solid #eeecee;

  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;
