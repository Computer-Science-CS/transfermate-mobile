import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import i18n from "i18n-js";

import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  Container,
  TextContent,
  Input,
  PrintTitle,
  PrintContainer,
  Print,
  BtnContainer,
  TextBtn,
} from "./styles";

import Header from "../../components/Header";

import PlusIcon from "../../assets/images/plus-icon.js";
import { BtnLight } from "../../components/ButtonLight";
import { InputField } from "../../components/Inputs";

export default function ContactUs() {
  const navigation = useNavigation();

  function handleCommonQuestions() {
    navigation.navigate("Questions");
  }

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
        <ScrollView>
        <TitleHeaderContainer>
          <TextTitle>{i18n.t("menu.support.contact")}</TextTitle>
        </TitleHeaderContainer>

        <Container>
          <TextContent>
            {i18n.t("menu.contactUs.message")}&nbsp;
            <TextContent
              onPress={handleCommonQuestions}
              textDecoration="underline"
              color="#808eef"
            >
              {i18n.t("menu.contactUs.message2")}
            </TextContent>
            <TextContent>&nbsp;{i18n.t("menu.contactUs.message3")}</TextContent>
          </TextContent>

          <Input
            multiline={true}
            placeholder={i18n.t("placeholder.contactMessage")}
          />
        </Container>

        <BtnContainer>
          <BtnLight>
            <TextBtn>{i18n.t("buttons.contactSendMessage")}</TextBtn>
          </BtnLight>
        </BtnContainer>
      </ScrollView>
      </GradientContainer>
    </>
  );
}
