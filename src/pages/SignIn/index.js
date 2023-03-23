import React, { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { Formik } from "formik";
import * as yup from "yup";
import i18n from "i18n-js";
import { FirebaseContext } from "../../context/firebaseProvider";

import {
  GradientContainer,
  WelcomeContainer,
  WelcomeText,
  TextSign,
  SignContainer,
  BtnContainer,
  TextBtn,
  TextPasswordParamsContainer,
  PasswordParamsText,
  TextErros
} from "./styles";

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { BtnLight } from "../../components/ButtonLight";
import { InputField } from "../../components/Inputs";

import { LoginUser } from "../../redux/actions/actions";
import authRepository from "../../services/authRepository/authRepository";

export default function SignIn() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { auth } = useContext(FirebaseContext);

  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const FormSchema = yup.object().shape({
    nome: yup.string().required(`${i18n.t("notifications.requiredName")}`),
    email: yup
      .string()
      .email(`${i18n.t("notifications.Enteravalidemailaddress")}`)
      .required(`${i18n.t("notifications.emailisrequired")}`),
    senha: yup
      .string()
      .matches(/\w*[a-z]\w*/, `${i18n.t("notifications.Thepasswordmusthavealowercaseletter")}`)
      .matches(/\w*[A-Z]\w*/, `${i18n.t("notifications.Thepasswordmusthaveanuppercaseletter")}`)
      .matches(/\d/, `${i18n.t("notifications.Thepasswordmusthaveanumber")}`)
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        `${i18n.t("notifications.Passwordmusthaveaspecialcharacter")}`)

      .min(8, ({ min }) => `${i18n.t("notifications.Passwordmustbeatleast")}`)
      .required(`${i18n.t("notifications.passwordisrequired")}`),
  });

  const handleCreateNewUser = async (values, actions) => {
    setLoadingSignIn(true);
    try {
      const response = await authRepository.createNewUser(values);
      if (response.status === 200) {
        auth
          .createUserWithEmailAndPassword(
            values.email.toLowerCase(),
            values.senha
          )
          .then((createResponse) => {
            if (createResponse.additionalUserInfo.isNewUser) {
              auth
                .signInWithEmailAndPassword(
                  values.email.toLowerCase(),
                  values.senha
                )
                .then(() => {
                  setTimeout(() => {
                    showMessage({
                      type: "success",
                      message: i18n.t("notifications.registration"),
                      icon: { position: "right", icon: "success" },
                      titleStyle: { fontSize: 16, textAlign: "center" },
                      hideOnPress: true,
                      duration: 5000,
                    });
                    dispatch(LoginUser(values, setLoadingSignIn));
                  }, 1850);
                })
                .catch((error) => {
                  setLoadingSignIn(false);
                  showMessage({
                    type: "danger",
                    message: i18n.t("notifications.errorRegistrationLogin"),
                    icon: { position: "right", icon: "danger" },
                    titleStyle: { fontSize: 16, textAlign: "center" },
                    hideOnPress: true,
                    duration: 5000,
                  });
                });
              navigation.goBack();
              return;
            }
          })
          .catch((error) => {
            setLoadingSignIn(false);
            showMessage({
              type: "danger",
              message: i18n.t("notifications.errorRegistration"),
              icon: { position: "right", icon: "danger" },
              titleStyle: { fontSize: 16, textAlign: "center" },
              hideOnPress: true,
              duration: 5000,
            });
          });
      }
    } catch (error) {
      setLoadingSignIn(false);
      showMessage({
        type: "danger",
        message: error.response.data.errors[0],
        icon: { position: "right", icon: "danger" },
        titleStyle: { fontSize: 16, textAlign: "center" },
        hideOnPress: true,
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Header
        backBtn={true}
        backBtnFunction={() => {
          navigation.goBack();
        }}
        logo={true}
        profileBtn={false}
      />
      {loadingSignIn && <Loader container={false} />}

      <GradientContainer colors={["#0B5393", "#041452"]}>
        <KeyboardAwareScrollView bounces={false}>
          <WelcomeContainer>
            <WelcomeText>{i18n.t("greetings.welcomeText")}</WelcomeText>
            <TextSign>{i18n.t("greetings.welcomeMessage")}</TextSign>
          </WelcomeContainer>

          <Formik
            validationSchema={FormSchema}
            validateOnChange={true}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              handleCreateNewUser(values, actions);
            }}
            initialValues={{
              nome: "",
              email: "",
              senha: "",
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
                <SignContainer>
                  <InputField
                    borderTopRightRadius={40}
                    placeholder={i18n.t("placeholder.name")}
                    value={values.nome}
                    onChangeText={handleChange("nome")}
                    onBlur={() => {
                      setFieldTouched("nome", true);
                    }}
                    backgroundColor={errors.nome && touched.nome && "red"}
                    borderColor={errors.nome && touched.nome && "red"}
                  />
                  {errors.nome && touched.nome ? (
                    <TextErros>{errors.nome}</TextErros>
                  ) : null}
                  <InputField
                    borderTopRightRadius={40}
                    placeholder={i18n.t("placeholder.email")}
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
                    <TextErros>{errors.email}</TextErros>
                  ) : null}

                  <InputField
                    borderTopRightRadius={40}
                    placeholder={i18n.t("placeholder.password")}
                    secureTextEntry={true}
                    value={values.senha}
                    onChangeText={handleChange("senha")}
                    onBlur={() => {
                      setFieldTouched("senha", true);
                    }}
                    backgroundColor={errors.senha && touched.senha && "red"}
                    borderColor={errors.senha && touched.senha && "red"}
                  />
                  {errors.senha && touched.senha ? (
                    <TextErros>{errors.senha}</TextErros>
                  ) : null}

                  <TextPasswordParamsContainer>
                    <PasswordParamsText>
                      {i18n.t("notifications.paramsPassowrd")}
                    </PasswordParamsText>
                  </TextPasswordParamsContainer>
                </SignContainer>

                <BtnContainer>
                  <BtnLight handleFunction={handleSubmit}>
                    <TextBtn>{i18n.t("buttons.confirm")}</TextBtn>
                  </BtnLight>
                </BtnContainer>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </GradientContainer>
    </>
  );
}
