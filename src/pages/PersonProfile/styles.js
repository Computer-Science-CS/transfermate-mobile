import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px 10px 0 10px;
`;

export const PictureContainer = styled.View`
  padding: 5px 0;
  margin-bottom: 10px;

  justify-content: center;
  align-items: center;
`;

export const PictureImage = styled.Image`
  width: ${RFValue(120)}px;
  height: ${RFValue(120)}px;
  border-radius: ${RFValue(20)}px;
`;

export const Picture = styled.View`
  width: ${RFValue(119)}px;
  height: ${RFValue(119)}px;
  border-radius: ${RFValue(20)}px;

  background: #eeeeee;

  justify-content: center;
  align-items: center;
`;

export const ChangeImage = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  position: absolute;
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  border-radius: ${RFValue(15)}px;

  top: -5px;
  right: -10px;
  justify-content: center;
  align-items: center;

  background-color: #0b5393;
`;

export const FormContainer = styled.View`
  margin-top: 10px;
`;

export const InputContainer = styled.View`
  margin-bottom: 10px;

  border-width: ${RFValue(1.5)}px;
  border-color: ${(props) => props.borderColor || "#101957"};
  border-radius: 5px;
  background: #808eef;
`;

export const Input = styled.TextInput`
  height: ${({ height }) => height || RFValue(40)}px;

  font-size: ${RFValue(20)}px;
  color: #3a3d43;

  padding: 2.5px 8px;

  border-radius: 5px;
  border-top-right-radius: ${(props) => props.borderTopRightRadius || 5}px;

  background: #fcfcfc;
`;

export const BtnContainer = styled.View`
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
