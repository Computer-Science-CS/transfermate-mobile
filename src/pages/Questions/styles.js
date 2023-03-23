import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, ScrollView } from "react-native";
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

export const QuestContainer = styled(ScrollView).attrs({
  contentContainerStyle: { flexGrow: 1 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const TextTitleContainer = styled.View`
  margin: 10px;
`;

export const TextTitleContent = styled.Text`
  font-size: ${RFValue(17)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: #c2c2c4;
`;

export const TextContentContainer = styled.View`
  margin: 5px 0px 5px 20px;
`;

export const TextContent = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: #eeecee;
`;

export const ContactUsContainer = styled.View`
  padding: 10px 0;
  margin-bottom: 10px;
`;

export const ContactUsText = styled.Text`
  font-size: ${RFValue(17)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: ${({ color }) => color || "#c2c2c4"};

  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  text-decoration-color: #808eef;
`;
export const ContactUs = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;
