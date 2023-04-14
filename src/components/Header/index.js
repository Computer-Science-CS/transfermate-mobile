import React from "react";
import { Alert, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { LogOut } from "../../redux/actions/actions";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import i18n from 'i18n-js'

import {
  Container,
  BtnBack,
  LogoContainer,
  BtnProfile,
  UserImage,
  DotProfile,
  ProfilePicture,
  ModalContainer,
  ModalTitle,
  ModalText,
  ModalButtom,
  ModalButtonBox,
  ModalOpacity
} from "./styles";

import LogoutIcon from "../../assets/images/logout-icon.js";
import BackIcon from "../../assets/images/back-icon.js";
import Logo from "../../assets/logo/logo.png";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";

const Header = ({
  backBtn,
  backBtnFunction,
  logo,
  profileBtn,
  profileBtnFunction,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false)
  const user = useSelector((state) => state.user, shallowEqual);
  const coins = useSelector((state) => state.userCoins, shallowEqual);

  const handleLogOut = async () => {
     dispatch(LogOut(navigation));
  };

  return (
    <Container>

      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        visible={modalVisible}
        style={{
          borderStartColor: 'red', justifyItems: 'center',
          alignItems: 'center'
        }}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(modalVisible);

        }}
      >
        <ModalOpacity onPress={() => setModalVisible(!modalVisible)}>
          <ModalContainer>

            <ModalTitle>{i18n.t('notifications.areyousureyouwanttoquit')}</ModalTitle>

            <ModalButtonBox style={{ flexDirection: 'row' }}>

              <ModalButtom onPress={() => setModalVisible(!modalVisible)}><ModalText>{i18n.t('notifications.deleteMatchCancel')}</ModalText></ModalButtom>
              <ModalButtom onPress={() => handleLogOut()}><ModalText style={{color: '#808eef'}}>{i18n.t('header.logout')}</ModalText></ModalButtom>

            </ModalButtonBox>

          </ModalContainer>
        </ModalOpacity>
      </Modal>
      {backBtn === true ? (
        <BtnBack onPress={backBtnFunction}>
          <Ionicons name="chevron-back" size={RFValue(20)} color="#cecece" />
        </BtnBack>
      ) : (
        <BtnBack
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <SimpleLineIcons name="logout" size={RFValue(20)} color="#cecece" />
        </BtnBack>
      )}

      <LogoContainer>
        {logo === true ? (
          <>
            <Image
              source={Logo}
              resizeMode="contain"
              style={{ width: RFValue(180) }}
            />
          </>
        ) : (
          <></>
        )}
      </LogoContainer>

      <BtnProfile onPress={profileBtnFunction}>
        {profileBtn === true ? (
          <>
            {coins.length === 0 ? <DotProfile /> : <></>}
            {user.fotoUrl && user.fotoUrl !== "" ? (
              <ProfilePicture source={{ uri: user.fotoUrl }} />
            ) : (
              <UserImage>
                <Ionicons name="person" size={25} color="#101957" />
              </UserImage>
            )}
          </>
        ) : (
          <></>
        )}
      </BtnProfile>
    </Container>
  );
};

export default Header;
