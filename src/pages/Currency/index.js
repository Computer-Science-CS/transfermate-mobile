import React, { useEffect, useState } from "react";
import { Pressable, FlatList } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import getSymbolFromCurrency from "currency-symbol-map";
import i18n from "i18n-js";

import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  ButtonHeaderContainer,
  ButtonHeader,
  TextButtonHeader,
  MainCoinContainer,
  CoinBtn,
  CoinIconText,
  CheckboxContainer,
  Checkbox,
  CoinTitleContainer,
  CoinTitle,
  CoinIconContainer,
  CoinIcon,
  BtnContainer,
  TextBtn,
} from "./styles";

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { BtnLight } from "../../components/ButtonLight";

import coinRepository from "../../services/coinRepository/coinRepository";
import userRepository from "../../services/userRepository/userRepository";
import { getUserCoins, getMatchesAvailable } from "../../redux/actions/actions";
import { RFValue } from "react-native-responsive-fontsize";

export default function Currency() {
  const navigation = useNavigation();

  const user = useSelector((state) => state.login, shallowEqual);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("originCurrency");
  const [coins, setCoins] = useState([]);
  const [copyUserCoins, setCopyUserCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadUserCoins() {
    userRepository
      .getUserCoins(user.usuario?.id)
      .then((response) => {
        //console.log(response.data.data)
        setCopyUserCoins(response.data.data);
      })
      .catch((error) => {
        console.log("entrou");
      });
  }

  const handleSubmit = () => {
    setLoading(true);
    let data = {
      usuarioId: user.usuario.id,
      origem: [],
      destino: [],
    };

    copyUserCoins.map((userCoin) => {
      userCoin.tipoMoeda === "O"
        ? data.origem.push(userCoin.moedaId)
        : data.destino.push(userCoin.moedaId);
    });

    if (data.origem.length === 0 && data.destino.length > 0) {
      setLoading(false);
      showMessage({
        type: "danger",
        message: i18n.t("notifications.currencyDangerOrigin"),
        icon: { icon: "danger", position: "right" },
        titleStyle: { fontSize: 16, textAlign: "center" },
        hideOnPress: true,
        duration: 5000,
      });
      return;
    }

    if (data.origem.length === 0 && data.destino.length === 0) {
      setLoading(false);
      showMessage({
        type: "danger",
        message: i18n.t("notifications.currencyDangerBoth"),
        icon: { icon: "danger", position: "right" },
        titleStyle: { fontSize: 16, textAlign: "center" },
        hideOnPress: true,
        duration: 5000,
      });
      return;
    }

    if (data.origem.length > 0 && data.destino.length === 0) {
      setLoading(false);
      showMessage({
        type: "danger",
        message: i18n.t("notifications.currencyDangerDestiny"),
        icon: { icon: "danger", position: "right" },
        titleStyle: { fontSize: 16, textAlign: "center" },
        hideOnPress: true,
        duration: 5000,
      });
      return;
    }
    userRepository
      .saveUserCoins(data)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(getUserCoins(user.usuario?.id));
          dispatch(getMatchesAvailable(user.usuario?.id));
          setLoading(false);
          showMessage({
            type: "success",
            message: i18n.t("notifications.currencySuccess"),
            icon: { icon: "success", position: "right" },
            titleStyle: { fontSize: 16, textAlign: "center" },
            hideOnPress: true,
            duration: 5000,
          });
          navigation.navigate('Home')
        }
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          type: "danger",
          message: i18n.t("notifications.currencyError"),
          icon: { icon: "danger", position: "right" },
          titleStyle: { fontSize: 16, textAlign: "center" },
          hideOnPress: true,
          duration: 5000,
        });
      })
      
  };

  const handleCheckCoin = (id, type) => {
    //&& activeTab === "originCurrency"
    if (type === "O" ) {
      const findCoin = copyUserCoins.findIndex(
        (coin) => coin.moedaId === id && coin.tipoMoeda === "O"
      );

      if (findCoin >= 0) {
        setCopyUserCoins(
          copyUserCoins.filter((item, index) => {
            return index !== findCoin;
          })
        );
      } else {
        setCopyUserCoins([
          ...copyUserCoins,
          { id: id, moedaId: id, tipoMoeda: type },
        ]);
      }
      //&& activeTab === "destinyCurrency"
    } else if (type === "D" ) {
      const findCoin = copyUserCoins.findIndex(
        (coin) => coin.moedaId === id && coin.tipoMoeda === "D"
      );
      if (findCoin >= 0) {
        setCopyUserCoins(
          copyUserCoins.filter((item, index) => {
            return index !== findCoin;
          })
        );
      } else {
        setCopyUserCoins([
          ...copyUserCoins,
          { id: id, moedaId: id, tipoMoeda: type },
        ]);
      }
    }
    
  };

  const renderItem = ({ item, index }) => {
    return (
      <CoinBtn
        key={item.id}
        onPress={() => {
          activeTab === "originCurrency"
            ? handleCheckCoin(item.id, "O")
            : handleCheckCoin(item.id, "D");
        }}
      >
        <CheckboxContainer>
          <Checkbox>
            {copyUserCoins.map((coin) => {
              if (coin.tipoMoeda === "O" && activeTab === "originCurrency") {
                return (
                  coin.moedaId === item.id && (
                    <FontAwesome5
                      key={coin.id}
                      name="check"
                      size={RFValue(10)}
                      color="white"
                    />
                  )
                );
              } else if (
                coin.tipoMoeda === "D" &&
                activeTab === "destinyCurrency"
              ) {
                return (
                  coin.moedaId === item.id && (
                    <FontAwesome5
                      key={coin.id}
                      name="check"
                      size={RFValue(10)}
                      color="white"
                    />
                  )
                );
              } else {
                return null;
              }
            })}
          </Checkbox>
        </CheckboxContainer>

        <CoinTitleContainer>
          <CoinTitle>{item.nome}</CoinTitle>
        </CoinTitleContainer>

        <CoinIconContainer>
          <CoinIcon>
            <CoinIconText>{getSymbolFromCurrency(item.simbolo)}</CoinIconText>
          </CoinIcon>
        </CoinIconContainer>
      </CoinBtn>
    );
  };

  const loadCoins = () => {
    setLoading(true);
    coinRepository.getCoins().then((response) => {
      setCoins(response.data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadCoins();
    const unsubscribe = navigation.addListener("focus", () => {
      loadUserCoins();
    });
    return unsubscribe;
  }, [navigation, user.usuario.id]);

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
      <GradientContainer colors={["#0B5393", "#041452"]}>
        <TitleHeaderContainer>
          <TextTitle>
            {i18n.t("personProfileScreen.currencyScreen.currency")}
          </TextTitle>
        </TitleHeaderContainer>

        <ButtonHeaderContainer>
          <ButtonHeader
            onPress={() => {
              setActiveTab("originCurrency");
            }}
            style={[
              activeTab === "originCurrency" && {
                backgroundColor: "rgba(0, 19, 135, 0.7)",
              },
              { width: 120, justifyContent: "center", alignItems: "center" },
            ]}
          >
            <TextButtonHeader>
              {i18n.t("personProfileScreen.currencyScreen.originCurrency")}
            </TextButtonHeader>
          </ButtonHeader>

          <ButtonHeader
            onPress={() => {
              setActiveTab("destinyCurrency");
            }}
            style={[
              activeTab === "destinyCurrency" && {
                backgroundColor: "rgba(0, 19, 135, 0.7)",
              },
              { width: 120, justifyContent: "center", alignItems: "center" },
            ]}
          >
            <TextButtonHeader>
              {i18n.t("personProfileScreen.currencyScreen.destinationCurrency")}
            </TextButtonHeader>
          </ButtonHeader>
        </ButtonHeaderContainer>

        <MainCoinContainer>
          <FlatList
            data={coins}
            renderItem={renderItem}
            columnWrapperStyle={{
              justifyContent: "space-around",
              padding: 0,
            }}
            numColumns={3}
          />
        </MainCoinContainer>

        <BtnContainer>
          <BtnLight
            handleFunction={() => {
              handleSubmit();
            }}
          >
            <TextBtn>{i18n.t("personProfileScreen.profile.edit")}</TextBtn>
          </BtnLight>
        </BtnContainer>
      </GradientContainer>
    </>
  );
}
