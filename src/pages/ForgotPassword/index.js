import { Formik } from "formik";
import I18n from "i18n-js";
import React from "react";
import { BtnDark } from "../../components/ButtonDark";
import { InputField } from "../../components/Inputs";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import * as S from './styles';
import { Platform, View, ToastAndroid, Alert, ActiveIndicator } from "react-native";
import axiosApi from "../../services/api";
import { useState } from "react";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const FormSchema = yup.object().shape({
    email: yup
      .string()
      .email(`${I18n.t("notifications.validEmail")}`)
      .required(`${I18n.t("notifications.requiredEmail")}`),
  });

  const handleLogin = async (value) => {
    setLoading(true)
    const email = String(value)
    try {
      await axiosApi.post(`/usuario/forgot-password?email=${email}`);
      if (Platform.OS === 'android') {
        ToastAndroid.show(I18n.t("notifications.successRequest"), ToastAndroid.SHORT);
      } else {
        Alert.alert(I18n.t("notifications.successRequest"));
      };
      navigation.goBack();
    } catch (error) {
      console.log("CATCH", error.response.status)
      if(error.response.status === 400){
        if (Platform.OS === 'android') {
          ToastAndroid.show(I18n.t("notifications.errorEmail"), ToastAndroid.SHORT);
        } else {
          Alert.alert(I18n.t("notifications.errorEmail"));
        };
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoBack = () => {
    navigation.goBack();
  }


  return (
    <>
      <S.GradientContainer colors={["#0B5393", "#041452"]}>
        <S.Header style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Ionicons onPress={handleGoBack} name="chevron-back" size={RFValue(20)} color="#cecece" />
          <S.Title>Alterar senha</S.Title>
          <View />
        </S.Header>

        <Formik
          validationSchema={FormSchema}
          onSubmit={(values, actions) => {
            handleLogin(values.email);
          }}
          initialValues={{
            email: "",
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
          }) => (
            <>
              <InputField
                placeholder={I18n.t("placeholder.email")}
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => {
                  setFieldTouched("email", true);
                }}
                backgroundColor={errors.email && touched.email && "red"}
                borderColor={errors.email && touched.email && "red"}
              />

              {errors.email && touched.email ? (
                <S.TextErros>{errors.email}</S.TextErros>
              ) :  <S.TextErros></S.TextErros>}


                <BtnDark onPress={handleSubmit}>
                  {loading ? <S.GradientButton
                    start={{ x: 0.9, y: 1 }}
                    colors={["#0B5393", "#041452"]}
                  >
                    <S.TextBtn>{I18n.t("buttons.changePassword")}</S.TextBtn>
                  </S.GradientButton> : <S.TextBtn>{I18n.t("buttons.changePassword")}</S.TextBtn>}
                </BtnDark>
            </>
          )}
        </Formik>

      </S.GradientContainer>
    </>

  )
}