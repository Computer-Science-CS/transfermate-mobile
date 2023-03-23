import React from "react";

import { Button } from "./styles";

export function BtnLight({ handleFunction, children, background, hitSlop, disabled }) {
  return (
    <Button background={background} onPress={handleFunction} hitSlop={hitSlop} disabled={disabled} >
      {children}
    </Button>
  );
}
