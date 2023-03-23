import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const VerySlowIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      {...props}
    >
      <G data-name="emoji sorrisin" transform="translate(1 1)">
        <Circle
          data-name="Elipse 27"
          cx={13}
          cy={13}
          r={13}
          fill={props.evaluationResponseTime === 1 ? '#ffd714' : 'none'}
          stroke="#ffd714"
          strokeWidth={2}
        />
        <G data-name="Grupo 43" transform="translate(6.5 8)" fill="#3a3d43">
          <Circle
            data-name="Elipse 28"
            cx={2}
            cy={2}
            r={2}
            transform="translate(-.5)"
          />
          <Circle
            data-name="Elipse 29"
            cx={2}
            cy={2}
            r={2}
            transform="translate(9.5)"
          />
          <Path
            data-name="Caminho 238"
            d="M6.522 9.327a8.063 8.063 0 015.736 2.376.811.811 0 01-1.147 1.147 6.642 6.642 0 00-9.176 0 .811.811 0 01-1.147-1.147 8.056 8.056 0 015.734-2.376z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default VerySlowIcon;
