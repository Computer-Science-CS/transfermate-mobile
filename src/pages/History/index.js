import React, { useState, useEffect } from "react";
import { Alert, RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import i18n from "i18n-js";
import "firebase/firestore";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import getSymbolFromCurrency from "currency-symbol-map";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import Loader from "../../components/Loader";
import Header from "../../components/Header";
import CardInfo from "../../components/CardInfo";
import ModalCard from "../../components/Modal";
import Checkbox from "../../components/Checkbox";

import OrderIcon from "../../assets/images/order-icon.js";
import FilterIcon from "../../assets/images/filter-icon.js";
import EmptyMyMatchIcon from "../../assets/images/emptymymatch-icon";
import EmptyrequestIcon from "../../assets/images/emptyrequest-icon.js";
import StarRateIcon from "../../assets/images/PopRating/starRate-icon.js";

import { getUserCoins, getMySolicitations } from "../../redux/actions/actions";

import coinRepository from "../../services/coinRepository/coinRepository";
import requestRepository from "../../services/requestRepository/requestRepository";
import evaluationRepository from "../../services/evaluationRepository/evaluationRepository";
import notificationRepository from "../../services/notificationRepository/notificationRepository";
import requestSolicitationRepository from "../../services/requestSolicitationRepository/requestSolicitationRepository";

import { formatCurrency } from "../../utils/format";
import { formatMessage } from "../../utils/formatName";
import { formatter } from '../../utils/moneyFormat'

import {
  GradientContainer,
  TitleHeaderContainer,
  BtnHeaderMenu,
  TextTitle,
  ButtonHeaderContainer,
  IconsHeaderContainer,
  TextButtonHeader,
  ExchangeListContainer,
  ListContainer,
  EmptyIconContainer,
  EmptyTextContainer,
  EmptyText,
  // Order and filter
  FilteredContainer,
  OptionsContainer,
  ModalClose,
  Options,
  InputSearch,
  Star,
  ModalStar,
  TitleOrderContainer,
  TextTitleOrder,
  OrderContainer,
  TextOptionsTitle,
} from "./styles";

const sortNumber = (a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
};

const orderMiddleware = {
  dataCadastro: (a, b) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return sortNumber(dateA, dateB);
  },
  valorCentavos: sortNumber,
  usuario: (a, b) => sortNumber(a.ratting, b.ratting),
};

const filterMiddleware = {
  value: (item, [min, max]) => {
    console.log(item.valorCentavos)
    return (
      item.valorCentavos >= (min ? parseFloat(min) : 0) &&
      (max ? item.valorCentavos <= parseFloat(max) : true)
    );
  },
  coins: (item, selectedCoins) => {
    return selectedCoins.length === 0
      ? true
      : selectedCoins.includes(item.moedaOrigem.id);
  },
  stars: (item, selectedStars) => {
    return selectedStars === 0 ? true : item.usuario.ratting <= selectedStars;
  },
};

