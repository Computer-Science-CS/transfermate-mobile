import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  Composer,
  Message,
  MessageContainer,
} from 'react-native-gifted-chat';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import firebase from 'firebase/app';
import moment from 'moment';
import i18n, { t } from 'i18n-js';
import 'firebase/functions';

import {
  GradientContainer,
  HeaderChat,
  ProfilePicture,
  UserImage,
  ContainerUser,
  TextTitle,
  TextStatus,
  ProposeContainer,
  HeaderPropose,
  FinishedTRansaction,
  TextPropse,
  HeaderButtonContainer,
  ButtonAcceptExchange,
  ButtonAcceptExchangeText,
  ErrorText,
  ContainerModalButtons,
  TextBtn,
} from './styles';

import Modal from '../../components/Modal';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { BtnLight } from '../../components/ButtonLight';
import { InputField } from '../../components/Inputs';

import requestSolicitationRepository from '../../services/requestSolicitationRepository/requestSolicitationRepository';
import notificationRepository from '../../services/notificationRepository/notificationRepository';
import transactionRepository from '../../services/transactionRepository/transactionRepository';

import { getAllRequests, getProposeById } from '../../redux/actions/actions';
import { formatCurrency } from '../../utils/format';
import { formatter } from '../../utils/moneyFormat';
import getSymbolFromCurrency from 'currency-symbol-map';
import requestRepository from '../../services/requestRepository/requestRepository';

