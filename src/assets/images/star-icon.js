import * as React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { G, Path } from "react-native-svg";

const StarIcon = (props) => {
  return (
    <Svg
      width={RFValue(12)}
      height={RFValue(12)}
      viewBox="0 0 15 15"
      {...props}
    >
      <G data-name="Pol\xEDgono 1" fill="#ffd714">
        <Path d="M10.388 13.008a.488.488 0 01-.29-.1L8.38 11.666a1.491 1.491 0 00-.879-.285c-.318 0-.622.099-.88.285l-1.718 1.244a.488.488 0 01-.29.099.526.526 0 01-.41-.209.474.474 0 01-.075-.431l.64-2.268a1.498 1.498 0 00-.502-1.576L2.43 7.045a.488.488 0 01-.16-.549.488.488 0 01.46-.34l2.21-.06a1.505 1.505 0 001.382-1.02l.704-2.097a.486.486 0 01.474-.34c.084 0 .368.024.474.34l.704 2.096c.2.594.755 1.005 1.382 1.022l2.21.06a.488.488 0 01.46.34.488.488 0 01-.16.548l-1.835 1.48a1.498 1.498 0 00-.503 1.575l.64 2.268c.057.2-.01.344-.075.431a.526.526 0 01-.41.209z" />
        <Path d="M7.5 3.139l-.705 2.096a2.007 2.007 0 01-1.842 1.362l-2.21.06L4.58 8.134c.625.504.888 1.328.67 2.1l-.64 2.269 1.719-1.244c.343-.248.748-.38 1.172-.38.424 0 .83.132 1.172.38l1.72 1.244-.641-2.268a1.997 1.997 0 01.67-2.101l1.835-1.479-2.21-.06a2.007 2.007 0 01-1.841-1.361L7.5 3.139m0-1c.398 0 .795.227.948.681l.704 2.096a1 1 0 00.921.681l2.21.06c.93.024 1.325 1.194.6 1.778l-1.835 1.479a1 1 0 00-.335 1.05l.64 2.268c.196.692-.353 1.276-.965 1.276a.986.986 0 01-.583-.194L8.086 12.07a.999.999 0 00-1.172 0l-1.72 1.244a.986.986 0 01-.582.194c-.612 0-1.161-.584-.966-1.276l.64-2.268a1 1 0 00-.334-1.05l-1.836-1.48c-.724-.583-.329-1.753.6-1.778l2.21-.059a1 1 0 00.922-.681l.704-2.096a.982.982 0 01.948-.681z" />
      </G>
    </Svg>
  );
};

export default StarIcon;
