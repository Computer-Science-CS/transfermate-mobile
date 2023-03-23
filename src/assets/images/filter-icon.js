import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { G, Path, Circle } from "react-native-svg";

const FilterIcon = (props) => {
  return (
    <Svg
      width={RFValue(18)}
      height={RFValue(12)}
      viewBox="0 0 18 12"
      {...props}
    >
      <G data-name="Icone filtrar">
        <G data-name="Grupo 8" transform="translate(.5 5)">
          <Path
            data-name="Linha 12"
            fill="none"
            stroke="#c2c2c4"
            strokeLinecap="round"
            d="M0 1h17"
          />
          <Circle
            data-name="Elipse 12"
            cx={2}
            cy={2}
            r={2}
            transform="translate(10 -1)"
            fill="#c2c2c4"
          />
        </G>
        <G data-name="Grupo 9" transform="translate(.5 9)">
          <Path
            data-name="Linha 13"
            fill="none"
            stroke="#c2c2c4"
            strokeLinecap="round"
            d="M0 1h17"
          />
          <Circle
            data-name="Elipse 14"
            cx={2}
            cy={2}
            r={2}
            transform="translate(5 -1)"
            fill="#c2c2c4"
          />
        </G>
        <G data-name="Grupo 10" transform="translate(.5 1)">
          <Path
            data-name="Linha 10"
            fill="none"
            stroke="#c2c2c4"
            strokeLinecap="round"
            d="M0 1h17"
          />
          <Circle
            data-name="Elipse 13"
            cx={2}
            cy={2}
            r={2}
            transform="translate(1 -1)"
            fill="#c2c2c4"
          />
        </G>
      </G>
    </Svg>
  );
};

export default FilterIcon;
