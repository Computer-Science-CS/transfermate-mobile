import React from "react";

import { Button, GradientButton } from "./styles";

export function BtnDark({ children, onPress, loading, hitSlop }) {
  return (
    <>
      {loading ? (
        <GradientButton
          start={{ x: 0.9, y: 1 }}
          colors={["#0B5393", "#041452"]}
        >
          {children}
        </GradientButton>
      ) : (
        <Button onPress={onPress} hitSlop={hitSlop}>
          {children}
        </Button>
      )}
    </>
  );
}
