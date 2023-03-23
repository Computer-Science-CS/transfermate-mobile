import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px 10px 0 10px;
`;

export const WelcomeContainer = styled.View`
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const WelcomeText = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif-medium"};
  color: #c2c2c4;

  margin: 5px 0;
`;

export const TextSign = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${Platform.OS === "ios"
    ? "Poppins_300Light"
    : "sans-serif-light"};
  text-align: center;
  color: #eeecee;
`;

export const SignContainer = styled.View`
  justify-content: space-around;
  margin: 50px 0;
`;

export const TextPasswordParamsContainer = styled.View`
  width: 100%;

  padding: 10px;
`;

export const PasswordParamsText = styled.Text`
  font-size: ${RFValue(11)}px;
  font-family: ${Platform.OS === "ios"
    ? "Poppins_400Regular_Italic"
    : "sans-serif"};
  font-style: italic;
  color: #eeecee;
`;

export const BtnContainer = styled.View`
  justify-content: center;
  margin-top: 50px;

  justify-content: center;

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
`;
