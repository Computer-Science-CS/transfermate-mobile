import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  height: ${RFValue(50)}px;

  justify-content: center;
  align-items: center;

  background: ${(props) => props.backgroundColor || "#01062A"};

  border-radius: 5px;
  border-width: ${RFValue(0.5)}px;
`;
