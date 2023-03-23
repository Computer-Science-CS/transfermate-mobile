import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { G, Path } from "react-native-svg";

const HelpIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={RFValue(17)}
      height={RFValue(17)}
      viewBox="0 0 15 15"
    >
      <G data-name="help full" transform="translate(0.005)">
        <Path
          data-name="Caminho 24"
          d="M14.978,7.494A7.489,7.489,0,1,0,0,7.494a7.2,7.2,0,0,0,7.489,7.494,7.558,7.558,0,0,0,3.273-.779c1.588-.124,4.032.917,4.216.779.143-.255-.663-2.213-.937-3.818a7.349,7.349,0,0,0,.937-3.675ZM6.34,5.75H5.191a2.3,2.3,0,1,1,3.849,1.7l-.976.894v.9H6.915v-1.4L8.265,6.6a1.138,1.138,0,0,0,.374-.849,1.149,1.149,0,1,0-2.3,0Zm.575,4.638H8.064v1.15H6.915Zm0,0"
          transform="translate(0 0)"
          fill="#eeecee"
        />
      </G>
    </Svg>
  );
};

export default HelpIcon;
