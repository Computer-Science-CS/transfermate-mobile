import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px 10px 0 10px;
`;

export const TitleHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 10px;
`;

export const TextTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_700Bold"
    : "sans-serif-medium"};
  color: #c2c2c4;
`;

export const SubTitleContainer = styled.Pressable`
  flex-direction: row;

  align-items: center;
  margin-top: 15px;
  margin-left: 20px;
`;

export const IconsContainer = styled.View`
  justify-content: center;
  align-items: center;

  margin-right: 8px;
`;

export const SubTitleText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif"};
  color: #f4f4f4;
`;
