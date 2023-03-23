import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Accordion from "react-native-collapsible/Accordion";
import i18n from "i18n-js";

import Header from "../../components/Header";

import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  QuestContainer,
  TextTitleContainer,
  TextContentContainer,
  TextTitleContent,
  TextContent,
  ContactUsContainer,
  ContactUsText,
  ContactUs,
} from "./styles";

export default function Questions() {
  const navigation = useNavigation();

  function handleContact() {
    navigation.navigate("ContactUs");
  }

  const [activeSections, setActiveSections] = useState([]);

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section) => {
    return (
      <TextTitleContainer>
        <TextTitleContent>{section.title}</TextTitleContent>
      </TextTitleContainer>
    );
  };

  const renderContent = (section) => {
    return (
      <TextContentContainer>
        <TextContent color="#EEECEE">{section.content}</TextContent>
      </TextContentContainer>
    );
  };

  const CONTENT = [
    {
      title: i18n.t("menu.commonQuestions.0"),
      content: i18n.t("menu.commonQuestions.1"),
    },
    {
      title: i18n.t("menu.commonQuestions.2"),
      content: i18n.t("menu.commonQuestions.3"),
    },
    {
      title: i18n.t("menu.commonQuestions.4"),
      content: i18n.t("menu.commonQuestions.5"),
    },
    {
      title: i18n.t("menu.commonQuestions.6"),
      content: i18n.t("menu.commonQuestions.7"),
    },
    {
      title: i18n.t("menu.commonQuestions.8"),
      content: i18n.t("menu.commonQuestions.9"),
    },
    {
      title: i18n.t("menu.commonQuestions.10"),
      content: i18n.t("menu.commonQuestions.11"),
    },
    {
      title: i18n.t("menu.commonQuestions.12"),
      content: i18n.t("menu.commonQuestions.13"),
    },
    {
      title: i18n.t("menu.commonQuestions.14"),
      content: i18n.t("menu.commonQuestions.15"),
    },
    {
      title: i18n.t("menu.commonQuestions.16"),
      content: i18n.t("menu.commonQuestions.17"),
    },
    {
      title: i18n.t("menu.commonQuestions.18"),
      content: i18n.t("menu.commonQuestions.19"),
    },
    {
      title: i18n.t("menu.commonQuestions.20"),
      content: i18n.t("menu.commonQuestions.21"),
    },
    {
      title: i18n.t("menu.commonQuestions.22"),
      content: i18n.t("menu.commonQuestions.23"),
    },
    {
      title: i18n.t("menu.commonQuestions.24"),
      content: i18n.t("menu.commonQuestions.25"),
    },
    {
      title: i18n.t("menu.commonQuestions.26"),
      content: i18n.t("menu.commonQuestions.27"),
    },
  ];

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
          <TextTitle>{i18n.t("menu.support.questions")}</TextTitle>
        </TitleHeaderContainer>

        <QuestContainer>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
            renderAsFlatList={false}
          />
          <ContactUsContainer>
            <ContactUsText color="#C2C2C4" fontSize={18}>
              {i18n.t("menu.commonQuestions.28")}
              {"\n"}
              <ContactUs onPress={handleContact}>
                <ContactUsText color="#808EEF" textDecoration="underline">
                  {i18n.t("menu.commonQuestions.29")}
                </ContactUsText>
              </ContactUs>
            </ContactUsText>
          </ContactUsContainer>
        </QuestContainer>
      </GradientContainer>
    </>
  );
}
