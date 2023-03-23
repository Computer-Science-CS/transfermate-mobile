import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { Platform, View, Text, Keyboard, Pressable } from "react-native";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal";
import { showMessage } from "react-native-flash-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import i18n from "i18n-js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";

import { getMySolicitations } from "../../redux/actions/actions";

import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  RequestForm,
  BtnContainer,
  TextBtn,
  InputContainer,
  InputDateContainer,
  TextInputDate,
} from "./styles";

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { BtnLight } from "../../components/ButtonLight";
import { InputField } from "../../components/Inputs";

import requestRepository from "../../services/requestRepository/requestRepository";

export default function Request() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login, shallowEqual);
  const userCoins = useSelector((state) => state.userCoins, shallowEqual);
  const userDestinyCoins = useSelector(
    (state) => state.userDestinyCoins,
    shallowEqual
  );

  const userOriginCoins = useSelector(
    (state) => state.userOriginCoins,
    shallowEqual
  );

  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendarAndroid, setShowCalendarAndroid] = useState(false);
  const [date, setDate] = useState(new Date());

  const [loading, setLoading] = useState(false);

  const [request, setRequest] = useState({
    usuarioId: null,
    moedaOrigemId: null,
    moedaDestinoId: null,
    valorCentavos: null,
    dataDisponibilidade: "",
  });

  const handleSubmitRequest = () => {
    if (request.moedaDestinoId === null) {
      showMessage({
        type: "warning",
        message: i18n.t("notifications.warningDestinyCurrency"),
        icon: { position: "right", icon: "warning" },
        titleStyle: { fontSize: 16, textAlign: "center" },
        hideOnPress: true,
        duration: 5000,
      });
      return;
    }
    if (request.moedaOrigemId === null) {
      showMessage({
        type: "warning",
        message: i18n.t("notifications.warningOriginCurrency"),
        icon: { position: "right", icon: "warning" },
        titleStyle: { fontSize: 16, textAlign: "center" },
        hideOnPress: true,
        duration: 5000,
      });
      return;
    }
    if (request.valorCentavos === "" || request.valorCentavos === null) {
      showMessage({
        type: "warning",
        message: i18n.t("notifications.warningValueRequest"),
        icon: { position: "right", icon: "warning" },
        titleStyle: { fontSize: 16, textAlign: "center" },
        hideOnPress: true,
        duration: 5000,
      });
      return;
    }
    if (request.dataDisponibilidade === "") {
      showMessage({
        type: "warning",
        message: i18n.t("notifications.warningDateRequest"),
        icon: { position: "right", icon: "warning" },
        titleStyle: { fontSize: 16, textAlign: "center" },
        hideOnPress: true,
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    // let teste = realToCent(request.valorCentavos.toFixed(2).toString());

    requestRepository
      .createNewRequest({
        ...request,
        dataDisponibilidade: moment(
          request.dataDisponibilidade,
          "DD/MM/YYYY"
        ).toDate(),
        valorCentavos: request.valorCentavos,
        usuarioId: user.usuario.id,
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          dispatch(getMySolicitations(user.usuario.id));
          showMessage({
            type: "success",
            message: i18n.t("notifications.successRequest"),
            icon: { position: "right", icon: "success" },
            titleStyle: { fontSize: 16, textAlign: "center" },
            hideOnPress: true,
            duration: 5000,
          });
          setRequest({
            usuarioId: user.usuario.id,
            moedaOrigemId: null,
            moedaDestinoId: null,
            valorCentavos: null,
            dataDisponibilidade: "",
          });
          navigation.navigate("Root", {
            screen: "History",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          type: "danger",
          message: i18n.t("notifications.errorRequest"),
          icon: { position: "right", icon: "danger" },
          titleStyle: { fontSize: 16, textAlign: "center" },
          hideOnPress: true,
          duration: 5000,
        });
      });
  };

  function realToCent(value) {
    const cents = value.replace(",", "").replace(".", "");

    return Number(parseInt(cents, 10));
  }

  const onChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      let month = String(selectedDate.getMonth() + 1);
      let day = String(selectedDate.getDate());
      const year = String(selectedDate.getFullYear());

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      let data = day + "/" + month + "/" + year;
      if (Platform.OS === "android") {
        if (event.type == "set") {
          const currentDate = selectedDate || date;
          setShowCalendarAndroid(Platform.OS === "ios");
          setDate(currentDate);
          setRequest({ ...request, dataDisponibilidade: data });
          // setShowCalendarAndroid(false);
          // setPerfil({ ...perfil, nascimento: data })
        } else {
          setShowCalendarAndroid(false);
        }
      } else {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setRequest({ ...request, dataDisponibilidade: data });
        setShowCalendar(false);
        // setPerfil({ ...perfil, nascimento: data })
      }
    } else {
      setShowCalendarAndroid(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setRequest({
        moedaOrigemId: null,
        moedaDestinoId: null,
        valorCentavos: null,
        dataDisponibilidade: "",
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      {loading && <Loader />}
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

      <Modal isVisible={showCalendar}>
        <View
          style={{
            height: RFValue(320),
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <DateTimePicker
            minimumDate={moment().add(1, "days").toDate()}
            mode="date"
            display={Platform.OS === "android" ? "calendar" : "inline"}
            value={date}
            onChange={onChange}
            textColor="red"
            themeVariant="ligth"
          />
        </View>
      </Modal>

      <GradientContainer
        colors={["#0B5393", "#041452"]}
        // onStartShouldSetResponder={() => {
        //   Keyboard.dismiss();
        // }}
      >
        <TitleHeaderContainer>
          <TextTitle>{i18n.t("home.requestScreen.newRequest")}</TextTitle>
        </TitleHeaderContainer>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <RequestForm>
            <InputContainer>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  label: i18n.t("placeholder.sourceCurrency"),
                  value: null,
                }}
                style={{
                  inputAndroidContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputAndroid: {
                    paddingLeft: 5,
                    paddingTop: 2.5,
                    paddingBottom: 2.5,
                    fontSize: RFValue(18),
                    fontFamily: "sans-serif",
                    color: "#3A3D43",
                  },
                  inputIOSContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputIOS: {
                    paddingLeft: 5,
                    paddingTop: 2.5,
                    paddingBottom: 2.5,
                    fontSize: RFValue(18),
                    fontFamily: "Poppins_400Regular",
                    color: "#3A3D43",
                  },
                  placeholder: { color: "#5E5E5E" },
                }}
                value={request.moedaOrigemId}
                onValueChange={(e) => {
                  setRequest({ ...request, moedaOrigemId: e });
                }}
                items={userOriginCoins}
              />
            </InputContainer>


            <InputContainer>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  label: i18n.t("placeholder.destinationCurrency"),
                  value: null,
                }}
                style={{
                  inputAndroidContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputAndroid: {
                    paddingLeft: 5,
                    paddingTop: 2.5,
                    paddingBottom: 2.5,
                    fontSize: RFValue(18),
                    fontFamily: "sans-serif",
                    color: "#3A3D43",
                  },
                  inputIOSContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputIOS: {
                    paddingLeft: 5,
                    paddingTop: 2.5,
                    paddingBottom: 2.5,
                    fontSize: RFValue(18),
                    fontFamily: "Poppins_400Regular",
                    color: "#3A3D43",
                  },
                  placeholder: { color: "#5E5E5E" },
                }}
                value={request.moedaDestinoId}
                onValueChange={(e) => {
                  setRequest({ ...request, moedaDestinoId: e });
                }}
                items={userDestinyCoins}
              />
            </InputContainer>
            
                <InputField
                  placeholder={i18n.t("placeholder.value")}
                  typeInput="currency"
                  value={request.valorCentavos}
                  onChangeText={(e) => setRequest({ ...request, valorCentavos: e })}
                />

            <InputDateContainer>
              <Pressable
                onPress={() => {
                  Platform.OS === "android"
                    ? setShowCalendarAndroid(true)
                    : setShowCalendar(true);
                }}
              >
                <TextInputDate>
                  {request.dataDisponibilidade === ""
                    ? i18n.t("placeholder.date")
                    : request.dataDisponibilidade}
                </TextInputDate>
              </Pressable>
            </InputDateContainer>
            {showCalendarAndroid && (
              <DateTimePicker
                minimumDate={moment().add(1, "days").toDate()}
                value={date}
                mode={'date'}
                display={'default'}                
                onChange={onChange}
                textColor="red"
                themeVariant="ligth"
                format="DD-MM-YYYY"
              />
            )}
          </RequestForm>

          <BtnContainer>
            <BtnLight
              handleFunction={() => {
                handleSubmitRequest();
              }}
            >
              <TextBtn>{i18n.t("buttons.createRequest")}</TextBtn>
            </BtnLight>
          </BtnContainer>
        </KeyboardAwareScrollView>
      </GradientContainer>
    </>
  );
}