const UserChat = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login, shallowEqual);
  const oneProposal = useSelector((state) => state.oneProposal, shallowEqual);
  const [disableButtom, setDisableButtom] = useState(true);
  const [valueInput, setValueInput] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [transationData, setTransationData] = useState({
    id: oneProposal.id,
    //valorSolicitacaoFinal: null,
    valorPropostaFinal: null,
  });

  useEffect(() => {
    dispatch(getProposeById(route.params.id, setLoading));
  }, [route.params.id]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('chat')
      .doc(oneProposal.firebaseId)
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapShot) =>
        setMessages(
          snapShot.docs.map((doc) => ({
            _id: doc.data()._id,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            upatedAt: new Date(),
            user: {
              _id: doc.data().user._id,
              name: doc.data().user.name,
            },
          }))
        )
      );
    return () => unsubscribe();
  }, [oneProposal.firebaseId]);

  useEffect(() => {
    if (
      user.usuario.id !== oneProposal.solicitacao?.usuarioId &&
      oneProposal.transacao?.status === 4
    ) {
      setIsModalOpen(true);
      setIsAutomatic(true);
    }
  }, [oneProposal, user]);

  const onSend = useCallback(
    (messages) => {
      dispatch(getAllRequests(user.usuario.id));
      firebase
        .firestore()
        .collection('chat')
        .doc(oneProposal.firebaseId)
        .collection('chats')
        .add(messages[0]);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      handleSendNewNotification(
        user.usuario.id === oneProposal.usuarioId
          ? oneProposal.solicitacao?.usuario?.pushNotificationId
          : oneProposal.usuario.pushNotificationId,
        messages[0].text
      );
    },
    [messages]
  );

  function handleSendNewNotification(token, title, message) {
    let data = {
      to: token,
      sound: 'default',
      title: title,
      body: message,
      data: { msg: message, title: title },
      channelId: 'chat',
      _displayInForeground: true,
      priority: 'high',
    };
    return notificationRepository.sendNewProposalNotication(data);
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#C2C2C4',
          },
          left: {
            backgroundColor: '#EEECEE',
          },
        }}
        textStyle={{
          right: {
            color: '#101957',
          },
          left: {
            color: '#101957',
          },
        }}
      />
    );
  };

  function realToCent(value) {
    const cents = value.replace(',', '').replace('.', '');

    return Number(parseInt(cents, 10));
  }

  const declinePropose = () => {
    setLoading(true);
    requestSolicitationRepository
      .declineRequestSolicitation(oneProposal.id)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          if (oneProposal.usuario?.pushNotificationId) {
            handleSendNewNotification(
              oneProposal.usuario?.pushNotificationId,
              `${
                oneProposal.usuario?.linguagem === 'pt' || true
                  ? 'Proposta recusada'
                  : 'Rejected proposal'
              }`,
              `${
                oneProposal.usuario?.linguagem === 'pt' || true
                  ? 'Sua proposta foi recusada!'
                  : 'Your proposal was rejected!'
              }`
            );
          }
          dispatch(getAllRequests(user.usuario.id));
          showMessage({
            type: 'success',
            message: i18n.t('notifications.proposalRefused'),
            icon: { icon: 'success', position: 'right' },
            titleStyle: { fontSize: 16, textAlign: 'center' },
            hideOnPress: true,
            duration: 5000,
          });
          navigation.goBack();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const confirmDeclineProposal = () => {
    Alert.alert(
      `${i18n.t('chatScreen.confirmDeleteProposal')}`,
      `${i18n.t('chatScreen.deleteProposalMessage')}`,
      [
        {
          text: i18n.t('notifications.deleteMatchCancel'),
        },
        {
          text: i18n.t('notifications.deleteMatchOk'),
          onPress: () => {
            declinePropose();
          },
        },
      ]
    );
  };

  const acceptPropose = () => {
    // if (transationData.valorSolicitacaoFinal === null) {
    //   setError(true);
    //   return;
    // }

    setError(false);
    setIsModalOpen(false);
    setLoading(true);
    // let formatacaoValorSolicitacaoFinal = realToCent(
    //   transationData.valorSolicitacaoFinal.toFixed(2).toString()
    // );
    let formatacaoValorPropostaFinal = realToCent(
      transationData.valorPropostaFinal.toFixed(2).toString()
    );
    requestSolicitationRepository
      .acceptRequestSolicitation(oneProposal.id)
      .then(async (response) => {
        if (response.status === 200) {
          const proposal = response.data.data;
          const data = {
            id: proposal.transacao?.id,
            ativo: true,
            propostaId: proposal.transacao?.propostaId,
            status: 4,
            valorPropostaFinal: transationData.valorPropostaFinal,
            // valorSolicitacaoFinal: formatacaoValorSolicitacaoFinal,
            valorSolicitacaoInicial:
              proposal.transacao?.valorSolicitacaoInicial,
          };
          handleUpdateTransaction(data);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  async function handleUpdateTransactionPropose() {
    if (transationData.valorPropostaFinal === null) {
      setError(true);
      return;
    }

    setError(false);
    setIsModalOpen(false);
    setLoading(true);

    // let formatacaoValorSolicitacaoFinal = realToCent(
    //   transationData.valorSolicitacaoFinal.toFixed(2).toString()
    // );
    let formatacaoValorPropostaFinal = realToCent(
      transationData.valorPropostaFinal.toFixed(2).toString()
    );
    const data = {
      id: oneProposal.transacao?.id,
      ativo: true,
      propostaId: oneProposal.transacao?.propostaId,
      status: 5,
      valorPropostaFinal: formatacaoValorPropostaFinal,
      //valorSolicitacaoFinal: formatacaoValorSolicitacaoFinal,
      valorSolicitacaoInicial: oneProposal.transacao?.valorSolicitacaoInicial,
    };
    try {
      const updateTransaction =
        await transactionRepository.updateTransactionById(data);
      if (updateTransaction.status === 200) {
        if (oneProposal.solicitacao?.usuario?.pushNotificationId) {
          handleSendNewNotification(
            oneProposal.solicitacao?.usuario?.pushNotificationId,
            `${
              oneProposal.solicitacao?.usuario?.linguagem === 'pt' || true
                ? 'Transação finalizada'
                : 'Transaction completed'
            }`,
            `${
              oneProposal.solicitacao?.usuario?.linguagem === 'pt' || true
                ? 'A transação foi finalizada com sucesso!'
                : 'Transaction completed successfully!'
            }`
          );
        }
        setLoading(false);
        showMessage({
          type: 'success',
          message: i18n.t('notifications.transactionFinished'),
          icon: { icon: 'success', position: 'right' },
          titleStyle: { fontSize: 16, textAlign: 'center' },
          hideOnPress: true,
          duration: 5000,
        });
        dispatch(getProposeById(oneProposal.id));
      }
    } catch (error) {
      setLoading(false);
      showMessage({
        type: 'danger',
        message: i18n.t('notifications.errorTransaction'),
        icon: { icon: 'danger', position: 'right' },
        titleStyle: { fontSize: 16, textAlign: 'center' },
        hideOnPress: true,
        duration: 5000,
      });
    }
  }

  async function handleUpdateTransaction(data) {
    try {
      const updateTransaction =
        await transactionRepository.updateTransactionById(data);
      if (updateTransaction.status === 200) {
        if (oneProposal.usuario?.pushNotificationId) {
          handleSendNewNotification(
            oneProposal.usuario?.pushNotificationId,
            `${
              oneProposal.usuario?.linguagem === 'pt' || true
                ? 'Proposta aceita'
                : 'Proposal accepted'
            }`,
            `${
              oneProposal.usuario?.linguagem === 'pt' || true
                ? 'Sua proposta foi aceita!'
                : 'Your proposal has been accepted!'
            }`
          );
        }
        setLoading(false);
        showMessage({
          type: 'success',
          message: i18n.t('notifications.proposalAccepted'),
          icon: { icon: 'success', position: 'right' },
          titleStyle: { fontSize: 16, textAlign: 'center' },
          hideOnPress: true,
          duration: 5000,
        });
        dispatch(getProposeById(oneProposal.id));
      }
    } catch (error) {
      setLoading(false);
    }
  }

  function handleSendNewNotification(token, title, message) {
    let data = {
      to: token,
      sound: 'default',
      title: title,
      body: message,
      data: {
        msg: message,
        title: title,
        id: user.usuario.id,
        type: 'chat',
        url: 'UserChat',
      },
      channelId: 'messages',
      _displayInForeground: false,
      priority: 'high',
      autoDismiss: true,
    };
    return notificationRepository.sendNewProposalNotication(data);
  }

  const renderPhoto = () => {
    if (oneProposal.usuarioId === user.usuario?.id) {
      if (
        oneProposal.solicitacao?.usuario?.fotoUrl &&
        oneProposal.solicitacao?.usuario?.fotoUrl !== ''
      ) {
        return (
          <ProfilePicture
            source={{ uri: oneProposal.solicitacao?.usuario?.fotoUrl }}
          />
        );
      } else {
        return (
          <UserImage>
            <Ionicons name='person' size={RFValue(25)} color='#101957' />
          </UserImage>
        );
      }
    } else {
      if (oneProposal.usuario?.fotoUrl && oneProposal.usuario?.fotoUrl !== '') {
        return (
          <ProfilePicture source={{ uri: oneProposal.usuario?.fotoUrl }} />
        );
      } else {
        return (
          <UserImage>
            <Ionicons name='person' size={RFValue(25)} color='#101957' />
          </UserImage>
        );
      }
    }
  };

  function handleChangeInputModal(e) {
    if (isAutomatic && e != oneProposal.transacao?.valorPropostaFinal) {
      setDisableButtom(true);
    } else {
      setTransationData({ ...transationData, valorPropostaFinal: e });
      setDisableButtom(false);
    }
  }
  //console.log(valueInput, 'valor input')
  //console.log(user.usuario.id, 'userId')
  //console.log(oneProposal.solicitacao?.usuarioId, 'ID solicitacao')
  //console.log(oneProposal.solicitacao?.valorCentavos, 'valor proposta')

  function handleClickButtom() {
    console.log(
      isAutomatic,
      valueInput,
      oneProposal.transacao?.valorPropostaFinal
    );
    const isInValid = valueInput != oneProposal.transacao?.valorPropostaFinal; //&& valueInput != (oneProposal.transacao?.valorPropostaFinal / 100)
    console.log(isInValid);
    if (isAutomatic && isInValid) {
      // console.log('cai If')
      return setError(true);
    } else {
      user.usuario.id === oneProposal.solicitacao?.usuarioId
        ? acceptPropose()
        : handleUpdateTransactionPropose();
      setError(false);
    }
  }

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
          navigation.navigate('Profile');
        }}
      />
      {loading && <Loader container={false} />}

      <Modal
        onClose={() => {
          setIsModalOpen(false);
        }}
        isVisible={isModalOpen}
        modalRender='acceptExchange'
      >
        {/* <InputField
          placeholder={i18n.t("chatScreen.inputFinalValue")}
          typeInput="currency"
          value={transationData.valorSolicitacaoFinal}
          onChangeText={(e) =>
            setTransationData({ ...transationData, valorSolicitacaoFinal: e })
          }
        /> */}

        <TextStatus>
          {i18n.t('chatScreen.modals.textAccept') +
            transationData?.valorPropostaFinal?.toFixed(2).toString()}
        </TextStatus>

        <InputField
          placeholder={i18n.t('chatScreen.inputProposalAccepted')}
          typeInput='currency'
          //value={transationData.valorPropostaFinal}
          value={valueInput}
          onChangeText={
            (e) => {
              handleChangeInputModal(e), setValueInput(e);
            }
            //setTransationData({ ...transationData, valorPropostaFinal: e })
          }
        />

        <KeyboardAvoidingView behavior='height' />
        {error && (
          <ErrorText>{i18n.t('chatScreen.modals.warninMessage2')}</ErrorText>
        )}

        <ContainerModalButtons>
          <BtnLight
            borderRadius={3}
            handleFunction={() => {
              handleClickButtom();
            }}
          >
            <TextBtn>{i18n.t('chatScreen.modals.textButton')}</TextBtn>
          </BtnLight>
        </ContainerModalButtons>
      </Modal>

      <GradientContainer colors={['#0B5393', '#041452']}>
        <HeaderChat>
          {renderPhoto()}
          <ContainerUser>
            <TextTitle>
              {user.usuario.id === oneProposal?.usuario?.id
                ? oneProposal.solicitacao?.usuario.nome
                : oneProposal.usuario?.nome}
            </TextTitle>
            <TextStatus>Online</TextStatus>
          </ContainerUser>
        </HeaderChat>

        {user.usuario.id === oneProposal.solicitacao?.usuarioId ? (
          <>
            {oneProposal.status !== 3 && (
              <ProposeContainer>
                <HeaderPropose>
                  <TextPropse>
                    {i18n.t('chatScreen.requestInfo')}{' '}
                    {getSymbolFromCurrency(oneProposal.moedaDestino?.simbolo)}{' '}
                    {formatter
                      .format(oneProposal.solicitacao?.valorCentavos)
                      .replace(/[^0-9.-]+/, '')}{' '}
                    <MaterialCommunityIcons
                      name='arrow-left-right'
                      size={RFValue(14)}
                      color='#3a3d43'
                    />{' '}
                    {getSymbolFromCurrency(oneProposal.moedaOrigem?.simbolo)} (
                    {oneProposal.moedaDestino?.nome})
                  </TextPropse>

                  <TextPropse fontSize={RFValue(12)} color='#101957'>
                    {i18n.t('chatScreen.availableRequest')}{' '}
                    {moment(
                      oneProposal.solicitacao?.dataDisponibilidade
                    ).format('DD/MM/YYYY')}
                  </TextPropse>
                </HeaderPropose>

                <HeaderButtonContainer>
                  {/* <ButtonAcceptExchange
                    handleFunction={confirmDeclineProposal}
                    background="#2B5089"
                  >
                    <ButtonAcceptExchangeText>
                      {i18n.t("buttons.deleteProposal")}
                    </ButtonAcceptExchangeText>
                  </ButtonAcceptExchange> */}

                  <ButtonAcceptExchange
                    onPress={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    <ButtonAcceptExchangeText>
                      {i18n.t('buttons.acceptProposal')}
                    </ButtonAcceptExchangeText>
                  </ButtonAcceptExchange>
                </HeaderButtonContainer>
              </ProposeContainer>
            )}
            {oneProposal.transacao?.status === 4 ||
              (oneProposal.transacao?.status === 5 && (
                <ProposeContainer>
                  <FinishedTRansaction>
                    {/* <TextPropse>
                      {i18n.t("chatScreen.transactionInfo")}{" "}
                      {getSymbolFromCurrency(oneProposal.moedaOrigem.simbolo)}{" "}
                      {formatCurrency(
                        oneProposal.transacao?.valorSolicitacaoFinal.toString() && formatter.format(oneProposal.transacao?.valorSolicitacaoFinal).replace(/[^0-9.-]+/, "")
                      )}
                    </TextPropse> */}

                    <TextPropse>
                      {i18n.t('chatScreen.transactionTo')}{' '}
                      {getSymbolFromCurrency(oneProposal.moedaOrigem?.simbolo)}{' '}
                      {formatCurrency(
                        oneProposal.transacao?.valorPropostaFinal?.toString()
                      )}
                    </TextPropse>
                  </FinishedTRansaction>
                </ProposeContainer>
              ))}
          </>
        ) : (
          <>
            {oneProposal.transacao?.status === 4 ||
              (oneProposal.transacao?.status === 5 && (
                <ProposeContainer>
                  <FinishedTRansaction>
                    {/* <TextPropse>
                      {i18n.t("chatScreen.transactionInfo")}{" "}
                      {getSymbolFromCurrency(oneProposal.moedaOrigem.simbolo)}{" "}
                      {formatCurrency(
                        oneProposal.transacao?.valorSolicitacaoFinal.toString() && formatter.format(oneProposal.transacao?.valorSolicitacaoFinal).replace(/[^0-9.-]+/, "")
                      )}
                    </TextPropse> */}

                    <TextPropse>
                      {i18n.t('chatScreen.transactionTo')}{' '}
                      {getSymbolFromCurrency(oneProposal.moedaDestino.simbolo)}{' '}
                      {formatCurrency(
                        oneProposal.transacao?.valorPropostaFinal.toString()
                      )}
                    </TextPropse>
                  </FinishedTRansaction>
                </ProposeContainer>
              ))}
          </>
        )}
        <GiftedChat
          timeTextStyle={{
            right: { color: 'black' },
            left: { color: 'black' },
          }}
          renderComposer={(props) => (
            <Composer {...props} placeholder={t('chatScreen.inputChat')} />
          )}
          renderSend={(props) => (
            <Send label={i18n.t('chatScreen.sendMessage')} {...props} />
          )}
          renderChatFooter={() =>
            oneProposal.transacao?.status === 4 ||
            oneProposal.transacao?.status === 5 ? (
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#041452',
                  paddingBottom: 10,
                }}
              >
                <TextBtn fontSize={RFValue(18)}>
                  {oneProposal.transacao?.status === 4
                    ? i18n.t('chatScreen.waitTransactionConfirmation')
                    : i18n.t('chatScreen.transactionFinished')}
                </TextBtn>
              </View>
            ) : (
              <></>
            )
          }
          renderBubble={renderBubble}
          messages={messages}
          renderAvatar={null}
          onSend={(messages) => onSend(messages)}
          isTyping={true}
          user={{ _id: user.usuario.id, nome: user.usuario.nome }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? null : 'heigth'}
          keyboardVerticalOffset={0}
        />
      </GradientContainer>
    </>
  );
};

export default UserChat;
