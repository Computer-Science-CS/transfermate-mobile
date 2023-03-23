import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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

export const LogoContainer = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const LogoContent = styled.View`
  width: ${RFPercentage(40)}px;
  height: ${RFPercentage(20)}px;
  justify-content: center;
  align-items: center;
  margin: 5%;
`;

export const TextContent = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif"};

  text-align: center;

  color: #c2c2c4;
`;
