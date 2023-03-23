import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, shallowEqual } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "i18n-js";
import logo from '../../assets/logo/logo.png'


import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  SubTitleContainer,
  IconsContainer,
  SubTitleText,
  ImageLogo
} from "./styles";

import Header from "../../components/Header";
import { RFValue } from "react-native-responsive-fontsize";

export default function Profile() {
  const navigation = useNavigation();

  const user = useSelector((state) => state.login, shallowEqual);

  function handlePersonProfile() {
    navigation.navigate("PersonProfile");
  }

  function handleCurrencyPage() {
    navigation.navigate("Currency");
  }

  function handleRatingPage() {
    navigation.navigate("Rating");
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
        <TitleHeaderContainer>
          <TextTitle>
            {i18n.t("greetings.hello")} {user.usuario.nome}!
          </TextTitle>
        </TitleHeaderContainer>

        <SubTitleContainer onPress={handlePersonProfile}>
          <IconsContainer>
            <Ionicons name="person" size={RFValue(22)} color="#f4f4f4" />
          </IconsContainer>
          <SubTitleText>{i18n.t("personProfileScreen.myProfile")}</SubTitleText>
        </SubTitleContainer>

        <SubTitleContainer onPress={handleCurrencyPage}>
          <IconsContainer>
            <MaterialCommunityIcons
              name="currency-usd"
              size={RFValue(22)}
              color="#f4f4f4"
            /> 
          </IconsContainer>
          <SubTitleText>
            {i18n.t("personProfileScreen.currencyScreen.title")}
          </SubTitleText>
        </SubTitleContainer>

        <SubTitleContainer onPress={handleRatingPage}>
          <IconsContainer>
            <Ionicons name="star" size={RFValue(22)} color="#f4f4f4" />
          </IconsContainer>
          <SubTitleText>
            {i18n.t("personProfileScreen.myRating.ratingAndReview")}
          </SubTitleText>
        </SubTitleContainer>
      </GradientContainer>
    </>
  );
}
