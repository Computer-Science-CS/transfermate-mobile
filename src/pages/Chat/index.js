import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import i18n from "i18n-js";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import Header from "../../components/Header";

import SearchGreyIcon from "../../assets/images/searchgrey-icon.js";
import SearchBlueIcon from "../../assets/images/searchblue-icon.js";
import EmptyChatIcon from "../../assets/images/emptychat-icon.js";

import { getAllRequests } from "../../redux/actions/actions";

import { formatMessage } from "../../utils/formatName";

import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  SearchContainer,
  SearchInput,
  HeaderContainer,
  TextHeader,
  ListContainer,
  ExchangeListContainer,
  EmptyIconContainer,
  EmptyTextContainer,
  EmptyText,
  ContainerLoader,
  //CardMensagem
  ContainerMessage,
  MessageUserPhoto,
  ProfilePicture,
  UserImage,
  ContainerMessageUser,
  MessageUserName,
  MessagePreview,
} from "./styles";

export default function Chat() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const user = useSelector((state) => state.login, shallowEqual);
  const allRequests = useSelector((state) => state.allRequests, shallowEqual);

  const [requestSolicitations, setRequestsSolicitations] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  function handleRequest() {
    navigation.navigate("History");
  }
  useEffect(() => {
    if (isFocused) {
      dispatch(getAllRequests(user.usuario.id, setLoading));
    }
  }, [user.usuario.id, isFocused]);

  const openUserChat = (item) => {
    // dispatch(getProposeById(item.id, navigation));
    navigation.navigate("UserChat", { id: item.id });
  };

  const renderPhoto = (item) => {
    if (item.usuarioId === user.usuario?.id) {
      if (
        item.solicitacao?.usuario?.fotoUrl &&
        item.solicitacao?.usuario?.fotoUrl !== ""
      ) {
        return (
          <ProfilePicture
            source={{ uri: item.solicitacao?.usuario?.fotoUrl }}
          />
        );
      } else {
        return (
          <UserImage>
            <Ionicons name="person" size={RFValue(25)} color="#101957" />
          </UserImage>
        );
      }
    } else {
      if (item.usuario?.fotoUrl && item.usuario?.fotoUrl !== "") {
        return <ProfilePicture source={{ uri: item.usuario?.fotoUrl }} />;
      } else {
        return (
          <UserImage>
            <Ionicons name="person" size={RFValue(25)} color="#101957" />
          </UserImage>
        );
      }
    }
  };

  const renderRequest = ({ item }) => {
    if (!item.ativo) return null;
    return (
      <ContainerMessage>
        <MessageUserPhoto>{renderPhoto(item)}</MessageUserPhoto>
        <ContainerMessageUser
          onPress={() => {
            openUserChat(item);
          }}
        >
          <MessageUserName>
            {item.usuarioId === user.usuario?.id
              ? item.solicitacao?.usuario.nome
              : item.usuario.nome}
          </MessageUserName>

          <MessagePreview>
            {formatMessage(item.lastMessage.toString().trim())}
          </MessagePreview>
        </ContainerMessageUser>
      </ContainerMessage>
    );
  };

  const searchUserChat = () => {
    if (search !== "") {
      return allRequests.filter((request) => {
        if (request.usuario?.id === user.usuario?.id) {
          const itemData = request.solicitacao?.usuario?.nome
            ? request.solicitacao?.usuario?.nome.toUpperCase()
            : "".toUpperCase();
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        } else {
          const itemData = request.usuario?.nome
            ? request.usuario?.nome.toUpperCase()
            : "".toUpperCase();
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
    }
    return allRequests;
  };

  const onRefreshChat = useCallback(() => {
    setRefreshing(true);
    dispatch(getAllRequests(user.usuario.id, setLoading));
    setRefreshing(false);
  }, [refreshing, user.usuario.id]);

  useEffect(() => {
    dispatch(getAllRequests(user.usuario.id, setLoading));
  }, [user.usuario.id]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const reloadMessages = setInterval(() => {
  //       dispatch(getAllRequests(user.usuario.id, setLoading));
  //     }, 60000);
  //     return () => {
  //       clearInterval(reloadMessages);
  //     };
  //   }, [user.usuario.id])
  // )

  return (
    <>
      {/* {loading && <Loader />} */}
      <Header
        backBtn={false}
        logo={true}
        profileBtn={true}
        profileBtnFunction={() => {
          navigation.navigate("Profile");
        }}
      />
      <GradientContainer colors={["#0B5393", "#041452"]}>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          {isSearching ? (
            <>
              <SearchContainer>
                <SearchInput
                  placeholder={i18n.t("placeholder.findMessage")}
                  onChangeText={(e) => setSearch(e)}
                  value={search}
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsSearching(false);
                  }}
                >
                  <SearchBlueIcon />
                </TouchableOpacity>
              </SearchContainer>
              <HeaderContainer>
                <TextHeader>{i18n.t("chatScreen.newMessage")}</TextHeader>
              </HeaderContainer>
            </>
          ) : (
            <TitleHeaderContainer
              borderBottomColor={isSearching && "transparent"}
              borderBottomWidth={isSearching && 0}
            >
              <TextTitle>{i18n.t("chatScreen.chat")}</TextTitle>
              <TouchableOpacity
                onPress={() => {
                  setIsSearching(true);
                }}
              >
                <SearchGreyIcon />
              </TouchableOpacity>
            </TitleHeaderContainer>
          )}

          {loading ? (
            <ContainerLoader>
              <ActivityIndicator size="large" color="white" />
            </ContainerLoader>
          ) : (
            <ListContainer
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefreshChat}
                />
              }
              extraData={allRequests.reverse()}
              keyExtractor={(item) => item.id.toString()}
              data={searchUserChat()}
              renderItem={renderRequest}
              ListEmptyComponent={() => (
                <ExchangeListContainer>
                  <EmptyIconContainer>
                    <EmptyChatIcon />

                    <EmptyTextContainer>
                      <EmptyText>
                        {i18n.t("chatScreen.emptyChat")}&nbsp;
                        <EmptyText
                          onPress={handleRequest}
                          textDecoration="underline"
                          color="#808EEF"
                        >
                          {i18n.t("chatScreen.emptyChat2")}{" "}
                        </EmptyText>
                      </EmptyText>
                    </EmptyTextContainer>
                  </EmptyIconContainer>
                </ExchangeListContainer>
              )}
            />
          )}
        </KeyboardAvoidingView>
      </GradientContainer>
    </>
  );
}