export default function History() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const login = useSelector((state) => state.login, shallowEqual);

  const myOrders = useSelector((state) => state.myOrders, shallowEqual);
  const coins = useSelector((state) => state.userCoins, shallowEqual);

  const [order, setOrder] = useState({ key: "dataCadastro", value: "desc" });
  const [myMatchs, setMyMatchs] = useState([]);
  const [filtered, setFiltered] = useState({
    coins: [],
    value: [null, null],
    stars: 0,
  });

  const [filteredOrders, setFilteredOrders] = useState(myOrders);

  const [loading, setLoading] = useState(false);

  const [refreshingMatchs, setRefreshingMatchs] = useState(false);

  const [loadginEvaluation, setLoadingEvaluation] = useState(false);

  const [myOrderRequests, setMyOrderRequests] = useState([]);

  const [itemProposalEvaluation, setItemProposalEvaluation] = useState({});
  const [type, setType] = useState("");
  const [evaluationResponseTime, setEvaluationResponseTime] = useState(0);
  const [starsSelected, setStarsSelected] = useState(0);
  const [responseQuestionOne, setResponseQuestionOne] = useState("");
  const [responseQuestionTwo, setResponseQuestionTwo] = useState("");
  const [errorRequired, setErrorRequired] = useState(false);

  const [activeTab, setActiveTab] = useState("myMatchs");
  const [isOrdered, setIsOrdered] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const [isModalRating, setModalRating] = useState(false);
  const [isModalProposal, setModalProposal] = useState(false);

  const toggleModalRating = (item, type) => {
    setModalRating(!isModalRating);
    setItemProposalEvaluation(item);
    setType(type);
  };

  const toggleModalBid = (item) => {
    setModalProposal(!isModalProposal);
    setMyOrderRequests(item);
  };

  function handleHome() {
    navigation.navigate("Home");
  }

  function handleRequest() {
    navigation.navigate("Request");
  }

  function handleSendNewNotification(token, title, message) {
    let data = {
      to: token,
      sound: "default",
      title: title,
      body: message,
      data: { msg: message, title: title, id: 2, type: "proposal" },
      channelId: "messages",
      _displayInForeground: true,
      priority: "high",
    };
    return notificationRepository.sendNewProposalNotication(data);
  }

  const fetchAllRequisitions = async () => {
    setLoading(true);
    try {
      const promise = await requestSolicitationRepository
        .getRequestsSolicitationsByUser(login.usuario.id)
        .then(async (response) => {
          const mySolicitations = await Promise.all(
            response.data.data.map(async (mySolicitation) => {
              return {
                ...mySolicitation,
                moedaDestino: await (
                  await coinRepository.getCoinById(
                    mySolicitation.solicitacao.moedaDestinoId
                  )
                ).data.data,
                moedaOrigem: await (
                  await coinRepository.getCoinById(
                    mySolicitation.solicitacao.moedaOrigemId
                  )
                ).data.data,
              };
            })
          );
          return mySolicitations;
        });

      Promise.all([promise]).then((res) => {
        setMyMatchs(res[0]);
        setLoading(false);
      });
    } catch (error) {}
  };

  const refreshMyMatchs = React.useCallback(async () => {
    setRefreshingMatchs(true);
    getMyMatchesTrades();
  }, [refreshingMatchs, login.usuario.id]);

  useEffect(() => {
    refreshMyMatchs()
  }, [activeTab])

  const getMyMatchesTrades = () => {
    requestSolicitationRepository
      .getRequestsSolicitationsByUser(login.usuario.id)
      .then(async (response) => {
        const myMatchs = await Promise.all(
          response.data.data.map(async (mySolicitation) => {
            return {
              ...mySolicitation,
              moedaDestino: await (
                await coinRepository.getCoinById(
                  mySolicitation.solicitacao.moedaDestinoId
                )
              ).data.data,
              moedaOrigem: await (
                await coinRepository.getCoinById(
                  mySolicitation.solicitacao.moedaOrigemId
                )
              ).data.data,
            };
          })
        );
        setMyMatchs(myMatchs);
        setRefreshingMatchs(false);
      })
      .catch((error) => {
        console.log("entrou3");
      });
  };

  // Realizar avaliação
  const handleSetEvaluationRequest = () => {
    if (responseQuestionTwo === "") {
      setErrorRequired(true);
      return;
    }

    setModalRating(false);
    setLoadingEvaluation(true);
    setErrorRequired(true);

    let data = {
      pergunta1: "Qual foi o câmbio dessa transaçäo?",
      resposta1: "Teste",
      pergunta2: "Deseja fazer um comentário?",
      resposta2: responseQuestionTwo,
      avaliacaoGeral: starsSelected,
      avaliacaoTempoResposta: evaluationResponseTime,
      usuarioId: login.usuario.id,
    };

    if (type === "solicitation") {
      const transaction = itemProposalEvaluation.propostas.find(
        (p) => p.status === 3
      );
      data.transacaoId = transaction?.transacao.id;
      evaluationRepository
        .setEvaluationRequestPropose(data)
        .then((res) => {
          if (res.status === 200) {
            if (itemProposalEvaluation.usuario?.pushNotificationId) {
              handleSendNewNotification(
                itemProposalEvaluation.usuario?.pushNotificationId,
                `${i18n.t("notifications.rating")}`,
                `${i18n.t("notifications.ratingMessage")}`
              );
            }
            setResponseQuestionOne("");
            setResponseQuestionTwo("");
            setStarsSelected(0);
            setEvaluationResponseTime(0);
            setLoadingEvaluation(false);
            setItemProposalEvaluation({});
            showMessage({
              type: "success",
              message: i18n.t("notifications.ratingSucces"),
              icon: { icon: "success", position: "right" },
              titleStyle: { fontSize: 16, textAlign: "center" },
              hideOnPress: true,
              duration: 5000,
            });
          }
        })
        .catch((error) => {
          setLoadingEvaluation(false);
        });
    } else {
      data.transacaoId = itemProposalEvaluation.transacao.id;
      evaluationRepository
        .setEvaluationRequestPropose(data)
        .then(async (res) => {
          if (res.status === 200) {
            if (
              itemProposalEvaluation.solicitacao?.usuario?.pushNotificationId
            ) {
              await handleSendNewNotification(
                itemProposalEvaluation.solicitacao?.usuario?.pushNotificationId,
                `${i18n.t("notifications.rating")}`,
                `${i18n.t("notifications.ratingMessage")}`
              );
            }
            setResponseQuestionOne("");
            setResponseQuestionTwo("");
            setStarsSelected(0);
            setEvaluationResponseTime(0);
            setLoadingEvaluation(false);
            setErrorRequired(false);
            setItemProposalEvaluation({});
            showMessage({
              type: "success",
              message: i18n.t("notifications.ratingSucces"),
              icon: { icon: "success", position: "right" },
              titleStyle: { fontSize: 16, textAlign: "center" },
              hideOnPress: true,
              duration: 5000,
            });
            getMyMatchesTrades();
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error.response);
            setResponseQuestionOne("");
            setResponseQuestionTwo("");
            setStarsSelected(0);
            setEvaluationResponseTime(0);
            setLoadingEvaluation(false);
            setItemProposalEvaluation({});
            setLoadingEvaluation(false);
            setErrorRequired(false);
            showMessage({
              type: "danger",
              message: i18n.t("notifications.ratingDanger"),
              icon: { icon: "danger", position: "right" },
              titleStyle: { fontSize: 16, textAlign: "center" },
              hideOnPress: true,
              duration: 5000,
            });
          }
        });
    }
  };

  // Deletar um match
  const deleteMatch = (id) => {
    Alert.alert(
      `${i18n.t("notifications.deleteMatch")}`,
      `${i18n.t("notifications.deleteMatchMessage1")}`,
      [
        {
          text: i18n.t("notifications.deleteMatchCancel"),
        },
        {
          text: i18n.t("notifications.deleteMatchOk"),
          onPress: () => {
            setLoadingEvaluation(true);
            requestSolicitationRepository
              .deleteRequestSolicitation(id)
              .then((res) => {
                if (res.status === 200) {
                  setLoadingEvaluation(false);
                  showMessage({
                    type: "success",
                    message: i18n.t("notifications.deleteMatchSuccess"),
                    icon: { icon: "success", position: "right" },
                    titleStyle: { fontSize: 16, textAlign: "center" },
                    hideOnPress: true,
                    duration: 5000,
                  });
                  fetchAllRequisitions();
                }
              })
              .catch(() => {
                setLoadingEvaluation(false);
                showMessage({
                  type: "danger",
                  message: i18n.t("notifications.deleteMacthError"),
                  icon: { icon: "danger", position: "right" },
                  titleStyle: { fontSize: 16, textAlign: "center" },
                  hideOnPress: true,
                  duration: 5000,
                });
              });
          },
        },
      ]
    );
  };

  // Deletar uma solicitação
  const deleteSolicitation = async (item) => {
    Alert.alert(
      `${i18n.t("notifications.deleteMatch")}`,
      `${i18n.t("notifications.deleteMatchMessage2")}`,
      [
        {
          text: i18n.t("notifications.deleteMatchCancel"),
        },
        {
          text: i18n.t("notifications.deleteMatchOk"),
          onPress: () => {
            setLoadingEvaluation(true);
            if (item.propostas.filter((p) => p.ativo === true).length > 0) {
              deleteRequestSolicitations(item.propostas).then(() => {
                requestRepository.deleteRequestById(item.id).then((res) => {
                  if (res.status === 200) {
                    setLoadingEvaluation(false);
                    fetchAllRequisitions();
                    dispatch(getMySolicitations(login.usuario.id));
                  }
                });
              });
            } else {
              requestRepository.deleteRequestById(item.id).then((res) => {
                if (res.status === 200) {
                  setLoadingEvaluation(false);
                  fetchAllRequisitions();
                  dispatch(getMySolicitations(login.usuario.id));
                }
              });
            }
          },
        },
      ]
    );
  };

  // Renderiza um match
  const renderMyMatchs = ({ item }) => {
    if (!item.ativo) return null;
    console.log(item)
    return (
      
      <CardInfo
        cardRender="myMatchs"
        match={{
          nome: item.solicitacao.usuario.nome,
          moedaOrigemSimbolo: getSymbolFromCurrency(item.moedaOrigem?.simbolo),
          moedaDestinoSimbolo: getSymbolFromCurrency(item.moedaDestino?.simbolo),
          moedaOrigemNome: item.moedaOrigem?.nome,
          moedaDestinoNome: item.moedaDestino.nome,
          valor: formatter.format(item.solicitacao.valorCentavos).replace(/[^0-9.-]+/, ""),
          fotoUrl: item.solicitacao.usuario.fotoUrl,
          dataDisponibilidade: moment(
            item.solicitacao.dataDisponibilidade
          ).format("DD/MM/YYYY"),
          avaliacaoDisponivel: item?.transacao?.status === 5,
          pontuacao: item.solicitacao.usuario.ratting,
          totalAvaliacoes: item.solicitacao.usuario.avaliacoes,
        }}
        requestCoinSymbol={getSymbolFromCurrency(item.moedaDestino.simbolo)}
        handleRating={() => {
          toggleModalRating(
            {
              transacao: item.transacao,
              usuario: item.solicitacao?.usuario,
              moedaDestino: item.moedaDestino,
              moedaOrigem: item.moedaOrigem,
              valorSolicitacaoInicial: item.transacao?.valorSolicitacaoInicial,
              valorPropostaFinal: item.transacao?.valorPropostaFinal,
            },
            "proposal"
          );
        }}
        handleBid={() => {
          navigation.navigate("UserChat", { id: item.id });
        }}
        deleteMatch={() => {
          deleteMatch(item.id);
        }}
      />
    );
  };

  // Renderiza uma solicitação
  const renderMyRequest = ({ item }) => {
    if (!item.ativo) return null;
    return (
      <CardInfo
        proposal={{
          totalPropostas: item.propostas.filter((p) => p.ativo === true).length,
          propostaAceita: item.propostas.find((p) => p.status === 3),
          usuarioPropostaAceita: item.propostas.find((p) => p.status === 3),
          moedaOrigemSimbolo: getSymbolFromCurrency(item.moedaOrigem.simbolo),
          moedaDestinoSimbolo: getSymbolFromCurrency(item.moedaDestino.simbolo),
          moedaDestinoNome: item.moedaDestino.nome,
          moedaOrigemNome: item.moedaOrigem.nome,
          valor: formatter.format(item.valorCentavos).replace(/[^0-9.-]+/, ""),
          dataDisponibilidade: moment(item.dataDisponibilidade).format(
            "DD/MM/YYYY"
          ),
        }}
        cardRender="myRequests"
        userPhoto={item.usuario.fotoUrl}
        handleRating={() => {
          toggleModalRating(
            {
              propostas: item.propostas,
              usuario: item.propostas[0]?.usuario,
              moedaDestino: item.moedaDestino,
              moedaOrigem: item.moedaOrigem,
              valorSolicitacaoInicial:
                item.propostas[0]?.transacao?.valorSolicitacaoInicial,
              valorPropostaFinal:
                item.propostas[0]?.transacao?.valorPropostaFinal,
            },
            "solicitation"
          );
        }}
        handleBid={() => {
          toggleModalBid(item.propostas.filter((p) => p.ativo === true));
        }}
        handleTransaction={() => {
          navigation.navigate("UserChat", {
            id: item.propostas.find((p) => p.status === 3).id,
          });
        }}
        deleteSolicitation={() => {
          deleteSolicitation(item);
        }}
      />
    );
  };

  // Renderiza uma proposta dentro de uma solicitação
  const renderMyRequestSolicitations = ({ item }) => {
    return (
      <CardInfo
        openUserChat={() => {
          openUserChat(item);
        }}
        userPhoto={item.usuario.fotoUrl}
        userNameRequest={item.usuario.nome}
        userAvaliation={
          item.usuario.ratting ? item.usuario.ratting.toFixed(1) : 0
        }
        userTotalAvaliation={item.usuario.avaliacoes ? item.usuario.avaliacoes : 0}
        userTotalTransaction={item.usuario.transacoesRealizadas ? item.usuario.transacoesRealizadas : 0}
        lastMessage={formatMessage(item.lastMessage)}
        cardRender="exchangeBid"
      />
    );
  };

  const openUserChat = (item) => {
    setModalProposal(false);
    // dispatch(getProposeById(item.id, navigation));
    navigation.navigate("UserChat", { id: item.id });
  };

  const deleteRequestSolicitations = async (propostas) => {
    return Promise.all(propostas.map((p) => deleteRequestSolicitation(p.id)));
  };

  const deleteRequestSolicitation = async (id) => {
    return await requestSolicitationRepository.deleteRequestSolicitation(id);
  };

  // Renderiza meus matchs
  const renderMyMatch = () => {
    return (
      <>
        <ListContainer
          refreshControl={
            <RefreshControl
              refreshing={refreshingMatchs}
              onRefresh={refreshMyMatchs}
            />
          }
          data={myMatchs}
          renderItem={renderMyMatchs}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <ExchangeListContainer>
              <EmptyIconContainer>
                <EmptyMyMatchIcon />

                <EmptyTextContainer>
                  <EmptyText>
                    {i18n.t("home.myMatchs.message")}&nbsp;
                    <EmptyText
                      onPress={handleHome}
                      textDecoration="underline"
                      color="#808EEF"
                    >
                      {i18n.t("home.myMatchs.message2")}
                    </EmptyText>
                    &nbsp;{i18n.t("home.myMatchs.message3")}
                  </EmptyText>
                </EmptyTextContainer>
              </EmptyIconContainer>
            </ExchangeListContainer>
          )}
        />
      </>
    );
  };

  // Renderiza minhas solicitações
  const renderMyOrders = () => {
    return (
      <>
        <ListContainer
          data={filteredOrders}
          renderItem={renderMyRequest}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <ExchangeListContainer>
              <EmptyIconContainer>
                <EmptyrequestIcon />

                <EmptyTextContainer>
                  <EmptyText>
                    {i18n.t("home.myRequests.message")}&nbsp;
                    <EmptyText
                      onPress={handleRequest}
                      textDecoration="underline"
                      color="#808EEF"
                    >
                      {i18n.t("home.myRequests.message2")}
                    </EmptyText>
                  </EmptyText>
                </EmptyTextContainer>
              </EmptyIconContainer>
            </ExchangeListContainer>
          )}
        />

        {/* Ver propostas */}
        <ModalCard
          modalRender="modalBid"
          onBackdropPress={() => {
            setModalProposal(false);
          }}
          onClose={() => {
            setModalProposal(false);
          }}
          isVisible={isModalProposal}
        >
          <ListContainer
            bounces={false}
            data={myOrderRequests.sort((a, b) => {
              return (
                a.usuario.nome.toLowerCase() > b.usuario.nome.toLowerCase()
              );
            })}
            renderItem={renderMyRequestSolicitations}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <ExchangeListContainer>
                <EmptyTextContainer>
                  <EmptyText>
                    {i18n.t("home.myRequests.emptyRequest")}
                  </EmptyText>
                </EmptyTextContainer>
              </ExchangeListContainer>
            )}
          />
        </ModalCard>
      </>
    );
  };

  // Renderiza todas as telas
  const renderScreen = () => {
    switch (activeTab) {
      case "myMatchs":
        return renderMyMatch();

      case "myRequests":
        return renderMyOrders();

      default:
        return null;
    }
  };

  const renderModalOrder = () => {
    return (
      <ModalCard
        modalRender="orderModal"
        isVisible={isOrdered}
        onBackdropPress={() => setIsOrdered(false)}
      >
        <OrderContainer>
          <TitleOrderContainer>
            <TextTitleOrder>{i18n.t("home.orderMenu.orderBy")}</TextTitleOrder>

            <ModalClose paddingLeft={20} onPress={() => setIsOrdered(false)}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={RFValue(24)}
                color="#808eef"
              />
            </ModalClose>
          </TitleOrderContainer>

          <Checkbox
            checked={order.value === "desc" && order.key === "valorCentavos"}
            onChange={(checked) => {
              checked
                ? setOrder({ key: "valorCentavos", value: "desc" })
                : setOrder({ key: "dataCadastro", value: "desc" });
            }}
            text={i18n.t("home.orderMenu.highestValue")}
          />

          <Checkbox
            checked={order.value === "asc" && order.key === "valorCentavos"}
            onChange={(checked) => {
              checked
                ? setOrder({ key: "valorCentavos", value: "asc" })
                : setOrder({ key: "dataCadastro", value: "desc" });
            }}
            text={i18n.t("home.orderMenu.lowerValue")}
          />

          <Checkbox
            checked={order.value === "desc" && order.key === "usuario"}
            onChange={(checked) => {
              checked
                ? setOrder({ key: "usuario", value: "desc" })
                : setOrder({ key: "dataCadastro", value: "desc" });
            }}
            text={i18n.t("home.orderMenu.crescentRating")}
          />

          <Checkbox
            checked={order.value === "asc" && order.key === "usuario"}
            onChange={(checked) => {
              checked
                ? setOrder({ key: "usuario", value: "asc" })
                : setOrder({ key: "dataCadastro", value: "desc" });
            }}
            text={i18n.t("home.orderMenu.decreasingRating")}
          />

          <Checkbox
            checked={order.value === "desc" && order.key === "dataCadastro"}
            onChange={(checked) => {
              checked
                ? setOrder({ key: "dataCadastro", value: "desc" })
                : setOrder({ key: "dataCadastro", value: "desc" });
            }}
            text={i18n.t("home.orderMenu.newerOrder")}
          />

          <Checkbox
            checked={order.value === "asc" && order.key === "dataCadastro"}
            onChange={(checked) => {
              checked
                ? setOrder({ key: "dataCadastro", value: "asc" })
                : setOrder({ key: "dataCadastro", value: "desc" });
            }}
            text={i18n.t("home.orderMenu.olderOrder")}
          />
        </OrderContainer>
      </ModalCard>
    );
  };

  const renderModalFilter = () => {
    return (
      <ModalCard
        modalRender="filterModal"
        isVisible={isFiltered}
        onBackdropPress={() => setIsFiltered(false)}
      >
        <FilteredContainer>
          <TitleOrderContainer>
            <ModalClose paddingRight={20} onPress={() => setIsFiltered(false)}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={RFValue(24)}
                color="#808eef"
              />
            </ModalClose>
            <TextTitleOrder>
              {i18n.t("home.filterMenu.filterBy")}
            </TextTitleOrder>
          </TitleOrderContainer>

          <OptionsContainer>
            <TextOptionsTitle>
              {i18n.t("home.filterMenu.value")}
            </TextOptionsTitle>

            <InputSearch
              keyboardType="number-pad"
              value={filtered.value[0]}
              onChangeText={(e) =>
                setFiltered((prev) => ({
                  ...prev,
                  value: [e, prev.value[1]],
                }))
              }
              placeholder="Min.:"
            />

            <InputSearch
              keyboardType="number-pad"
              value={filtered.value[1]}
              onChangeText={(e) =>
                setFiltered((prev) => ({
                  ...prev,
                  value: [prev.value[0], e],
                }))
              }
              placeholder="Máx.:"
            />
          </OptionsContainer>

          <OptionsContainer>
            <TextOptionsTitle>
              {i18n.t("home.filterMenu.rating")}
            </TextOptionsTitle>

            <Star>
              {[1, 2, 3, 4, 5].map((s, i) => (
                <ModalStar
                  key={i}
                  onPress={() => {
                    filtered.stars === s
                      ? setFiltered((prev) => ({ ...prev, stars: 0 }))
                      : setFiltered((prev) => ({
                          ...prev,
                          stars: i + 1,
                        }));
                  }}
                >
                  <StarRateIcon key={i} selected={i < filtered.stars} />
                </ModalStar>
              ))}
            </Star>
          </OptionsContainer>

          <OptionsContainer flex={2}>
            <TextOptionsTitle fontFamily="Quicksand_600SemiBold">
              {i18n.t("home.filterMenu.currency")}
            </TextOptionsTitle>

            {coins
              .filter((coin) => coin.tipoMoeda === "D")
              .map((coin) => {
                return (
                  <Options key={coin.moedaId}>
                    <Checkbox
                      text={coin.moeda.nome}
                      onChange={(checked) => {
                        const setCoins = new Set(filtered.coins);
                        checked
                          ? setCoins.add(coin.moedaId)
                          : setCoins.delete(coin.moedaId);
                        setFiltered((prev) => ({
                          ...prev,
                          coins: Array.from(setCoins),
                        }));
                      }}
                      checked={filtered.coins.includes(coin.moedaId)}
                    />
                  </Options>
                );
              })}
          </OptionsContainer>
        </FilteredContainer>
      </ModalCard>
    );
  };

  const filterData = (data, setData) => {
    const orderBy = data.sort((a, b) => {
      const prev = order.value === "asc" ? a : b;
      const next = order.value === "asc" ? b : a;

      return orderMiddleware[order.key](prev[order.key], next[order.key]);
    });

    const filter = Object.entries(filtered).reduce((acc, [key, value]) => {
      const filterMethod = filterMiddleware[key];
      const filterValue = value;

      const filterMatchs = acc.filter((item) => {
        return filterMethod(item, value);
      });

      return filterMatchs;
    }, orderBy);
    setData([...filter]);
  };

  useEffect(() => {
    dispatch(getMySolicitations(login.usuario.id));
    dispatch(getUserCoins(login.usuario.id));
    fetchAllRequisitions();
  }, [login.usuario.id]);

  useEffect(() => {
    filterData(myOrders, setFilteredOrders);
  }, [myOrders, order, filtered]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setIsFiltered(false);
      setIsOrdered(false);
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = dispatch(getMySolicitations(login.usuario.id));
      return () => unsubscribe;
    }, [])
  );

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
      {loadginEvaluation && <Loader container={false} />}

      <GradientContainer colors={["#0B5393", "#041452"]}>
        <TitleHeaderContainer>
          <BtnHeaderMenu
            onPress={() => {
              setActiveTab("myMatchs");
              setIsFiltered(false);
              setIsOrdered(false);
            }}
            style={
              activeTab === "myMatchs" && {
                backgroundColor: "rgba(0, 19, 135, 0.4)",
              }
            }
          >
            <TextTitle padding="2.5" textAlign="center">
              {i18n.t("home.myMatchs.myMatchTab")}
            </TextTitle>
          </BtnHeaderMenu>

          <BtnHeaderMenu
            onPress={() => {
              setActiveTab("myRequests");
              setIsFiltered(false);
              setIsOrdered(false);
            }}
            style={
              activeTab === "myRequests" && {
                backgroundColor: "rgba(0, 19, 135, 0.4)",
              }
            }
          >
            <TextTitle padding="2.5" textAlign="center">
              {i18n.t("home.myRequests.myRequestsTab")}
            </TextTitle>
          </BtnHeaderMenu>
        </TitleHeaderContainer>

        <ButtonHeaderContainer>
          <IconsHeaderContainer
            onPress={() => {
              setIsOrdered(!isOrdered);
              setIsFiltered(false);
            }}
          >
            <OrderIcon />
            <TextButtonHeader>
              {i18n.t("home.orderMenu.order")}
            </TextButtonHeader>
          </IconsHeaderContainer>

          <IconsHeaderContainer
            onPress={() => {
              setIsFiltered(!isFiltered);
              setIsOrdered(false);
            }}
          >
            <FilterIcon />
            <TextButtonHeader>
              {i18n.t("home.filterMenu.filter")}
            </TextButtonHeader>
          </IconsHeaderContainer>
        </ButtonHeaderContainer>

        <ModalCard
          modalRender="modalRating"
          onClose={() => {
            setModalRating(false);
          }}
          isVisible={isModalRating}
          matchSelected={itemProposalEvaluation}
          onBackdropPress={() => {
            setModalRating(false);
          }}
          type={type}
          setStarsSelected={setStarsSelected}
          starsSelected={starsSelected}
          setEvaluationResponseTime={setEvaluationResponseTime}
          evaluationResponseTime={evaluationResponseTime}
          onPress={() => {
            handleSetEvaluationRequest();
          }}
          responseQuestionOne={responseQuestionOne}
          setResponseQuestionOne={setResponseQuestionOne}
          responseQuestionTwo={responseQuestionTwo}
          setResponseQuestionTwo={setResponseQuestionTwo}
          errorRequired={errorRequired}
          userId={login.usuario?.id}
        />
        {loading ? <Loader container={true} /> : renderScreen()}
        {renderModalOrder()}
        {renderModalFilter()}
      </GradientContainer>
    </>
  );
}
