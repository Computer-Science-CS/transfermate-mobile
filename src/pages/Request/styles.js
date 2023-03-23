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

export const RequestForm = styled.View`
  margin-top: 10px;
`;

export const InputContainer = styled.View`
  margin-top: 10px;

  border-width: ${RFValue(1.5)}px;
  border-color: ${(props) => props.borderColor || "#101957"};
  border-radius: 5px;
`;

export const InputDateContainer = styled.View`
  height: ${RFValue(42)}px;

  justify-content: center;

  margin-top: 10px;
  padding-left: 5px;

  border-width: ${RFValue(1.5)}px;
  border-color: #101957;
  border-radius: 5px;

  background: #ffffff;
`;

export const TextInputDate = styled.Text`
  font-size: ${RFValue(18)}px;
  color: #3a3d43;
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
