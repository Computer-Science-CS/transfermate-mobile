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

export const Container = styled.View`
  flex: 1;
  margin-top: 10px;
`;

export const TextContent = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: ${(props) => props.color || "#EEECEE"};

  text-decoration: ${(props) => props.textDecoration || "none"};
  text-decoration-color: #808eef;
`;

export const Input = styled.TextInput`
  height: ${RFValue(100)}px;

  font-size: ${RFValue(15)}px;
  color: #3a3d43;

  padding: 2.5px 8px;
  margin-top: 20px;

  border-width: ${RFValue(1.5)}px;
  border-color: ${(props) => props.borderColor || "#101957"};
  border-radius: 5px;

  background: #fcfcfc;
`;

export const PrintTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: #eeecee;

  margin-bottom: 10px;
`;

export const PrintContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Print = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: ${RFValue(55)}px;
  width: ${RFValue(85)}px;
  border-radius: ${RFValue(5)}px;

  justify-content: center;
  align-items: center;

  background: #fcfcfc;
  border: 2px solid #97969c;
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
