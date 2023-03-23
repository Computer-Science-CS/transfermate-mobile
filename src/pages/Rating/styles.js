import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";

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

export const HeaderContainer = styled.View`
  flex-direction: row;

  align-items: center;
`;

export const IconsHeaderContainer = styled.View`
  padding: 5px 5px 5px 0;
`;

export const TextButtonHeader = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #c2c2c4;
`;

export const RatingListContainer = styled(FlatList).attrs({
  contentContainerStyle: { flexGrow: 1 },
  bounces: false,
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const ExchangeListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyTextContainer = styled.View`
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${(props) =>
    Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: ${(props) => props.color || "#eeecee"};

  padding: 5px;
  text-align: center;

  text-decoration: ${(props) => props.textDecoration || "none"};
  text-decoration-color: #808eef;
`;
