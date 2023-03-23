import React from 'react';
import { DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword"

const Stack = createStackNavigator();

export const SignNavigator = () => {

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
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign" component={SignIn} />
            <Stack.Screen name="Forgot" component={ForgotPassword} />
        </Stack.Navigator>
    );
}