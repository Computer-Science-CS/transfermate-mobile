import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const GoodIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27}
      height={27}
      viewBox="0 0 27 27"
      {...props}
    >
      <G data-name="emoji sorrisin" transform="translate(.54 1)">
        <Circle
          data-name="Elipse 27"
          cx={12.5}
          cy={12.5}
          r={12.5}
          transform="translate(.46)"
          fill={props.evaluationResponseTime === 4 ? "#ffd714" : "none"}
          stroke="#ffd714"
          strokeWidth={2}
        />
        <G data-name="Grupo 43" transform="translate(6.96 8)" fill="#3a3d43">
          <Circle
            data-name="Elipse 28"
            cx={1.5}
            cy={1.5}
            r={1.5}
            transform="translate(.5)"
          />
          <Circle
            data-name="Elipse 29"
            cx={1.5}
            cy={1.5}
            r={1.5}
            transform="translate(9.5)"
          />
          <Path
            data-name="Caminho 238"
            d="M6.795 12.272A9.14 9.14 0 01.711 9.988a.78.78 0 010-1.1.97.97 0 011.25 0 6.925 6.925 0 009.244 0 .78.78 0 011.1 1.1 7.745 7.745 0 01-5.51 2.284z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default GoodIcon;
