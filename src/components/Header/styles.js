import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex-direction: row;

  justify-content: space-between;

  background: #0b5393;

  padding: 10px 0;
`;

export const BtnBack = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  padding: 0 20px;
  border-radius: 5px;
`;

export const LogoContainer = styled.View`
  height: ${RFValue(50)}px;

  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const BtnProfile = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  padding: 0 15px;
  border-radius: 5px;
`;

export const DotProfile = styled.View`
  width: ${RFValue(14)}px;
  height: ${RFValue(14)}px;
  border-radius: ${RFValue(7)}px;

  background: #808eef;

  position: absolute;
  top: 0;
  left: 10px;
  z-index: 1;
`;

export const UserImage = styled.View`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(10)}px;

  background-color: #ececec;

  justify-content: center;
  align-items: center;
`;

export const ProfilePicture = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(10)}px;
`;

export const ModalContainer = styled.View`
  padding: 30px;
  width: 90%;
  height: 25%;
  align-self: center;
  justify-content: center;
  margin-top: 70%;
  z-index: 999;
  background-color: white;
  border-radius: 10px;
`;

export const Title = styled.Text`
  width: 100%;
  height: 100%;
  justify-content: center;
  
`;

export const ModalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: gray;
`;

export const ModalButtom = styled.TouchableOpacity`
  border: 1px solid gray;
  width: 45%;
  align-items: center;
  padding: 15px 0;
  border-radius: 10px;
`;

export const ModalButtonBox = styled.View`
  justify-content: space-between;
`;

export const ModalTitle = styled.Text`
  margin-bottom: 20%;
  font-size: 20px;
  font-weight: bold;
  color: #808eef;
  align-self: center;
`;

export const ModalOpacity = styled.TouchableOpacity`
  flex: 1;
  background:rgba(0, 0, 0, 0.6);
`;

