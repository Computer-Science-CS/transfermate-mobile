import React, { useState, useEffect, useRef } from "react";
import { Alert } from "react-native";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { TextInputMask } from "react-native-masked-text";
import { showMessage } from "react-native-flash-message";
import i18n from "i18n-js";
import axios from "axios";
import moment from "moment";

import * as ImagePicker from "expo-image-picker";
import * as Localization from "expo-localization";
import * as FileSystem from "expo-file-system";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import Header from "../../components/Header";
import Loader from "../../components/Loader";

import {
  GradientContainer,
  PictureContainer,
  PictureImage,
  Picture,
  ChangeImage,
  //
  FormContainer,
  TextBtn,
  BtnContainer,
  InputContainer,
  Input,
} from "./styles";

import { DDIList } from "../../utils/DDI";
import { IdentityTypeList } from "../../utils/identityType";

import { BtnLight } from "../../components/ButtonLight";
import userRepository from "../../services/userRepository/userRepository";
import countryRepository from "../../services/countryRepository/countryRepository";
import { getUserDetails } from "../../redux/actions/actions";
import { RFValue } from "react-native-responsive-fontsize";

const formatDateType =
  Localization.locale.substring(0, 2) === "pt" ? "DD/MM/YYYY" : "MM/DD/YYYY";
const formatPhoneType =
  Localization.locale.substring(0, 2) === "pt" ? "BRL" : "INTERNATIONAL";
const formatMaskPersonId = "****************************";

