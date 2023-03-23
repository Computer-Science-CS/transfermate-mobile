import React, { useState } from "react";
import { Switch, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import i18n from "i18n-js";

import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  SettingsContainer,
  TitleSettings,
  TextSettingsContainer,
  TextSettingsContent,
} from "./styles";

import ConfigIcon from "../../assets/images/config-icon.js";
import HelpIcon from "../../assets/images/help-icon.js";
import Header from "../../components/Header";

export default function Menu() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isResponseEnabled, setIsResponseEnabled] = useState(false);
  const [isNewSolicitationEnabled, setIsNewSolicitationEnabled] =
    useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleIsResponse = () =>
    setIsResponseEnabled((previousState) => !previousState);
  const toggleIsNewSolicitation = () =>
    setIsNewSolicitationEnabled((previousState) => !previousState);

  function handleChangePass() {
    navigation.navigate("ChangePassword");
  }

  function handleQuestionsMenu() {
    navigation.navigate("Questions");
  }

  function handleAbout() {
    navigation.navigate("About");
  }

  function handleContact() {
    navigation.navigate("ContactUs");
  }

  return (
    <>
      <Header
        backBtn={false}
        logo={true}
        profileBtn={true}
        profileBtnFunction={() => {
          navigation.navigate("Profile");
        }}
      />
      <GradientContainer colors={["#0B5393", "#041452"]}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <TitleHeaderContainer>
            <ConfigIcon />
            <TextTitle>{i18n.t("menu.settings.config")}</TextTitle>
          </TitleHeaderContainer>

          {/* <SettingsContainer>
            <TitleSettings>{i18n.t("menu.settings.notify")}</TitleSettings>

            <TextSettingsContainer>
              <TextSettingsContent>
                {i18n.t("menu.settings.messages")}
              </TextSettingsContent>

              <Switch
                trackColor={{ false: "#BEC4D166", true: "#6B7CF166" }}
                thumbColor={isEnabled ? "#808EEF" : "#C2C2C4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </TextSettingsContainer>

            <TextSettingsContainer>
              <TextSettingsContent>
                {i18n.t("menu.settings.request")}
              </TextSettingsContent>
              <Switch
                trackColor={{ false: "#BEC4D166", true: "#6B7CF166" }}
                thumbColor={isResponseEnabled ? "#808EEF" : "#C2C2C4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleIsResponse}
                value={isResponseEnabled}
              />
            </TextSettingsContainer>

            <TextSettingsContainer>
              <TextSettingsContent>
                {i18n.t("menu.settings.newRequest")}
              </TextSettingsContent>
              <Switch
                trackColor={{ false: "#BEC4D166", true: "#6B7CF166" }}
                thumbColor={isNewSolicitationEnabled ? "#808EEF" : "#C2C2C4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleIsNewSolicitation}
                value={isNewSolicitationEnabled}
              />
            </TextSettingsContainer>
          </SettingsContainer> */}
          <SettingsContainer>
            <TitleSettings>{i18n.t("menu.settings.security")}</TitleSettings>
            <Pressable onPress={handleChangePass}>
              <TextSettingsContainer marginBottom={8}>
                <TextSettingsContent color="#EEECEE">
                  {i18n.t("menu.settings.changePassword")}
                </TextSettingsContent>
              </TextSettingsContainer>
            </Pressable>
          </SettingsContainer>

          <TitleHeaderContainer>
            <HelpIcon />
            <TextTitle>{i18n.t("menu.support.sup")}</TextTitle>
          </TitleHeaderContainer>

          <SettingsContainer>
            <Pressable onPress={handleQuestionsMenu}>
              <TextSettingsContainer>
                <TextSettingsContent color="#C2C2C4" fontSize="20">
                  {i18n.t("menu.support.questions")}
                </TextSettingsContent>
              </TextSettingsContainer>
            </Pressable>

            <TextSettingsContainer>
              <TextSettingsContent color="#C2C2C4" fontSize="20">
                {i18n.t("menu.support.policy")}
              </TextSettingsContent>
            </TextSettingsContainer>

            <Pressable onPress={handleAbout}>
              <TextSettingsContainer>
                <TextSettingsContent color="#C2C2C4" fontSize="20">
                  {i18n.t("menu.support.about")}
                </TextSettingsContent>
              </TextSettingsContainer>
            </Pressable>

            <Pressable onPress={handleContact}>
              <TextSettingsContainer marginBottom={5}>
                <TextSettingsContent color="#C2C2C4" fontSize="20">
                  {i18n.t("menu.support.contact")}
                </TextSettingsContent>
              </TextSettingsContainer>
            </Pressable>
          </SettingsContainer>
        </ScrollView>
      </GradientContainer>
    </>
  );
}
