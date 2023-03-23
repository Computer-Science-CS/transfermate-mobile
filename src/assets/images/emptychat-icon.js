import * as React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { G, Path, Ellipse, Text, TSpan } from "react-native-svg";

const EmptyChatIcon = (props) => {
  return (
    <Svg
      width={RFValue(131)}
      height={RFValue(112)}
      viewBox="0 0 155.5 144.588"
      {...props}
    >
      <G data-name="Grupo 44" transform="translate(-116 -313)">
        <G data-name="chatting quadrado completp">
          <Path
            data-name="Caminho 5"
            d="M263.431 332H153.495A21.482 21.482 0 00132 353.425v96.022a5.574 5.574 0 008.8 4.518l30.616-21.772a15.021 15.021 0 018.746-2.79H247.5a21.482 21.482 0 0021.5-21.425V337.55a5.562 5.562 0 00-5.569-5.55zm-27.048 67.238h-64.341a5.55 5.55 0 110-11.1h64.34a5.55 5.55 0 110 11.1zm0-25.9h-64.341a5.55 5.55 0 110-11.1h64.34a5.55 5.55 0 110 11.1z"
            fill="none"
            stroke="#808eef"
            strokeWidth={5}
          />
        </G>
        <Ellipse
          data-name="Elipse 30"
          cx={26}
          cy={25}
          rx={26}
          ry={25}
          transform="translate(116 314)"
          fill="#808eef"
        />
        <Text
          data-name={0}
          transform="translate(142 352)"
          fill="#eeecee"
          fontSize={37}
          letterSpacing=".02em"
        >
          <TSpan x={-11.618} y={0}>
            {"0"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
};

export default EmptyChatIcon;
