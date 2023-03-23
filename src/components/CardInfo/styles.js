import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const CardContainer = styled.View`
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 5px;
  background: rgba(243, 249, 254, 0.8);
`;

export const MainContainer = styled.View`
  flex-direction: row;
`;

export const UserContainer = styled.View`
  flex: 1;

  align-items: center;
  justify-content: space-between;
`;

export const ValueBox = styled.View`
  margin-top: -5px;
`;
export const ValuePlaceholder = styled.Text`
  font-size: ${RFValue(12)};
  font-family: ${Platform.OS === 'ios'
    ? 'Poppins_600SemiBold'
    : 'sans-serif-medium'};
  color: #15258b;
`;

export const UserImage = styled.View`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(10)}px;

  background-color: #ececec;

  justify-content: center;
  align-items: center;
`;

export const Picture = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(10)}px;

  justify-content: center;
  align-items: center;
`;

export const DetailsCardContainer = styled.View`
  flex: 3;
  height: 100px;
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${Platform.OS === 'ios'
    ? 'Poppins_600SemiBold'
    : 'sans-serif-medium'};
  color: #15258b;
`;

export const ValueContainer = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding: 10px 0;
`;

export const Value = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${Platform.OS === 'ios'
    ? 'Poppins_600SemiBold'
    : 'sans-serif-medium'};
  color: #15258b;
`;

export const TransactionsContainer = styled.View`
  margin-top: 5px;
`;

export const Transactions = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Platform.OS === 'ios' ? 'Poppins_400Regular' : 'sans-serif'};
  color: #0d0d19;
`;

export const Rating = styled.Text`
  font-size: ${RFValue(11)};
  font-family: ${Platform.OS === 'ios' ? 'Poppins_400Regular' : 'sans-serif'};
  color: #0d0d19;
  text-align: center;
`;

//Match screen card
export const StarRateContainer = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 5px 0;
`;

export const RateContainer = styled.View`
  width: 100%;

  justify-content: center;
  align-items: center;
`;

export const RatingText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Platform.OS === 'ios' ? 'Poppins_400Regular' : 'sans-serif'};
  color: #0d0d19;

  text-align: center;
`;

export const MatchScreenButtonContainer = styled.View`
  justify-content: center;
  align-items: flex-end;
  flex: 1;
  margin-bottom: 20px;
`;

export const MatchScreenCardButton = styled.TouchableOpacity`
  flex-direction: row;

  justify-content: center;
  align-items: center;

  padding: 5px;
  margin-top: 5px;
`;

export const MatchScreenTextBtn = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Platform.OS === 'ios' ? 'Poppins_400Regular' : 'sans-serif'};
  color: ${(props) => props.color || 'transparent'};

  padding-left: 3px;
`;

//My Request card
export const TransactionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const TransactionButtonText = styled.Text`
  font-size: ${RFValue(12)};
  font-family: ${Platform.OS === 'ios' ? 'Poppins_400Regular' : 'sans-serif'};
  color: #0d0d19;

  text-decoration: underline;
`;

export const MyRequestButtonContainer = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  padding-top: 5px;
`;

export const ActiveRequest = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Platform.OS === 'ios' ? 'Poppins_400Regular' : 'sans-serif'};
  color: ${(props) => props.color || '#101957'};
`;

export const MyRequestTextBtn = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${Platform.OS === 'ios' ? 'Poppins_400Regular' : 'sans-serif'};
  color: #9b0e1c;

  padding-left: 3px;
`;

//My Rating Card
export const DescriptionContainer = styled.View`
  padding: 5px 0;
  margin-top: 5px;
`;

export const Description = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${Platform.OS === 'ios' ? 'Poppins_400Regular' : 'sans-serif'};
  color: #3a3d43;
`;

// Exchange Bid Card
export const CardContainerBtn = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 5px;
  background: rgba(243, 249, 254, 0.8);
`;
