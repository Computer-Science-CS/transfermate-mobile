import * as React from "react";
import Svg, { G, Circle, Rect } from "react-native-svg";

const ReasonableIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27}
      height={27}
      viewBox="0 0 27 27"
      {...props}
    >
      <G data-name="emoji sorrisin" transform="translate(.789 1)">
        <Circle
          data-name="Elipse 27"
          cx={12.5}
          cy={12.5}
          r={12.5}
          transform="translate(.211)"
          fill={props.evaluationResponseTime === 3 ? "#ffd714" : "none"}
          stroke="#ffd714"
          strokeWidth={2}
        />
        <G
          data-name="Grupo 43"
          transform="translate(6.711 8.571)"
          fill="#3a3d43"
        >
          <Circle data-name="Elipse 28" cx={1.5} cy={1.5} r={1.5} />
          <Circle
            data-name="Elipse 29"
            cx={1.5}
            cy={1.5}
            r={1.5}
            transform="translate(9)"
          />
          <Rect
            data-name="Ret\xE2ngulo 370"
            width={12}
            height={2}
            rx={1}
            transform="translate(0 8)"
          />
        </G>
      </G>
    </Svg>
  );
};

export default ReasonableIcon;
