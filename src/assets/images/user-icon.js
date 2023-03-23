import * as React from "react";
import Svg, { Path } from "react-native-svg";

const UserIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={50}
      viewBox="0 0 50 50"
      {...props}
    >
      <Path
        d="M25 0a25 25 0 1025 25A25.073 25.073 0 0025 0zm0 8.333c4.583 0 8.333 4.583 8.333 10.417S29.583 29.167 25 29.167s-8.333-4.583-8.333-10.417S20.417 8.333 25 8.333zm13.75 32.292A21.163 21.163 0 0125 45.833a21.163 21.163 0 01-13.75-5.208 2.025 2.025 0 01-.208-2.917 18.721 18.721 0 018.75-5.625 11.476 11.476 0 0010.417 0 17.745 17.745 0 018.75 5.625 1.873 1.873 0 01-.209 2.917z"
        fill="#eeecee"
      />
    </Svg>
  );
};

export default UserIcon;
