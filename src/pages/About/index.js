import React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import i18n from "i18n-js";

import Header from "../../components/Header";

import Logo from "../../assets/logo/logo.png";

import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  LogoContainer,
  LogoContent,
  TextContent,
} from "./styles";

export default function About() {
  const navigation = useNavigation();

  return (
    <>
      <Header
        backBtn={true}
        backBtnFunction={() => {
          navigation.goBack();
        }}
        logo={true}
        profileBtn={true}
        profileBtnFunction={() => {
          navigation.navigate("Profile");
        }}
      />
      <GradientContainer colors={["#0B5393", "#041452"]}>
        <TitleHeaderContainer>
          <TextTitle>{i18n.t("menu.support.about")}</TextTitle>
        </TitleHeaderContainer>

        <LogoContainer>
          <LogoContent>
            <Image
              source={Logo}
              resizeMode="contain"
              style={{ width: "100%" }}
            />
          </LogoContent>

          <TextContent>
            {i18n.t("menu.settings.version")} 1.1{"\n"}2021
          </TextContent>
        </LogoContainer>
      </GradientContainer>
    </>
  );
}
