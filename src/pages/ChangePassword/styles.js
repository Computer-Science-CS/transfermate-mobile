import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px 10px 0 10px;
`;

export const TitleHeaderContainer = styled.View`
  align-items: flex-start;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: #808eef;

  padding: 5px 0;
  margin-bottom: 10px;
`;

export const TextTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #eeecee;
`;

export const TitleContainer = styled.View`
  margin-top: ${(props) => props.marginTop || 5}%;
  margin-left: 5%;
  margin-right: 5%;
  border-bottom-color: ${(props) => props.borderBottomColor || "null"};
  border-bottom-width: ${(props) => props.borderBottomWidth || 0}px;
  padding-bottom: 1%;
`;

export const PasswordContainer = styled.View`
  margin-top: 10px;
`;

export const BtnContainer = styled.View`
  justify-content: center;

  padding: 10px 0;
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
`;
