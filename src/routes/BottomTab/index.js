import React from "react";
import { View, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import i18n from "i18n-js";

import Menu from "../../pages/Menu";
import ChangePassword from "../../pages/ChangePassword";
import Questions from "../../pages/Questions";
import About from "../../pages/About";
import ContactUs from "../../pages/Contact";

import Home from "../../pages/Home";
import Request from "../../pages/Request";
import History from "../../pages/History";

import Chat from "../../pages/Chat";

import Profile from "../../pages/Profile";
import PersonProfile from "../../pages/PersonProfile";
import Currency from "../../pages/Currency";
import Rating from "../../pages/Rating";

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          backgroundColor: "#0E185E",
          borderTopColor: "#6B7CF166",
          borderTopWidth: 1,
          height: RFValue(40),
        },
      }}
    >
      {/* Menu screen */}
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <>
                  <FontAwesome5 name="cog" size={RFValue(16)} color="#808EEF" />

                  <Text
                    style={{
                      color: focused ? "#808EEF" : "#EEECEE",
                      fontSize: RFValue(10),
                      fontFamily:
                        Platform.OS === "ios"
                          ? "Poppins_400Regular"
                          : "sans-serif",
                    }}
                  >
                    {i18n.t("menu.settings.settingsBottomTab")}
                  </Text>
                </>
              ) : (
                <>
                  <FontAwesome5 name="cog" size={RFValue(24)} color="#EEECEE" />
                </>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
      />

      <Tab.Screen
        name="Questions"
        component={Questions}
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
      />

      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
      />

      <Tab.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
      />

      {/* Home screen */}
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ newSolicitation: false }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <>
                  <FontAwesome5
                    name="home"
                    size={RFValue(16)}
                    color="#808EEF"
                  />

                  <Text
                    style={{
                      color: focused ? "#808EEF" : "#EEECEE",
                      fontSize: RFValue(10),
                      fontFamily:
                        Platform.OS === "ios"
                          ? "Poppins_400Regular"
                          : "sans-serif",
                    }}
                  >
                    Home
                  </Text>
                </>
              ) : (
                <>
                  <FontAwesome5
                    name="home"
                    size={RFValue(24)}
                    color="#EEECEE"
                  />
                </>
              )}
            </View>
          ),
        }}
      />

      {/* Request screen */}
      <Tab.Screen
        name="Request"
        component={Request}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <>
                  <FontAwesome5
                    name="plus-circle"
                    size={RFValue(16)}
                    color={focused ? "#808EEF" : "#EEECEE"}
                  />
                </>
              ) : (
                <>
                  <FontAwesome5
                    name="plus-circle"
                    size={RFValue(24)}
                    color={focused ? "#808EEF" : "#EEECEE"}
                  />
                </>
              )}
            </View>
          ),
        }}
      />

      {/* History screen */}
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <>
                  <FontAwesome5
                    name="clipboard-list"
                    size={RFValue(16)}
                    color="#808EEF"
                  />
                  <Text
                    style={{
                      color: focused ? "#808EEF" : "#EEECEE",
                      fontSize: RFValue(10),
                      fontFamily:
                        Platform.OS === "ios"
                          ? "Poppins_400Regular"
                          : "sans-serif",
                    }}
                  >
                    Histórico
                  </Text>
                </>
              ) : (
                <>
                  <FontAwesome5
                    name="clipboard-list"
                    size={RFValue(24)}
                    color="#EEECEE"
                  />
                </>
              )}
            </View>
          ),
        }}
      />

      {/* Chat screen */}
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <>
                  <Entypo name="chat" size={RFValue(16)} color="#808EEF" />

                  <Text
                    style={{
                      color: focused ? "#808EEF" : "#EEECEE",
                      fontSize: RFValue(10),
                      fontFamily:
                        Platform.OS === "ios"
                          ? "Poppins_400Regular"
                          : "sans-serif",
                    }}
                  >
                    Chat
                  </Text>
                </>
              ) : (
                <>
                  <Entypo name="chat" size={RFValue(24)} color="#EEECEE" />
                </>
              )}
            </View>
          ),
        }}
      />

      {/* Profile screen */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
      />

      <Tab.Screen
        name="PersonProfile"
        component={PersonProfile}
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
      />

      <Tab.Screen
        name="Currency"
        component={Currency}
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
      />

      <Tab.Screen
        name="Rating"
        component={Rating}
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};
