import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { shallowEqual, useSelector } from "react-redux";

import { SignNavigator } from "./Sign";
import { AppNavigator } from "./App";

import NavigationService from "../services/navigation";

export default function Routes() {
  const user = useSelector((state) => state.login, shallowEqual);

  return (
    <NavigationContainer
      ref={(navigatorRef) =>
        NavigationService.setTopLevelNavigator(navigatorRef)
      }
    >
      {!user.accessToken ? <SignNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
}
