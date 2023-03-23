import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

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

export const TextTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${Platform.OS === 'ios' ? 'Quicksand_400Regular' : 'sans-serif'};
  color: #eeecee;
`;

export const ButtonHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonHeader = styled.TouchableOpacity.attrs({
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
  font-family: ${Platform.OS === 'ios' ? 'Quicksand_400Regular' : 'sans-serif'};
  color: #c2c2c4;
  word-wrap: break-word;

`;

export const MainCoinContainer = styled.View`
  flex: 1;
  margin: 10px 0;
`;

export const CoinBtn = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  min-width: 40;
`;

export const CheckboxContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Checkbox = styled.View`
  height: ${RFValue(18)}px;
  width: ${RFValue(18)}px;
  border-radius: ${RFValue(5)}px;

  border: 2px solid #eeecee;

  justify-content: center;
  align-items: center;
`;

export const CoinTitleContainer = styled.View`
  height: ${RFValue(50)}px;
  width: ${RFValue(55)}px;

  justify-content: center;
  align-items: center;
`;

export const CoinTitle = styled.Text`
  font-size: ${RFValue(14)};
  font-family: ${Platform.OS === 'ios'
    ? 'Quicksand_300Light'
    : 'sans-serif-light'};
  color: #eeecee;
  word-wrap: break-word;
  text-align: center;
`;

export const CoinIconContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const CoinIcon = styled.View`
  height: ${RFValue(20)}px;
  width: ${RFValue(20)}px;
  border-radius: ${RFValue(9)}px;

  justify-content: center;
  align-items: center;

  background: #eeecee;
`;

export const CoinIconText = styled.Text`
  font-size: ${RFValue(11)};
  font-family: ${Platform.OS === 'ios' ? 'Quicksand_700Bold' : 'sans-serif'};
  color: #0b5393;
  font-weight: bold;
`;

export const BtnContainer = styled.View`
  padding: 10px 55px;
`;

export const TextBtn = styled.Text`
  font-size: ${RFValue(22)};
  word-wrap: break-word;
  font-family: ${Platform.OS === 'ios'
    ? 'Quicksand_600SemiBold'
    : 'sans-serif'};
  color: #eeecee;
`;
