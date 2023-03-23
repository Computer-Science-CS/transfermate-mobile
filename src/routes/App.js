import React from 'react';
import { DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTab } from './BottomTab'

import UserChat from "../pages/UserChat";

const Stack = createStackNavigator();

export const AppNavigator = () => {

    return (
        <Stack.Navigator
            theme={DefaultTheme}
            initialRouteName="Login"
            screenOptions={{
                gestureEnabled: false,
                headerShown: false,
                cardStyle: { backgroundColor: "#fff" },
            }}
        >
            <Stack.Screen name="Root" component={BottomTab} />
            <Stack.Screen name="UserChat" component={UserChat} />
        </Stack.Navigator>
    );
}