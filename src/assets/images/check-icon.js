import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const CheckIcon = (props) => {
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" {...props}>
      <Circle data-name="Elipse 23" cx={8.5} cy={8.5} r={8.5} fill="#076025" />
    </Svg>
  );
};

export default CheckIcon;
