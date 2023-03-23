import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px 10px 0 10px;
`;

export const TitleHeaderContainer = styled.View`
  flex-direction: row;

  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: #808eef;

  padding: 5px 0;
  margin-bottom: 10px;
`;

export const TextTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #eeecee;

  margin-left: 10px;
`;

export const SettingsContainer = styled.View`
  margin-bottom: 10px;
`;

export const TitleSettings = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: #c2c2c4;
`;

export const TextSettingsContainer = styled.View`
  flex-direction: row;

  padding: 5px 0;

  justify-content: space-between;
  align-items: center;
`;

export const TextSettingsContent = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: #eeecee;
`;
