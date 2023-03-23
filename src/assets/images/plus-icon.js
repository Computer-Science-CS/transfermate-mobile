import * as React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { Path, G, Circle } from "react-native-svg";

const PlusIcon = (props) => {
  return (
    <Svg
      width={RFValue(40)}
      height={RFValue(40)}
      viewBox="0 0 50 50"
      {...props}
    >
      <Path
        data-name="Linha 4"
        fill="none"
        stroke="#001387"
        strokeLinecap="round"
        strokeWidth={3}
        d="M25 13v25"
      />
      <Path
        data-name="Linha 5"
        fill="none"
        stroke="#001387"
        strokeLinecap="round"
        strokeWidth={3}
        d="M14 25h22"
      />
      <G data-name="Elipse 6" fill="none" stroke="#001387">
        <Circle cx={25} cy={25} r={25} stroke="none" />
        <Circle cx={25} cy={25} r={24.5} />
      </G>
    </Svg>
  );
};

export default PlusIcon;
