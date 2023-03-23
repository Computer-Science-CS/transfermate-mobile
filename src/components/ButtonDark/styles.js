import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  height: ${RFValue(50)}px;

  justify-content: center;
  align-items: center;

  background: ${(props) => props.backgroundColor || "#101957"};

  border-radius: 5px;
  border-width: ${RFValue(0.5)}px;
  border-color: ${(props) => props.borderColor || "#000000"};
`;

export const GradientButton = styled(LinearGradient)`
  height: ${RFValue(50)}px;

  justify-content: center;
  align-items: center;

  background: ${(props) => props.backgroundColor || "#101957"};

  border-radius: 5px;
  border-width: ${RFValue(0.5)}px;
  border-color: #001387;

  margin: 0 55px;
`;
