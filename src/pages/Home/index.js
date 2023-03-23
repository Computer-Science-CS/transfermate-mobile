import React, { useState, useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import { MaterialIcons } from '@expo/vector-icons';
import 'firebase/firestore';
import firebase from 'firebase/app';
import uuid from 'react-native-uuid';
import { showMessage } from 'react-native-flash-message';
import getSymbolFromCurrency from 'currency-symbol-map';

import Loader from '../../components/Loader';
import Header from '../../components/Header';
import CardInfo from '../../components/CardInfo';
import ModalCard from '../../components/Modal';
import Checkbox from '../../components/Checkbox';

import OrderIcon from '../../assets/images/order-icon.js';
import FilterIcon from '../../assets/images/filter-icon.js';
import EmptycoinIcon from '../../assets/images/emptycoin-icon.js';
import EmptymatchIcon from '../../assets/images/emptymatch-icon.js';
import StarRateIcon from '../../assets/images/PopRating/starRate-icon.js';

import {
  getUserCoins,
  getAllRequests,
  getMatchesAvailable,
} from '../../redux/actions/actions';

import notificationRepository from '../../services/notificationRepository/notificationRepository';
import requestSolicitationRepository from '../../services/requestSolicitationRepository/requestSolicitationRepository';

import { formatCurrency } from '../../utils/format';
import { formatter } from '../../utils/moneyFormat';

import {
  GradientContainer,
  TitleHeaderContainer,
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
  OrderContainer,
  TitleOrderContainer,
  TextTitleOrder,
  ModalClose,
  FilteredContainer,
  OptionsContainer,
  Options,
  TextOptions,
  TextOptionsTitle,
  InputSearch,
  Star,
  ModalStar,
} from './styles';
import userRepository from '../../services/userRepository/userRepository';
import { RFValue } from 'react-native-responsive-fontsize';
import { useLayoutEffect } from 'react';

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
    const pontuacao = item?.pontuacao?.length
      ? (
          item.pontuacao
            ?.flatMap((x) => x.avaliacaoGeral)
            .reduce((a, b) => a + b) / item.pontuacao.length
        ).toFixed(1)
      : 0;
    // console.log(pontuacao)
    return selectedStars === 0 ? true : pontuacao <= selectedStars;
  },
};