export default function PersonProfile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cpfMask = useRef(null);
  const customMask = useRef(null);

  const user = useSelector((state) => state.user, shallowEqual);
  const [profile, setProfile] = useState({});
  const [country, setCountry] = useState([]);
  const [date, setDate] = useState("");

  const [profilePicture, setProfilePicture] = useState({});
  const [loading, setLoading] = useState(false);
  const [DDI, setDDI] = useState("");

  const maskIdentityType = () => {
    switch (profile.identificacaoTipo) {
      case "CPF":
        return {
          maskType: "cpf",
        };
      case "PersonID":
        return {
          maskType: "custom",
          mask: "*********************************",
        };
      case "Passport" || "Passaporte":
        return {
          maskType: "custom",
          mask: "*********************************",
        };
      default:
        return {
          maskType: "custom",
          mask: "*********************************",
        };
    }
  };

  async function loadCountry() {
    const response = await countryRepository.getCountry();

    const coutry = response.data.data.map((item) => {
      return {
        key: item.id,
        label: item.nome,
        value: item.id,
      };
    });

    setCountry(coutry);
  }

  function handleUpdateProfile() {
    if (profilePicture.uri) {
      let localUri = profilePicture.uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const data = new FormData();
      data.append("file", { uri: localUri, name: filename, type });
      data.append("upload_preset", "dpuba9sf");
      data.append("cloud_name", "dpuba9sf");
      axios({
        url: "https://api.cloudinary.com/v1_1/deu49dycx/image/upload",
        method: "POST",
        data: data,
      }).then((res) => {
        userRepository
          .updateUser({
            ...profile,
            fotoUrl: res.data.url,
            dataNascimento: moment(date, formatDateType).toDate(),
          })
          .then((res) => {
            if (res.status === 200) {
              setLoading(false);
              showMessage({
                type: "success",
                message: i18n.t("personProfileScreen.profile.succesEditProfile"),
                icon: { position: "right", icon: "success" },
                titleStyle: { fontSize: 16, textAlign: "center" },
                hideOnPress: true,
                duration: 1100,
              });
              dispatch(getUserDetails(profile.id, setProfile));
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });
      return;
    }
    userRepository
      .updateUser({
        ...profile,
        dataNascimento: moment(date, formatDateType).toDate(),
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          showMessage({
            type: "success",
            message: i18n.t("personProfileScreen.profile.succesEditProfile"),
            icon: { position: "right", icon: "success" },
            titleStyle: { fontSize: 16, textAlign: "center" },
            hideOnPress: true,
            duration: 1100,
          });
          dispatch(getUserDetails(profile.id, setProfile));
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }

  async function handleUpdateProfilePicture() {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!granted) {
      const { status, granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        const { size } = await FileSystem.getInfoAsync(result.uri);
        if (size && size > 2000000) {
          Alert.alert(
            i18n.t("personProfileScreen.profile.imageSize"),
            i18n.t("personProfileScreen.profile.imageSizeMessage")
          );
          return;
        }
        setProfilePicture(result);
        return;
      }
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      const { size } = await FileSystem.getInfoAsync(result.uri);
      if (size && size > 2000000) {
        Alert.alert(
          i18n.t("personProfileScreen.profile.imageSize"),
          i18n.t("personProfileScreen.profile.imageSizeMessage")
        );
        return;
      }
      setProfilePicture(result);
    }
  }

  useEffect(() => {
    loadCountry();
    setProfile(user);
    //console.log(profile);
    if (profile.dataNascimento) setDate(moment(profile.dataNascimento).format(formatDateType));
  }, [user.id]);

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
      {loading && <Loader container={false} />}
      <GradientContainer colors={["#0B5393", "#041452"]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <PictureContainer>
            <Picture>
              {profile.fotoUrl || profilePicture?.uri ? (
                <>
                  <PictureImage
                    source={{
                      uri: profilePicture?.uri
                        ? profilePicture?.uri
                        : profile.fotoUrl,
                    }}
                  />
                </>
              ) : (
                <Ionicons name="person" size={RFValue(60)} color="#101957" />
              )}
              <ChangeImage onPress={handleUpdateProfilePicture}>
                <FontAwesome name="camera" size={RFValue(14)} color="white" />
              </ChangeImage>
            </Picture>
          </PictureContainer>

          <FormContainer>
            <InputContainer>
              <Input
                borderTopRightRadius={40}
                placeholderTextColor="#5E5E5E"
                placeholder={i18n.t("personProfileScreen.profile.fullName")}
                value={profile.nome}
                onChangeText={(e) => setProfile({ ...profile, nome: e })}
              />
            </InputContainer>

            <InputContainer>
              <Input
                borderTopRightRadius={40}
                placeholderTextColor="#5E5E5E"
                placeholder={i18n.t("personProfileScreen.profile.email")}
                value={profile.email}
                editable={false}
              />
            </InputContainer>

            <InputContainer>
              <TextInputMask
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: RFValue(40),
                  fontSize: 20,
                  color: "#3a3d43",
                  borderRadius: 5,
                  paddingLeft: 5,
                }}
                placeholderTextColor="#5E5E5E"
                placeholder={i18n.t("personProfileScreen.profile.birthDate")}
                value={date}
                onChangeText={(e) => setDate(e)}
                type={"datetime"}
                options={{
                  format: formatDateType,
                }}
              />
            </InputContainer>

            <InputContainer>
              <RNPickerSelect
                placeholder={{
                  label: `${i18n.t("personProfileScreen.profile.country")}`,
                  value: "",
                }}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroidContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    borderTopRightRadius: 40,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputAndroid: {
                    paddingLeft: 5,
                    fontSize: 20,
                    fontFamily: "sans-serif",
                    color: "#3A3D43",
                  },
                  inputIOSContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    borderTopRightRadius: 40,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputIOS: {
                    paddingLeft: 5,
                    fontSize: 20,
                    fontFamily: "Poppins_400Regular",
                    color: "#3A3D43",
                  },
                  placeholder: { color: "#5E5E5E" },
                }}
                onValueChange={(e) => {
                  setProfile({ ...profile, paisId: e });
                }}
                value={profile.paisId ? profile.paisId : '1'}
                items={country}
              />
            </InputContainer>

            <InputContainer>
              <RNPickerSelect
                placeholder={{
                  label: `${i18n.t("personProfileScreen.profile.DDI")}`,
                  value: "",
                }}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroidContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    borderTopRightRadius: 40,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputAndroid: {
                    paddingLeft: 5,
                    fontSize: 20,
                    fontFamily: "sans-serif",
                    color: "#3A3D43",
                  },
                  inputIOSContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    borderTopRightRadius: 40,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputIOS: {
                    paddingLeft: 5,
                    fontSize: 20,
                    fontFamily: "Poppins_400Regular",
                    color: "#3A3D43",
                  },
                  placeholder: { color: "#5E5E5E" },
                }}
                onValueChange={(e) => {
                  setProfile({ ...profile, ddi: e });
                }}
                value={profile.ddi ? profile.ddi : '55'}
                items={DDIList}
              />
            </InputContainer>

            {/* <InputContainer marginBottom={15}>
              <Input
                borderTopRightRadius={40}
                placeholderTextColor="#5E5E5E"
                placeholder={i18n.t("personProfileScreen.profile.country")}
              />
            </InputContainer> */}

            <InputContainer>
              <TextInputMask
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: RFValue(40),
                  fontSize: 20,
                  color: "#3a3d43",
                  borderRadius: 5,
                  paddingLeft: 5,
                }}
                keyboardType="number-pad"
                placeholderTextColor="#5E5E5E"
                placeholder={i18n.t("personProfileScreen.profile.phoneNumber")}
                value={profile.telefone}
                onChangeText={(e) => setProfile({ ...profile, telefone: e })}
                type="custom"
                options={{
                  maskType: "INTERNATIONAL",
                  mask: profile.ddi === "55" ? "(99) 99999-9999" : "9999999999999999",
                }}
              />
            </InputContainer>

            <InputContainer>
              <RNPickerSelect
                placeholder={{
                  label: `${i18n.t(
                    "personProfileScreen.profile.identityType"
                  )}`,
                  value: "",
                }}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroidContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    borderTopRightRadius: 40,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputAndroid: {
                    paddingLeft: 5,
                    fontSize: 20,
                    fontFamily: "sans-serif",
                    color: "#3A3D43",
                  },
                  inputIOSContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    borderTopRightRadius: 40,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputIOS: {
                    paddingLeft: 5,
                    fontSize: 20,
                    fontFamily: "Poppins_400Regular",
                    color: "#3A3D43",
                  },
                  placeholder: { color: "#5E5E5E" },
                }}
                onValueChange={(e) => {
                  setProfile({ ...profile, identificacaoTipo: e });
                }}
                value={profile.identificacaoTipo}
                items={IdentityTypeList}
              />
            </InputContainer>

            <InputContainer>
              <Input
                borderTopRightRadius={40}
                placeholderTextColor="#5E5E5E"
                placeholder={i18n.t("personProfileScreen.profile.identity")}
                value={profile.identificacao}
                onChangeText={(e) =>
                  setProfile({ ...profile, identificacao: e })
                }
              />
            </InputContainer>

            <InputContainer>
              <RNPickerSelect
                placeholder={{
                  label: `${i18n.t(
                    "personProfileScreen.profile.genderType.gender"
                  )}`,
                  value: "",
                }}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroidContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    borderTopRightRadius: 40,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputAndroid: {
                    paddingLeft: 5,
                    fontSize: RFValue(20),
                    fontFamily: "sans-serif",
                    color: "#3A3D43",
                  },
                  inputIOSContainer: {
                    height: RFValue(40),
                    borderRadius: 5,
                    borderTopRightRadius: 40,
                    backgroundColor: "#fcfcfc",
                    justifyContent: "center",
                  },
                  inputIOS: {
                    paddingLeft: 5,
                    fontSize: RFValue(15),
                    fontFamily: "Poppins_400Regular",
                    color: "#3A3D43",
                  },
                  placeholder: { color: "#5E5E5E" },
                }}
                onValueChange={(e) => {
                  setProfile({ ...profile, genero: e });
                }}
                value={profile.genero}
                items={[
                  {
                    label: `${i18n.t(
                      "personProfileScreen.profile.genderType.male"
                    )}`,
                    value: "Masculino",
                  },
                  {
                    label: `${i18n.t(
                      "personProfileScreen.profile.genderType.female"
                    )}`,
                    value: "Feminino",
                  },
                  {
                    label: `${i18n.t(
                      "personProfileScreen.profile.genderType.others"
                    )}`,
                    value: "Outros",
                  },
                  {
                    label: `${i18n.t(
                      "personProfileScreen.profile.genderType.prefered"
                    )}`,
                    value: "Prefiro não dizer",
                  },
                ]}
              />
            </InputContainer>

            <InputContainer>
              <Input
                height={RFValue(100)}
                multiline={true}
                placeholderTextColor="#5E5E5E"
                placeholder={i18n.t("personProfileScreen.profile.description")}
                value={profile.descricao}
                onChangeText={(e) => setProfile({ ...profile, descricao: e })}
              />
            </InputContainer>
          </FormContainer>

          <BtnContainer>
            <BtnLight handleFunction={handleUpdateProfile}>
              <TextBtn>{i18n.t("personProfileScreen.profile.edit")}</TextBtn>
            </BtnLight>
          </BtnContainer>
        </KeyboardAwareScrollView>
      </GradientContainer>
    </>
  );
}
