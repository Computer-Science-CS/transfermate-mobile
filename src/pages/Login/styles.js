import styled from "styled-components/native";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerLoading = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  background-color: rgba(16, 25, 87, 0.6);
  justify-content: center;
`;

export const TextBtn = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif"};
  color: #eeecee;
`;

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px;
  justify-content: space-between;
`;

export const LogoContainer = styled(Animated.View)`
  height: ${RFValue(120)}px;
  justify-content: center;
  align-items: center;
`;

export const LoginContainer = styled.View`
  justify-content: space-between;
`;

export const ForgotBtn = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  padding: 5px 10px;
  align-items: ${(props) => props.alignItems || "flex-end"};
`;

export const TextForgot = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${Platform.OS === "ios"
    ? "Poppins_400Regular_Italic"
    : "sans-serif"};
  font-style: italic;

  color: ${(props) => props.color || "#eeecee"};
`;

export const LoginWithContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px 45px;
`;

export const MainContainerLogins = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  height: ${RFValue(33)}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  background: ${(props) => props.backgroundColor || "#FFFFFF"};

  margin-bottom: ${({ marginBottom }) => marginBottom || 10}px;
  border-radius: 2px;
`;

export const LoginWithText = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: Roboto_500Medium;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
  color: ${(props) => props.color || "#777777"};
`;

export const BtnContainer = styled.View`
  justify-content: center;

  padding: 10px 55px;
`;