export default function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const login = useSelector((state) => state.login, shallowEqual);
  const user = useSelector((state) => state.user, shallowEqual);
  const coins = useSelector((state) => state.userCoins, shallowEqual);
  const matches = useSelector((state) => state.matchesAvailable, shallowEqual);

  const [matchesAvailable, setMatchsAvailable] = useState(matches);

  const [newMessage, setNewMessage] = useState('');
  const [errorNewMessage, setErrorNewMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState({ key: 'dataCadastro', value: 'desc' });
  const [originCurrency, setOriginCurrency] = useState();
  const [destinyCurrency, setDestinyCurrency] = useState();
  const [counter, setCounter] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [loadginEvaluation, setLoadingEvaluation] = useState(false);

  const [requestSelected, setRequestSelected] = useState({
    dataDisponibilidade: '',
    id: null,
    moedaDestinoId: null,
    moedaOrigemId: null,
    statusSolicitacao: '',
    usuario: {
      email: '',
      id: null,
      loginSocialMidias: [],
      nome: '',
      senha: '',
      usuarioAdmin: null,
      usuarioMoedas: [],
    },
    usuarioId: null,
    valorCentavos: null,
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filtered, setFiltered] = useState({
    coins: [],
    value: [null, null],
    stars: 0,
  });

  const [isModalMatchBid, setModalMatchBid] = useState(false);

  const toggleModalMatchBid = (request) => {
    setModalMatchBid(!isModalMatchBid);
    setRequestSelected(request);
  };

  function handleCoins() {
    navigation.navigate('Currency');
  }

  function handleRequest() {
    navigation.navigate('Request');
  }

  function handleSendNewNotification(token, title, message) {
    let data = {
      to: token,
      sound: 'default',
      title: title,
      body: message,
      data: { msg: message, title: title, id: 2, type: 'proposal' },
      channelId: 'messages',
      _displayInForeground: true,
      priority: 'high',
    };
    return notificationRepository.sendNewProposalNotication(data);
  }

  function updateProfileLanguage() {
    userRepository
      .updateUser({ ...user, linguagem: Localization.locale.substring(0, 2) })
      .then((res) => {
        console.log(res.status);
      });
  }

  const onRefreshMatchScreen = React.useCallback(async () => {
    dispatch(getMatchesAvailable(login.usuario.id, setLoading));
  }, [refreshing, login.usuario.id]);

  // Mandar uma proposta para uma solicitação
  const handleSubmitRequest = async (item) => {
    if (newMessage === '') {
      setErrorNewMessage(true);
      return;
    }

    setErrorNewMessage(false);
    setModalMatchBid(false);
    setLoadingEvaluation(true);

    let data = {
      usuarioId: login.usuario.id,
      solicitacaoId: requestSelected.id,
      firebaseId: uuid.v4(),
    };

    firebase
      .firestore()
      .collection('chat')
      .doc(data.firebaseId)
      .collection('chats')
      .add({
        _id: login.usuario.id,
        text: newMessage,
        createdAt: new Date(),
        user: {
          _id: login.usuario.id,
          name: login.usuario.nome,
          avatar: 'https://placeimg.com/140/140/any',
        },
      });
    try {
      const response =
        await requestSolicitationRepository.createNewRequestSolicitation(data);
      if (response.status === 200) {
        setNewMessage('');
        if (item.usuario.pushNotificationId) {
          await handleSendNewNotification(
            item.usuario.pushNotificationId,
            `${item.usuario.linguagem === 'pt' || true ? 'Proposta' : 'Proposal'}`,
            `${
              item.usuario.linguagem === 'pt' || true
                ? 'Você recebeu uma proposta de ' + login.usuario.nome
                : login.usuario.nome + ' has sent a trade proposal'
            }`
          );
        }
        setLoadingEvaluation(false);
        showMessage({
          type: 'success',
          message: i18n.t('notifications.successProposal'),
          icon: { icon: 'success', position: 'right' },
          titleStyle: { fontSize: 16, textAlign: 'center' },
          hideOnPress: true,
          duration: 5000,
        });
        dispatch(getMatchesAvailable(login.usuario.id, setLoading));
        dispatch(getAllRequests(login.usuario.id));
      }
    } catch (error) {
      console.log(error.response);
      setLoadingEvaluation(false);
      if (error.response.status === 400) {
        showMessage({
          type: 'danger',
          message: i18n.t('notifications.dangerProposal'),
          icon: { icon: 'danger', position: 'right' },
          titleStyle: { fontSize: 16, textAlign: 'center' },
          hideOnPress: true,
          duration: 5000,
        });
        return;
      }
    }
  };

  // Renderiza um match disponivel
  const renderMatchScreen = ({ item }) => {
    // const foundProposal = item.propostas.find(
    //   (p) => p.usuarioId === login.usuario.id
    //   );
    //   const foundOrigin = originCurrency.find(
    //     (id) => id === item.moedaOrigemId
    //   );
    //   const foundDestiny = destinyCurrency.find(
    //     (id) => id === item.moedaOrigemId
    //   );

    //   if(item.moedaOrigemId != foundOrigin) {
    //     return ;
    //   }

    //console.log('Moeda de Origem', item.moedaOrigem.nome, 'Moeda de Destino', item.moedaDestino.nome)

    //console.log('FOUND', foundIdOrigin)

    // if (!item.ativo || foundProposal) return null;
    return (
      <CardInfo
        name={item.usuario.nome}
        match={{
          nome: item.usuario.nome,
          moedaOrigemSimbolo: getSymbolFromCurrency(item.moedaOrigem.simbolo),
          moedaDestinoSimbolo: getSymbolFromCurrency(item.moedaDestino.simbolo),
          moedaDestinoNome: item.moedaDestino.nome,
          moedaOrigemNome: item.moedaOrigem?.nome,
          valor: formatter.format(item.valorCentavos).replace(/[^0-9.-]+/, ''),
          descricao: item.usuario.descricao,
          pontuacao: item.pontuacao?.length
            ? (
                item.pontuacao
                  ?.flatMap((x) => x.avaliacaoGeral)
                  .reduce((a, b) => a + b) / item.pontuacao.length
              ).toFixed(1)
            : '0.0',
          totalAvaliacoes: item.pontuacao ? item.pontuacao.length : 0,
          transacoes: item.usuario.transacoesRealizadas
            ? item.usuario.transacoesRealizadas
            : 0,
        }}
        requestCoinSymbol={getSymbolFromCurrency(item.moedaOrigem.simbolo)}
        requestCoinTrade={getSymbolFromCurrency(item.moedaDestino.simbolo)}
        requestValue={formatCurrency(item.valorCentavos.toString())}
        description={item.usuario.descricao}
        key={item.id}
        userPhoto={item.usuario?.fotoUrl}
        cardRender='matchScreen'
        handleMatchBid={() => {
          toggleModalMatchBid(item);
        }}
      />
    );
  };

  // Renderiza matchs disponíveis
  const renderMatchTrade = () => {
    return (
      <>
        {coins.length <= 0 ? (
          <ExchangeListContainer>
            <EmptyIconContainer>
              <EmptycoinIcon />

              <EmptyTextContainer>
                {Localization.locale.substring(0, 2) === 'pt' ? (
                  <EmptyText>
                    {i18n.t('home.matchScreen.message')}&nbsp;
                    <EmptyText
                      onPress={handleCoins}
                      textDecoration='underline'
                      color='#808EEF'
                    >
                      {i18n.t('home.matchScreen.message2')}
                    </EmptyText>
                    &nbsp;{i18n.t('home.matchScreen.message3')}
                  </EmptyText>
                ) : (
                  <EmptyText>
                    {i18n.t('home.matchScreen.message')}&nbsp;
                    <EmptyText
                      onPress={handleCoins}
                      textDecoration='underline'
                      color='#808EEF'
                    >
                      {i18n.t('home.matchScreen.message2')}
                    </EmptyText>
                  </EmptyText>
                )}
              </EmptyTextContainer>
            </EmptyIconContainer>
          </ExchangeListContainer>
        ) : (
          <ListContainer
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshMatchScreen}
              />
            }
            keyExtractor={(item) => item.id.toString()}
            data={matchesAvailable}
            renderItem={renderMatchScreen}
            ListEmptyComponent={() => (
              <ExchangeListContainer>
                <EmptyIconContainer>
                  <EmptymatchIcon />
                  <EmptyTextContainer>
                    <EmptyText>
                      {i18n.t('home.matchScreen.message4')}&nbsp;
                      <EmptyText
                        onPress={handleRequest}
                        textDecoration='underline'
                        color='#808EEF'
                      >
                        {i18n.t('home.matchScreen.message5')}
                      </EmptyText>
                    </EmptyText>
                  </EmptyTextContainer>
                </EmptyIconContainer>
              </ExchangeListContainer>
            )}
          />
        )}

        <ModalCard
          modalRender='modalDetails'
          onBackdropPress={() => {
            setModalMatchBid(false);
          }}
          errorNewMessage={errorNewMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          matchSelected={requestSelected}
          isVisible={isModalMatchBid}
          onClose={() => {
            setModalMatchBid(false);
          }}
          onPress={() => {
            handleSubmitRequest(requestSelected);
          }}
        />
      </>
    );
  };

  //Renderiza Ordenar
  const renderModalOrder = () => {
    return (
      <ModalCard
        modalRender='orderModal'
        isVisible={isOrdered}
        onBackdropPress={() => setIsOrdered(false)}
      >
        <OrderContainer>
          <TitleOrderContainer>
            <TextTitleOrder>{i18n.t('home.orderMenu.orderBy')}</TextTitleOrder>

            <ModalClose paddingLeft={20} onPress={() => setIsOrdered(false)}>
              <MaterialIcons
                name='keyboard-arrow-right'
                size={RFValue(24)}
                color='#808eef'
              />
            </ModalClose>
          </TitleOrderContainer>

          <Checkbox
            checked={order.value === 'desc' && order.key === 'valorCentavos'}
            onChange={(checked) => {
              checked
                ? setOrder({ key: 'valorCentavos', value: 'desc' })
                : setOrder({ key: 'dataCadastro', value: 'desc' });
            }}
            text={i18n.t('home.orderMenu.highestValue')}
          />

          <Checkbox
            checked={order.value === 'asc' && order.key === 'valorCentavos'}
            onChange={(checked) => {
              checked
                ? setOrder({ key: 'valorCentavos', value: 'asc' })
                : setOrder({ key: 'dataCadastro', value: 'desc' });
            }}
            text={i18n.t('home.orderMenu.lowerValue')}
          />

          <Checkbox
            checked={order.value === 'desc' && order.key === 'usuario'}
            onChange={(checked) => {
              checked
                ? setOrder({ key: 'usuario', value: 'desc' })
                : setOrder({ key: 'dataCadastro', value: 'desc' });
            }}
            text={i18n.t('home.orderMenu.crescentRating')}
          />

          <Checkbox
            checked={order.value === 'asc' && order.key === 'usuario'}
            onChange={(checked) => {
              checked
                ? setOrder({ key: 'usuario', value: 'asc' })
                : setOrder({ key: 'dataCadastro', value: 'desc' });
            }}
            text={i18n.t('home.orderMenu.decreasingRating')}
          />

          <Checkbox
            checked={order.value === 'desc' && order.key === 'dataCadastro'}
            onChange={(checked) => {
              checked
                ? setOrder({ key: 'dataCadastro', value: 'desc' })
                : setOrder({ key: 'dataCadastro', value: 'desc' });
            }}
            text={i18n.t('home.orderMenu.newerOrder')}
          />

          <Checkbox
            checked={order.value === 'asc' && order.key === 'dataCadastro'}
            onChange={(checked) => {
              checked
                ? setOrder({ key: 'dataCadastro', value: 'asc' })
                : setOrder({ key: 'dataCadastro', value: 'desc' });
            }}
            text={i18n.t('home.orderMenu.olderOrder')}
          />
        </OrderContainer>
      </ModalCard>
    );
  };

  //Renderiza Filtrar
  const renderModalFilter = () => {
    return (
      <ModalCard
        modalRender='filterModal'
        isVisible={isFiltered}
        onBackdropPress={() => setIsFiltered(false)}
      >
        <FilteredContainer>
          <TitleOrderContainer>
            <ModalClose paddingRight={20} onPress={() => setIsFiltered(false)}>
              <MaterialIcons
                name='keyboard-arrow-left'
                size={RFValue(24)}
                color='#808eef'
              />
            </ModalClose>
            <TextTitleOrder>
              {i18n.t('home.filterMenu.filterBy')}
            </TextTitleOrder>
          </TitleOrderContainer>

          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <OptionsContainer>
              <TextOptionsTitle>
                {i18n.t('home.filterMenu.value')}
              </TextOptionsTitle>

              <InputSearch
                keyboardType='number-pad'
                value={filtered.value[0]}
                onChangeText={(e) =>
                  setFiltered((prev) => ({
                    ...prev,
                    value: [e, prev.value[1]],
                  }))
                }
                placeholder='Min.:'
              />

              <InputSearch
                keyboardType='number-pad'
                value={filtered.value[1]}
                onChangeText={(e) =>
                  setFiltered((prev) => ({
                    ...prev,
                    value: [prev.value[0], e],
                  }))
                }
                placeholder='Máx.:'
              />
            </OptionsContainer>

            <OptionsContainer>
              <TextOptionsTitle>
                {i18n.t('home.filterMenu.rating')}
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

            <OptionsContainer>
              <TextOptionsTitle>
                {i18n.t('home.filterMenu.currency')}
              </TextOptionsTitle>

              {coins
                .filter((coin) => coin.tipoMoeda === 'D')
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

            {/* <OptionsContainer>
              <TextOptionsTitle>
                {i18n.t("home.filterMenu.Requests")}
              </TextOptionsTitle>

              <Checkbox
                checked={
                  order.value === "desc" && order.key === "valorCentavos"
                }
                onChange={(checked) => {
                  checked
                    ? setOrder({ key: "valorCentavos", value: "desc" })
                    : setOrder({ key: "dataCadastro", value: "desc" });
                }}
                text={i18n.t("home.filterMenu.answeredRequest")}
              />

              <Checkbox
                checked={
                  order.value === "desc" && order.key === "valorCentavos"
                }
                onChange={(checked) => {
                  checked
                    ? setOrder({ key: "valorCentavos", value: "desc" })
                    : setOrder({ key: "dataCadastro", value: "desc" });
                }}
                text={i18n.t("home.filterMenu.unansweredResquests")}
              />

              <Checkbox
                checked={
                  order.value === "desc" && order.key === "valorCentavos"
                }
                onChange={(checked) => {
                  checked
                    ? setOrder({ key: "valorCentavos", value: "desc" })
                    : setOrder({ key: "dataCadastro", value: "desc" });
                }}
                text={i18n.t("home.filterMenu.aceptedRequests")}
              />

              <Checkbox
                checked={
                  order.value === "desc" && order.key === "valorCentavos"
                }
                onChange={(checked) => {
                  checked
                    ? setOrder({ key: "valorCentavos", value: "desc" })
                    : setOrder({ key: "dataCadastro", value: "desc" });
                }}
                text={i18n.t("home.filterMenu.refusedRequests")}
              />
            </OptionsContainer> */}
          </ScrollView>
        </FilteredContainer>
      </ModalCard>
    );
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserCoins(login.usuario.id));
      // fetchAllRequisitions();
      dispatch(getMatchesAvailable(login.usuario.id, setLoading));
    }
  }, [login.usuario.id, isFocused]);

  useEffect(() => {
    const orderBy = matches.sort((a, b) => {
      const prev = order.value === 'asc' ? a : b;
      const next = order.value === 'asc' ? b : a;
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

    setMatchsAvailable([...filter]);
  }, [order, matches, filtered]);

  return (
    <>
      <Header
        backBtn={false}
        logo={true}
        profileBtn={true}
        profileBtnFunction={() => {
          navigation.navigate('Profile');
        }}
      />
      {loadginEvaluation && <Loader container={false} />}

      <GradientContainer colors={['#0B5393', '#041452']}>
        <TitleHeaderContainer>
          <TextTitle>{i18n.t('home.matchScreen.matchTab')}</TextTitle>
        </TitleHeaderContainer>

        <ButtonHeaderContainer>
          <IconsHeaderContainer
            onPress={() => {
              setIsOrdered(true);
            }}
          >
            <OrderIcon />
            <TextButtonHeader>
              {i18n.t('home.orderMenu.order')}
            </TextButtonHeader>
          </IconsHeaderContainer>

          <IconsHeaderContainer
            onPress={() => {
              setIsFiltered(true);
            }}
          >
            <FilterIcon />
            <TextButtonHeader>
              {i18n.t('home.filterMenu.filter')}
            </TextButtonHeader>
          </IconsHeaderContainer>
        </ButtonHeaderContainer>

        {loading ? <Loader container={true} /> : renderMatchTrade()}
        {renderModalOrder()}
        {renderModalFilter()}
      </GradientContainer>
    </>
  );
}
