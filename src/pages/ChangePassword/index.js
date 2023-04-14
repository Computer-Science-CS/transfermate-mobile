import React, { useEffect } from "react";
import { Formik } from "formik";

import { KeyboardAvoidingView, Platform, ScrollView, ToastAndroid, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import I18n from "i18n-js";
import * as yup from "yup";
import { BtnDark } from "../../components/ButtonDark";
import { useSelector, shallowEqual } from "react-redux";

import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  PasswordContainer,
  BtnContainer,
  TextBtn,
  TextErros,
} from "./styles";

import Header from "../../components/Header";

import { BtnLight } from "../../components/ButtonLight";
import { InputField } from "../../components/Inputs";
import { useState } from "react";
import axiosApi from "../../services/api";


export default function Password() {
  const user = useSelector((state) => state.login, shallowEqual);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('')
  const [data, setData] = useState({})
  const navigation = useNavigation();
  const msg = I18n.t("notifications.successRequest");
  const FormSchema = yup.object().shape({
    senha: yup
      .string()
      .matches(/\w*[a-z]\w*/, I18n.t("notifications.Thepasswordmusthavealowercaseletter"))
      .matches(/\w*[A-Z]\w*/, I18n.t("notifications.Thepasswordmusthaveanuppercaseletter"))
      .matches(/\d/,I18n.t("notifications.Thepasswordmusthaveanumber"))
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        I18n.t("notifications.Passwordmusthaveaspecialcharacter")
      )
      .min(
        8,
        ({ min }) =>
          `${I18n.t("notifications.atLeastPassword")} ${min} ${I18n.t(
            "notifications.minCharactersPasword"
          )}`
      )
      .required(`${I18n.t("notifications.requiredPassword")}`),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('senha')], I18n.t("notifications.passwordsmustmatch"))
      .required(I18n.t("notifications.Requiredfield")),
  });


  const handleLogin = async (values, actions) => {
    setLoading(true);
    console.log(actions);
    setData({
      idUsuario: user.usuario.id,
      novaSenha: values.confirmPassword,
      senhaAntiga: values.currentPassword,
    });
    try{
      await axiosApi.put('/usuario/change-password', data);
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      } else {
        Alert.alert(msg);
      };
      actions.resetForm();
      navigation.goBack();
    }catch (error) {
      console.log('Entrou no catch',error)
    }finally{
      setLoading(false)
    }
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TitleHeaderContainer>
            <TextTitle>{I18n.t("menu.settings.changePassword")}</TextTitle>
          </TitleHeaderContainer>
        </KeyboardAvoidingView>
        <Formik
          validationSchema={FormSchema}
          onSubmit={(values, actions) => {
            handleLogin(values, actions);
            //actions.resetForm({ values: genInitialValues() });
          }}
          initialValues={{
            currentPassword: "",
            senha: "",
            confirmPassword: "",
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
            setFieldValue,
            resetForm
          }) => (
            <>
              <InputField
                placeholder={I18n.t("placeholder.currentPassword")}
                value={values.currentPassword}
                secureTextEntry={true}
                onChangeText={handleChange("currentPassword")}
                onFocus={() => {setFieldTouched("currentPassword", true)}}
                onBlur={() => { setFieldTouched("currentPassword", false); }}
                backgroundColor={errors.currentPassword && touched.currentPassword && "red"}
                borderColor={errors.currentPassword && touched.currentPassword && "red"}
              />
              {errors.currentPassword && touched.currentPassword ? (
                <TextErros>{errors.currentPassword}</TextErros>
              ) : null}
              <InputField
                placeholder={I18n.t("placeholder.password")}
                value={values.senha}
                secureTextEntry={true}
                onChangeText={handleChange("senha")}
                onFocus={() => {setFieldTouched("senha", true);}}
                onBlur={() => { setFieldTouched("senha", false); }}
                backgroundColor={errors.senha && touched.senha && "red"}
                borderColor={errors.senha && touched.senha && "red"}
              />
             {errors.senha && touched.senha ? (
                <TextErros>{errors.senha}</TextErros>
              ) : null}

              <InputField
                placeholder={I18n.t("placeholder.confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={true}
                onChangeText={handleChange("confirmPassword")}
                onFocus={() => {setFieldTouched("confirmPassword", true)}}
                onBlur={() => { setFieldTouched("confirmPassword", false)}}
                backgroundColor={errors.senha && touched.senha && "red"}
                borderColor={errors.senha && touched.senha && "red"}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <TextErros>{errors.confirmPassword}</TextErros>
              ) : null}
              
              <BtnContainer>
                <BtnDark onPress={handleSubmit} loading={loading}>
                  <TextBtn>{I18n.t("buttons.changePassword")}</TextBtn>
                </BtnDark>
              </BtnContainer>
            </>
          )}
        </Formik>

      </GradientContainer>
    </>
  );
}
