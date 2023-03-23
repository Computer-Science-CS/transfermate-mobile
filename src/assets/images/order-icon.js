import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { G, Path } from "react-native-svg";

const OrderIcon = (props) => {
  return (
    <Svg
      width={RFValue(20)}
      height={RFValue(10)}
      viewBox="0 0 20 10"
      {...props}
    >
      <G
        data-name="Icone ordenar"
        fill="none"
        stroke="#c2c2c4"
        strokeLinecap="round"
        strokeWidth={2}
      >
        <Path data-name="Linha 10" d="M1 1h10" />
        <Path data-name="Linha 12" d="M1 5h14" />
        <Path data-name="Linha 13" d="M1 9h18" />
      </G>
    </Svg>
  );
};

export default OrderIcon;
