import React from "react";
import Svg, { Path } from "react-native-svg";

const RatingIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={38}
      viewBox="0 0 20 20"
      {...props}
    >
      <Path
        data-name="Pol\xEDgono 1"
        d="M9.052 2.82a1 1 0 011.9 0l1.33 3.955a1 1 0 00.921.681l4.085.11a1 1 0 01.6 1.778l-3.328 2.679a1 1 0 00-.335 1.05l1.175 4.159a1 1 0 01-1.549 1.082l-3.264-2.362a1 1 0 00-1.172 0L6.15 18.314a1 1 0 01-1.55-1.082l1.174-4.158a1 1 0 00-.335-1.05L2.116 9.345a1 1 0 01.6-1.778L6.8 7.456a1 1 0 00.921-.681z"
        fill="#eeecee"
      />
    </Svg>
  );
};

export default RatingIcon;
