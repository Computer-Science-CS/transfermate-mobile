import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const SlowIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27}
      height={27}
      viewBox="0 0 27 27"
      {...props}
    >
      <G data-name="emoji sorrisin" transform="translate(.325 1)">
        <Circle
          data-name="Elipse 27"
          cx={12.5}
          cy={12.5}
          r={12.5}
          transform="translate(.675)"
          fill={props.evaluationResponseTime === 2 ? '#ffd714' : 'none'}
          stroke="#ffd714"
          strokeWidth={2}
        />
        <G
          data-name="Grupo 43"
          transform="translate(6.06 6.811)"
          fill="#3a3d43"
        >
          <Circle
            data-name="Elipse 28"
            cx={2}
            cy={2}
            r={2}
            transform="translate(.655)"
          />
          <Circle
            data-name="Elipse 29"
            cx={2}
            cy={2}
            r={2}
            transform="translate(9.655)"
          />
          <Path
            data-name="Caminho 239"
            d="M1.111 9.421s2.975.28 5.932.855 5.897 1.445 5.897 1.445a.8.8 0 01.633.937l-.02.105a.8.8 0 01-.939.633l-5.897-1.368-5.931-.931a.8.8 0 01-.633-.938l.02-.105a.8.8 0 01.938-.633z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default SlowIcon;
