import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const QuickIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27}
      height={27}
      viewBox="0 0 27 27"
      {...props}
    >
      <G data-name="emoji smiling" transform="translate(1.107 1)">
        <Circle
          data-name="Elipse 26"
          cx={12.5}
          cy={12.5}
          r={12.5}
          transform="translate(-.107)"
          fill={props.evaluationResponseTime === 5 ? "#ffd714" : "none"}
          stroke="#ffd714"
          strokeWidth={2}
        />
        <G data-name="Grupo 42" fill="#3a3d43">
          <Path
            data-name="Caminho 235"
            d="M19.75 10.255a.811.811 0 01-.81-.81 1.621 1.621 0 00-3.242 0 .81.81 0 01-1.621 0 3.242 3.242 0 016.483 0 .81.81 0 01-.81.81z"
          />
          <Path
            data-name="Caminho 236"
            d="M10.025 10.255a.811.811 0 01-.81-.81 1.621 1.621 0 10-3.242 0 .81.81 0 01-1.621 0 3.242 3.242 0 016.483 0 .81.81 0 01-.81.81z"
          />
        </G>
        <Path
          data-name="Caminho 237"
          d="M21.195 13.927a.755.755 0 00-.611-.323H4.346a.749.749 0 00-.611.321.845.845 0 00-.129.71 9.08 9.08 0 0017.711 0 .84.84 0 00-.122-.708z"
          fill="#ececec"
          stroke="#3a3d43"
        />
      </G>
    </Svg>
  );
};

export default QuickIcon;
