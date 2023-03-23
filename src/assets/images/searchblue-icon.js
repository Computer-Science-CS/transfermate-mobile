import * as React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { G, Path } from "react-native-svg";

const SearchBlueIcon = (props) => {
  return (
    <Svg
      width={RFValue(30)}
      height={RFValue(30)}
      viewBox="0 0 42 42"
      {...props}
    >
      <G data-name="Grupo 32">
        <G data-name="Grupo 31">
          <Path
            data-name="Caminho 228"
            d="M16.972 15.073a.666.666 0 00-.942 0 4.551 4.551 0 00-1.3 3.689.666.666 0 00.662.6h.067a.666.666 0 00.6-.729 3.224 3.224 0 01.918-2.615.666.666 0 00-.005-.945z"
            fill="#101957"
          />
        </G>
      </G>
      <G data-name="Grupo 34">
        <G data-name="Grupo 33">
          <Path
            data-name="Caminho 229"
            d="M19.613 10.977a7.613 7.613 0 107.613 7.613 7.622 7.622 0 00-7.613-7.613zm0 13.895a6.282 6.282 0 116.282-6.282 6.289 6.289 0 01-6.282 6.282z"
            fill="#101957"
          />
        </G>
      </G>
      <G data-name="Grupo 36">
        <G data-name="Grupo 35">
          <Path
            data-name="Caminho 230"
            d="M29.805 27.839L24.966 23a.666.666 0 00-.942.942l4.839 4.839a.666.666 0 00.942-.942z"
            fill="#101957"
          />
        </G>
      </G>
      <G data-name="Ret\xE2ngulo 365" fill="none" stroke="rgba(4,4,4,0.01)">
        <Path stroke="none" d="M0 0h42v42H0z" />
        <Path d="M.5.5h41v41H.5z" />
      </G>
    </Svg>
  );
};

export default SearchBlueIcon;
