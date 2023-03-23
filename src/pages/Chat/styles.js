import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px 10px 0 10px;
`;

export const TitleHeaderContainer = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: #808eef;

  padding: 2px 0;
  margin-bottom: 10px;
`;

export const TextTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #eeecee;
`;

export const SearchContainer = styled.View`
  flex-direction: row;

  padding: 2px 0;
  margin-bottom: 5px;
  align-items: center;

  border-width: ${RFValue(1.5)}px;
  border-color: #101957;

  border-radius: 5px;

  background: #fcfcfc;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 100%;
  font-size: 18px;
  color: #3a3d43;
  padding-left: 5px;
  padding-right: 10px;
  border-radius: 5px;
  border-top-right-radius: ${(props) => props.borderTopRightRadius || 5}px;
  background: #fcfcfc;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: 0 5px;
`;

export const TextHeader = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #c2c2c4;
`;

export const ListContainer = styled(FlatList).attrs({
  contentContainerStyle: { flexGrow: 1 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const ExchangeListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const EmptyTextContainer = styled.View`
  padding: 10px 0;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: ${({ color }) => color || "#eeecee"};

  text-align: center;

  text-decoration: ${(props) => props.textDecoration || "none"};
  text-decoration-color: #808eef;
`;

export const ContainerLoader = styled.View`
  margin-top: 10px;
`;

//CardMensagem
export const ContainerMessage = styled.View`
  flex-direction: row;

  border-bottom-width: 1px;
  border-bottom-color: #808eef;
`;

export const MessageUserPhoto = styled.View`
  padding: 10px;

  justify-content: center;
  align-items: center;
`;

export const ProfilePicture = styled.Image`
  width: ${RFValue(45)}px;
  height: ${RFValue(45)}px;
  border-radius: ${RFValue(10)}px;

  background-color: #ececec;

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

export const ContainerMessageUser = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;

  justify-content: center;
  align-items: flex-start;
`;

export const MessageUserName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: #c2c2c4;
`;

export const MessagePreview = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: #c2c2c4;
`;
