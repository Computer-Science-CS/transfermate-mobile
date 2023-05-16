import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import userRepository from "../../services/userRepository/userRepository";
import { Platform, View, Pressable, Alert } from "react-native";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal";
import { showMessage } from "react-native-flash-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import i18n from "i18n-js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";

import { getMySolicitations } from "../../redux/actions/actions";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
import SelectDropdown from "react-native-select-dropdown";

export default function Request() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login, shallowEqual);

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
    moedaOrigemId: userOriginCoins[0] ? userOriginCoins[0].value : null,
    moedaDestinoId: userDestinyCoins[0] ? userDestinyCoins[0].value : null,
    valorCentavos: null,
    dataDisponibilidade: "",
  });

  const checkUserCoins = useCallback(() => {
    setLoading(true);
    console.log(i18n.t("request.alerts.id"));
    userRepository
      .getUserCoins(user.usuario?.id)
      .then((response) => {
        const check = response.data.data.length === 0 ? false : true;

        if (!check) {
          Alert.alert(
            i18n.t("request.alerts.title"),
            i18n.t("request.alerts.message"),
            [
              {
                text: i18n.t("request.alerts.button"),
                onPress: () => navigation.navigate("Currency"),
                style: "default",
              },
            ]
          );
        }
      })
      .catch((error) => {
        console.log("entrou");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmitRequest = () => {
    console.log(request);
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
    let teste = realToCent(request.valorCentavos.toFixed(2).toString());

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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => checkUserCoins());

    return unsubscribe;
  }, [checkUserCoins]);

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
              <SelectDropdown
                defaultButtonText={i18n.t("placeholder.sourceCurrency")}
                data={userOriginCoins}
                onSelect={(e) => {
                  setRequest({ ...request, moedaOrigemId: e.value });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.label;
                }}
                rowTextForSelection={(item, index) => {
                  return item.label;
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={18}
                    />
                  );
                }}
                buttonStyle={{
                  width: "100%",
                  borderRadius: 5,
                }}
              ></SelectDropdown>
            </InputContainer>
            <InputContainer>
              <SelectDropdown
                data={userDestinyCoins}
                defaultButtonText={i18n.t("placeholder.destinationCurrency")}
                onSelect={(e) => {
                  setRequest({ ...request, moedaDestinoId: e.value });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.label;
                }}
                rowTextForSelection={(item, index) => {
                  return item.label;
                }}
                dropdownIconPosition="right"
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={18}
                    />
                  );
                }}
                buttonStyle={{
                  width: "100%",
                  borderRadius: 5,
                }}
              ></SelectDropdown>
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
                mode={"date"}
                display={"default"}
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
