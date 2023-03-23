import React from "react";
import Svg, { G, Path, Rect, Image } from "react-native-svg";

const BackIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 14 15"
    >
      <G data-name="voltar seta" transform="translate(-3 -2.535)">
        <G data-name="Layer 2" transform="translate(6.255 2.535)">
          <Path
            data-name="Caminho 231"
            d="M16.831,21.04a.6.6,0,0,1-.46-.226l-5.185-6.24a.9.9,0,0,1,0-1.108l5.185-6.24a.576.576,0,0,1,.92,0,.9.9,0,0,1,0,1.108L12.56,14.02l4.731,5.687a.9.9,0,0,1,0,1.108.6.6,0,0,1-.46.226Z"
            transform="translate(-10.994 -6.996)"
            fill="#eeecee"
          />
        </G>
        <G transform="translate(3 2.15)">
          <Rect
            data-name="Retângulo 366"
            width="14"
            height="15"
            transform="translate(0 0.386)"
            fill="none"
          />
        </G>
      </G>
    </Svg>
  );
};

export default BackIcon;
