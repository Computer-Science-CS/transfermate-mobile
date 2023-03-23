import styled from "styled-components/native";
import { Platform, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  /* padding: 10px; */
`;

export const HeaderChat = styled.View`
  flex-direction: row;

  border-bottom-width: 1px;
  border-bottom-color: #808eef;

  padding: 5px 0;
  margin: 0 10px;
  margin-bottom: 10px;
`;

export const ProfilePicture = styled.Image`
  width: ${RFValue(45)}px;
  height: ${RFValue(45)}px;
  border-radius: ${RFValue(10)}px;

  justify-content: center;
  align-items: center;
`;

export const UserImage = styled.View`
  width: ${RFValue(45)}px;
  height: ${RFValue(45)}px;
  border-radius: ${RFValue(10)}px;

  background-color: #ececec;

  justify-content: center;
  align-items: center;
`;

export const ContainerUser = styled.View`
  flex: 1;

  margin-left: 10px;
`;

export const TextTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif-medium"};
  color: #eeecee;
`;

export const TextStatus = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #eeecee;
`;

export const ProposeContainer = styled.View`
  margin: 0 10px;
`;

export const HeaderPropose = styled.View`
  background: rgba(243, 249, 254, 0.8);

  margin-bottom: 5px;

  border: 1.5px solid #101957;
  border-radius: 5px;
`;

export const FinishedTRansaction = styled.View`
  flex-direction: row;

  background: rgba(243, 249, 254, 0.8);

  padding: 5px;

  border: 1.5px solid #101957;
  border-radius: 5px;
`;

export const TextPropse = styled.Text`
  font-size: ${({ fontSize }) => fontSize || RFValue(14)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif-medium"};
  color: ${({ color }) => color || "#3a3d43"};

  margin-left: 5px;
`;

export const HeaderButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonAcceptExchange = styled(TouchableOpacity).attrs({
  activeOpacity: 0.5,
})`
  height: ${RFValue(30)}px;
  width: 40%;

  justify-content: center;
  align-items: center;
  background: ${(props) => props.background || "#01062A"};
  border-radius: 3px;
`;

export const ButtonAcceptExchangeText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #eeecee;
`;

export const ErrorText = styled.Text`
  font-size: ${RFValue(15)}px;
  font-style: italic;
  color: #ff2800;
  font-weight: bold;
  padding-left: 10px;
  margin-top: 5px;
`;

export const ContainerModalButtons = styled(View)`
  justify-content: center;

  padding: 10px 40px 10px;
`;

export const TextBtn = styled.Text.attrs(() => ({
  allowFontScaling: false,
}))`
  font-size: ${({ fontSize }) => fontSize || RFValue(22)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif"};
  color: #eeecee;
`;
