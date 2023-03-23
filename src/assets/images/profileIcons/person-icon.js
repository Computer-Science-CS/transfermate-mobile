import React from "react";
import Svg, { Defs, ClipPath, Path, G, Ellipse } from "react-native-svg";

const PersonIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={46}
      viewBox="0 0 14 27"
      {...props}
    >
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Ret\xE2ngulo 375"
            transform="translate(45.102 251.882)"
            fill="#eeecee"
            opacity={0.15}
            d="M0 0h14v27H0z"
          />
        </ClipPath>
      </Defs>
      <G
        data-name="Grupo de m\xE1scara 1"
        transform="translate(-45.102 -251.882)"
        clipPath="url(#prefix__a)"
      >
        <G transform="translate(45.101 258.356)" fill="#eeecee">
          <Ellipse
            data-name="Elipse 33"
            cx={3.574}
            cy={4.289}
            rx={3.574}
            ry={4.289}
            transform="translate(3.586)"
          />
          <Path
            data-name="Caminho 262"
            d="M14.165 12.224a6.515 6.515 0 00-3.431-3 1.6 1.6 0 00-1.287.071 4.388 4.388 0 01-4.575 0 1.609 1.609 0 00-1.287 0 6.515 6.515 0 00-3.431 3 1.411 1.411 0 001.358 2h11.295a1.448 1.448 0 001.358-2.071z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default PersonIcon;
