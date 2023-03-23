import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { Platform } from "react-native";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px 10px 0 10px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Platform.OS === "ios"
    ? "Poppins_600SemiBold"
    : "sans-serif-medium"};
  color: white;
  align-self: center;
  margin-bottom: 32px;
`;

export const BtnContainer = styled.View`
  justify-content: center;
   margin-top: 32px; 
  padding: 10px 55px;
`;

export const TextBtn = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif"};
  color: #eeecee;
`;

export const TextErros = styled.Text`
  font-size: 14px;
  color: red;
  margin-left: 8px;
  margin-bottom: 15px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const GradientButton = styled(LinearGradient)`
  height: ${RFValue(50)}px;

  justify-content: center;
  align-items: center;

  background: ${(props) => props.backgroundColor || "#101957"};
  width: 100%;
  border-radius: 5px;
  border-width: ${RFValue(0.5)}px;
  border-color: #001387;

  margin: 0 55px;
`;
