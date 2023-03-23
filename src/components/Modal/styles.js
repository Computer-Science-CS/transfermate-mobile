import styled from "styled-components/native";
import { TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

export const GradientContainer = styled(LinearGradient)`
  flex: 1;

  padding: 10px 10px 0 10px;
`;

export const ModalTitleContainer = styled.View`
  width: 100%;

  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ModalClose = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 0;

  padding: 10px;
`;

export const TextTitleModal = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif"};
  color: #eeecee;

  text-align: center;
`;

export const MainContainer = styled.View`
  flex: 1;
`;

export const CardContainer = styled.View`
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 5px;

  background: #fcfcfc;
`;

export const UserContainer = styled.View`
  width: 100%;

  flex-direction: row;
`;

export const ImageUserContainer = styled.View`
  flex: 1;

  align-items: center;
  justify-content: space-between;
`;

export const ModalPicture = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(10)}px;

  justify-content: center;
  align-items: center;
`;

export const ModalImage = styled.View`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(10)}px;

  justify-content: center;
  align-items: center;

  background-color: #ececec;
`;

export const StarContainer = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 5px 0;
`;

export const StarText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: #0d0d19;

  text-align: center;
`;

export const DetailsUserContainer = styled.View`
  flex: 3;
`;

export const NameUser = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Platform.OS === "ios"
    ? "Poppins_600SemiBold"
    : "sans-serif-medium"};
  color: #15258b;
`;

export const TransactionsContainer = styled.View`
  margin-top: 5px;
`;

export const Transactions = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Platform.OS === "ios" ? "Poppins_400Regular" : "sans-serif"};
  color: #0d0d19;
`;

//modalDetails
export const AboutContainer = styled.View`
  margin: 10px 0 5px;
  padding: 0 15px;
`;

export const AboutText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #0d0d19;

  padding: 5px 0;
`;

export const AboutDescriptionText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #0d0d19;
`;

export const DateContainer = styled.View`
  width: 100%;

  justify-content: center;
  align-items: flex-end;
`;

export const DateText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif-medium"};
  color: #0d0d19;
`;

export const ExchangeContainer = styled.View`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;

  background: #fcfcfc;
`;

export const ExchangeTextContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const ExchangeText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #101957;
`;

export const ExchangeValueContainer = styled.View`
  flex: 1;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const NoteContainer = styled.View`
  flex-direction: row;
  border-radius: 5px;

  background: #fcfcfc;
`;

export const InputContainer = styled.View`
  flex: 1;
`;

export const Input = styled.TextInput`
  height: ${RFValue(40)}px;

  font-size: ${RFValue(18)}px;
  color: #3a3d43;

  padding: 2.5px 8px;

  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right-width: 1px;
  border-right-color: #808eef;

  background: #fcfcfc;
`;

export const ModalIconContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  padding: 0 10px;

  justify-content: center;
  align-items: center;
`;

export const TextParamsContainer = styled.View`
  width: 100%;

  padding: 5px;
`;

export const ParamsText = styled.Text`
  font-size: ${RFValue(11)}px;
  font-family: ${Platform.OS === "ios"
    ? "Poppins_400Regular_Italic"
    : "sans-serif"};
  font-style: italic;
  color: red;
`;

//modalRating
export const StarRateContainer = styled.View`
  margin-top: 10px;
  padding: 5px;
`;

export const TextContainer = styled.Text`
  padding: 5px 0;
`;

export const TextRate = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${Platform.OS === "ios" ? "Quicksand_400Regular" : "sans-serif"};
  color: #3a3d43;
`;

export const Star = styled.View`
  flex-direction: row;
`;

export const ModalStar = styled(TouchableOpacity).attrs({
  activeOpacity: 0.5,
})`
  flex: 1;

  align-items: center;
  padding: 5px;
  margin: 1px;
`;

export const ModalStarText = styled.Text`
  font-size: ${RFValue(9)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif-medium"};
  color: #101957;
`;

export const EmojiRateContainer = styled.View`
  margin-top: 10px;
  padding: 5px;
`;

export const Emoji = styled.View`
  flex-direction: row;
`;

export const ModalEmoji = styled(TouchableOpacity).attrs({
  activeOpacity: 0.5,
})`
  flex: 1;

  justify-content: space-between;
  align-items: center;

  padding: 5px;
  margin: 1px;
`;

export const ModalIconText = styled.Text`
  font-size: ${RFValue(9)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif-medium"};
  color: #101957;

  text-align: center;
  margin-top: 5px;
`;

export const ModalBtnContainer = styled.View`
  justify-content: center;

  padding: 10px 0;
`;

export const ModalButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: ${RFValue(50)}px;

  justify-content: center;
  align-items: center;

  background: ${(props) => props.backgroundColor || "#00008B"};

  border-radius: 5px;
`;

export const TextBtn = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${Platform.OS === "ios"
    ? "Quicksand_600SemiBold"
    : "sans-serif"};
  color: #eeecee;
`;
