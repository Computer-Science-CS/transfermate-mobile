import styled from "styled-components/native";
import { FlatList, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px 10px 0 10px;
`;

export const TitleHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: #808eef;

  margin-bottom: 10px;
`;

export const BtnHeaderMenu = styled(Pressable).attrs({})`
  flex: 1;

  justify-content: center;
  align-items: center;

  padding: 5px 0px;
`;

export const TextTitle = styled.Text`
  font-size: ${RFValue(16)};
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #eeecee;

  text-align: center;
`;

export const ButtonHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const IconsHeaderContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${RFValue(110)}px;

  flex-direction: row;

  justify-content: space-around;
  align-items: center;
  padding: 5px;

  background: rgba(0, 19, 135, 0.3);
`;

export const TextButtonHeader = styled.Text`
  font-size: ${RFValue(16)};
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #c2c2c4;
`;

export const ExchangeListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ListContainer = styled(FlatList).attrs({
  contentContainerStyle: { flexGrow: 1 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const EmptyIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const EmptyTextContainer = styled.View`
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${(props) =>
    Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: ${(props) => props.color || "#eeecee"};

  padding: 5px;
  text-align: center;

  text-decoration: ${(props) => props.textDecoration || "none"};
  text-decoration-color: #808eef;
`;

// Order and filter

export const OrderContainer = styled.View`
  height: 100%;
  padding: 10px;
  position: absolute;
  left: 0;

  background: #001387;
`;

export const TitleOrderContainer = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: #808eef;

  padding: 5px 0;
  margin-bottom: 10px;
`;

export const TextTitleOrder = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif-medium"};
  color: #808eef;
`;

export const ModalClose = styled.Pressable`
  padding-left: ${({ paddingLeft }) => paddingLeft || 0}px;
  padding-right: ${({ paddingRight }) => paddingRight || 0}px;
`;

export const FilteredContainer = styled.View`
  height: 100%;
  padding: 10px;
  position: absolute;
  right: 0;

  background: #001387;
`;

export const OptionsContainer = styled.View`
  padding: 5px;
  margin-bottom: 15px;
`;

export const Options = styled.TouchableOpacity`
  margin: 2.5px;
`;

export const TextOptionsTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif"};
  font-weight: bold;
  color: #808eef;
`;

export const InputSearch = styled.TextInput`
  height: ${RFValue(30)}px;
  border-radius: ${RFValue(5)}px;

  padding: 2.5px 5px;
  margin-top: 5px;

  border: 1px solid #101957;

  background: #fcfcfc;
`;

export const Star = styled.View`
  flex-direction: row;
`;

export const ModalStar = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  margin: 5px;
`;
