import styled from "styled-components/native";
import CurrencyInput from "react-native-currency-input";
import { RFValue } from "react-native-responsive-fontsize";

export const InputContainer = styled.View`
  margin-top: 10px;

  border-width: ${RFValue(1.5)}px;
  border-color: ${(props) => props.borderColor || "#101957"};
  border-radius: 5px;
  background: #808eef;
`;

export const Input = styled.TextInput`
  height: ${RFValue(40)}px;

  font-size: ${RFValue(18)}px;
  color: #3a3d43;

  padding: 2.5px 8px;

  border-radius: 5px;
  border-top-right-radius: ${(props) => props.borderTopRightRadius || 5}px;

  background: #fcfcfc;
`;

export const InputCurrency = styled(CurrencyInput)`
  height: ${RFValue(40)}px;

  font-size: ${RFValue(18)}px;
  color: #3a3d43;

  padding: 2.5px 8px;

  border-radius: 5px;
  border-top-right-radius: ${(props) => props.borderTopRightRadius || 5}px;

  background: #fcfcfc;
`;
