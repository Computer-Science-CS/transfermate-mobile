import React, {useState} from "react";
import { Keyboard, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import i18n from "i18n-js";
import moment from "moment";
import getSymbolFromCurrency from "currency-symbol-map";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";

import { formatName } from "../../utils/formatName";
import { formatCurrency } from "../../utils/format";
import { formatter } from '../../utils/moneyFormat'

import StarIcon from "../../assets/images/star-icon";
import BackIcon from "../../assets/images/back-icon";
import SlowIcon from "../../assets/images/PopRating/slow-icon.js";
import GoodIcon from "../../assets/images/PopRating/good-icon.js";
import QuickIcon from "../../assets/images/PopRating/quick-icon.js";
import StarRateIcon from "../../assets/images/PopRating/starRate-icon.js";
import VerySlowIcon from "../../assets/images/PopRating/veryslow-icon.js";
import ReasonableIcon from "../../assets/images/PopRating/reasonable-icon.js";

import {
  GradientContainer,
  ModalTitleContainer,
  ModalClose,
  TextTitleModal,
  CardContainer,
  UserContainer,
  ImageUserContainer,
  ModalPicture,
  ModalImage,
  StarContainer,
  StarText,
  DetailsUserContainer,
  NameUser,
  TransactionsContainer,
  Transactions,
  //modalDetails
  AboutContainer,
  AboutText,
  AboutDescriptionText,
  DateContainer,
  DateText,
  ExchangeContainer,
  ExchangeTextContainer,
  ExchangeText,
  ExchangeValueContainer,
  NoteContainer,
  InputContainer,
  Input,
  ModalIconContainer,
  TextParamsContainer,
  ParamsText,
  //modalRating
  StarRateContainer,
  TextContainer,
  TextRate,
  Star,
  ModalStar,
  ModalStarText,
  EmojiRateContainer,
  Emoji,
  ModalEmoji,
  ModalText,
  ModalIconText,
  ModalBtnContainer,
  ModalButton,
  TextBtn,
  //acceptExchange
} from "./styles";

export default function ModalCard({
  modalRender,
  isVisible,
  onBackdropPress,
  children,
  onPress,
  matchSelected,
  setNewMessage,
  newMessage,
  errorNewMessage,
  onClose,
  starsSelected,
  setStarsSelected,
  setEvaluationResponseTime,
  evaluationResponseTime,
  responseQuestionTwo,
  setResponseQuestionTwo,
  errorRequired,
}) {
  function handleEvaluationReponseTime(value) {
    if (evaluationResponseTime === value) {
      setEvaluationResponseTime(0);
    } else {
      setEvaluationResponseTime(value);
    }
  }
  
  switch (modalRender) {
    case "modalDetails":
      //console.log(setEvaluationResponseTime)
     // console.log('estrela',setStarsSelected)
     // console.log('starselected',starsSelected)
      return (
        <Modal
          onBackdropPress={onBackdropPress}
          transparent
          avoidKeyboard={true}
          isVisible={isVisible}
          coverScreen={true}
          style={{ margin: 0 }}
        >
          <GradientContainer
            colors={["#0B5393", "#041452"]}
            // onStartShouldSetResponder={() => {
            //   Keyboard.dismiss();
            // }}
          >
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flexGrow: 1,
                marginBottom: 10,
                paddingBottom: 5,
              }}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <SafeAreaView style={{ flex: 1 }}>
                <ModalTitleContainer>
                  <ModalClose onPress={onClose}>
                    <MaterialIcons
                      name="keyboard-arrow-left"
                      size={RFValue(24)}
                      color="#eeecee"
                    />
                  </ModalClose>
                  <TextTitleModal>
                    {i18n.t("home.matchScreen.modals.requestDetails")}
                  </TextTitleModal>
                </ModalTitleContainer>

                <CardContainer>
                  <UserContainer>
                    <ImageUserContainer>
                      {matchSelected.usuario.fotoUrl &&
                        matchSelected.usuario.fotoUrl !== "" ? (
                        <ModalPicture
                          source={{ uri: matchSelected.usuario.fotoUrl }}
                        />
                      ) : (
                        <ModalImage>
                          <Ionicons
                            name="person"
                            size={RFValue(30)}
                            color="#101957"
                          />
                        </ModalImage>
                      )}
                      <StarContainer>
                        <StarIcon />
                        <StarText>
                          {matchSelected?.pontuacao?.length
                            ? (matchSelected.pontuacao?.flatMap(x => x.avaliacaoGeral).reduce((a,b) => a + b) / matchSelected.pontuacao.length).toFixed(1)
                            : `0.0`}
                        </StarText>
                      </StarContainer>
                    </ImageUserContainer>

                    <DetailsUserContainer>
                      <NameUser>{matchSelected.usuario.nome}</NameUser>

                      <TransactionsContainer>
                        <Transactions fontSize={18} color="#0D0D19">
                          {/* {matchSelected.qtdTransacao === 0
                            ? matchSelected.qtdTransacao +
                            " " +
                            i18n.t("home.cardInfo.exchangeCountS")
                            : matchSelected.qtdTransacao === 1
                              ? matchSelected.qtdTransacao +
                              " " +
                              i18n.t("home.cardInfo.exchangeCount")
                              : matchSelected.qtdTransacao +
                              " " +
                              i18n.t("home.cardInfo.exchangeCountS")} */}
                        </Transactions>
                      </TransactionsContainer>
                    </DetailsUserContainer>
                  </UserContainer>

                  <AboutContainer>
                    <AboutText>
                      {i18n.t("home.matchScreen.modals.about")}{" "}
                      {matchSelected.usuario.nome}...
                    </AboutText>

                    <AboutDescriptionText>
                      {matchSelected.usuario.descricao}
                    </AboutDescriptionText>
                  </AboutContainer>

                  <DateContainer>
                    <DateText>
                      {i18n.t("home.matchScreen.modals.activeSinse")}{" "}
                      {moment(matchSelected?.dataCadastro).format("DD/MM/YYYY")}
                    </DateText>
                  </DateContainer>
                </CardContainer>

                <ExchangeContainer>
                  <ExchangeTextContainer>
                    <ExchangeText>
                      {i18n.t("home.matchScreen.modals.valueRequest")}{" "}
                    </ExchangeText>

                    <ExchangeValueContainer>

                      <ExchangeText>
                        {getSymbolFromCurrency(
                          matchSelected?.moedaOrigem?.simbolo 
                        )}{" "}
                         ({matchSelected?.moedaOrigem?.nome})
                         
                       
                      </ExchangeText>
                      
                      <MaterialCommunityIcons
                        name="arrow-left-right"
                        size={RFValue(18)}
                        color="#15258b"
                      />

                      <ExchangeText>
                        {getSymbolFromCurrency(
                          matchSelected?.moedaDestino?.simbolo 
                        )}{" "}
                         {matchSelected.valorCentavos && formatter.format( matchSelected.valorCentavos).replace(/[^0-9.-]+/, "") }
                      </ExchangeText>
                    </ExchangeValueContainer>
                  </ExchangeTextContainer>

                  <ExchangeTextContainer>
                    <ExchangeText>
                      {i18n.t("home.matchScreen.modals.availableUntil")}{" "}
                      {moment(matchSelected.dataDisponibilidade).format(
                        "DD/MM/YYYY"
                      )}
                    </ExchangeText>
                  </ExchangeTextContainer>
                </ExchangeContainer>

                <NoteContainer flexDirection="row">
                  <InputContainer>
                    <Input
                      value={newMessage}
                      onChangeText={(e) => setNewMessage(e)}
                      multiline={true}
                      maxLength={75}
                      placeholder={i18n.t(
                        "home.matchScreen.modals.sendProposal"
                      )}
                    />
                  </InputContainer>
                  <ModalIconContainer onPress={onPress}>
                    <Ionicons name="send" size={20} color="#001387" />
                  </ModalIconContainer>
                </NoteContainer>
                {errorNewMessage && (
                  <TextParamsContainer>
                    <ParamsText>
                      {i18n.t("notifications.modalMessageRequired")}
                    </ParamsText>
                  </TextParamsContainer>
                )}
              </SafeAreaView>
            </KeyboardAwareScrollView>
          </GradientContainer>
        </Modal>
      );

    case "modalRating":
      return (
        <Modal
          onBackdropPress={onBackdropPress}
          transparent
          avoidKeyboard={true}
          isVisible={isVisible}
          coverScreen={true}
          style={{ margin: 0 }}
        >
          <GradientContainer
            colors={["#0B5393", "#041452"]}
            // onStartShouldSetResponder={() => {
            //   Keyboard.dismiss();
            // }}
          >
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flexGrow: 1,
                marginBottom: 10,
                paddingBottom: 5,
              }}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <SafeAreaView style={{ flex: 1 }}>
                <ModalTitleContainer>
                  <ModalClose onPress={onClose}>
                    <BackIcon />
                  </ModalClose>
                  <TextTitleModal>
                    {i18n.t("home.myRequests.modals.exchangeRate")}
                  </TextTitleModal>
                </ModalTitleContainer>

                <CardContainer>
                  <UserContainer>
                    <ImageUserContainer>
                      {matchSelected.usuario?.fotoUrl &&
                        matchSelected.usuario?.fotoUrl !== "" ? (
                        <ModalPicture
                          source={{ uri: matchSelected.usuario?.fotoUrl }}
                        />
                      ) : (
                        <ModalImage>
                          <Ionicons
                            name="person"
                            size={RFValue(30)}
                            color="#101957"
                          />
                        </ModalImage>
                      )}
                      <StarContainer>
                        <StarIcon />
                        <StarText>
                          {matchSelected?.usuario?.ratting
                            ? matchSelected?.usuario?.ratting.toFixed(1)
                            : "0.0"}
                        </StarText>
                      </StarContainer>
                    </ImageUserContainer>

                    <DetailsUserContainer>
                      <NameUser>{matchSelected?.usuario?.nome}</NameUser>

                      <Transactions fontSize={18} color="#0D0D19">
                        { 
                        // getSymbolFromCurrency(
                        //   matchSelected?.moedaOrigem?.simbolo
                        // ) 
                        //  +
                        //   formatCurrency(
                        //     matchSelected?.valorSolicitacaoInicial?.toString() && formatter.format(matchSelected?.valorSolicitacaoInicial).replace(/[^0-9.-]+/, "") 
                        //   ) +
                          " " +
                          i18n.t("chatScreen.transactionTo") +
                          " " +
                          getSymbolFromCurrency(
                            matchSelected?.moedaDestino?.simbolo
                          ) +
                          formatCurrency(
                            matchSelected?.valorPropostaFinal?.toString()
                          )}
                      </Transactions>
                    </DetailsUserContainer>
                  </UserContainer>

                  <StarRateContainer>
                    <TextContainer>
                      <TextRate>
                        {i18n.t("home.myRequests.modals.howExchangeRate")}{" "}
                        {formatName(matchSelected?.usuario?.nome)}?
                      </TextRate>
                    </TextContainer>

                    <Star>
                      {[1, 2, 3, 4, 5].map((s, i) => (                                 
                        <ModalStar                     
                          key={i}
                          onPress={() => {
                            starsSelected === s
                            ? setStarsSelected(0)
                            : setStarsSelected(i + 1);
                            
                          }}
                        >
                          <StarRateIcon key={i} selected={i < starsSelected}/>
                          {s === 1 && (
                            <ModalStarText>
                              {i18n.t("home.myRequests.modals.exchangeBadRate")}
                            </ModalStarText>
                          )}
                          {s === 5 && (
                            <ModalStarText>
                              {i18n.t(
                                "home.myRequests.modals.exchangeGoodRate"
                              )}
                            </ModalStarText>
                          )}
                        </ModalStar>
                       
                      ))}
                    </Star>
                  </StarRateContainer>

                  <EmojiRateContainer>
                    <TextContainer>
                      <TextRate>
                        {i18n.t("home.myRequests.modals.answerTime")}
                      </TextRate>
                    </TextContainer>

                    <Emoji>
                      <ModalEmoji
                        onPress={() => {
                          handleEvaluationReponseTime(1);
                        }}
                      >
                        <VerySlowIcon
                          evaluationResponseTime={evaluationResponseTime}
                        />
                        <ModalIconText>
                          {i18n.t("home.myRequests.modals.answerVerySlowTime")}
                        </ModalIconText>
                      </ModalEmoji>

                      <ModalEmoji
                        onPress={() => {
                          handleEvaluationReponseTime(2);
                        }}
                      >
                        <SlowIcon
                          evaluationResponseTime={evaluationResponseTime}
                        />
                        <ModalIconText>
                          {i18n.t("home.myRequests.modals.answerSlowTime")}
                        </ModalIconText>
                      </ModalEmoji>

                      <ModalEmoji
                        onPress={() => {
                          handleEvaluationReponseTime(3);
                        }}
                      >
                        <ReasonableIcon
                          evaluationResponseTime={evaluationResponseTime}
                        />
                        <ModalIconText>
                          {i18n.t(
                            "home.myRequests.modals.answerReasonableTime"
                          )}
                        </ModalIconText>
                      </ModalEmoji>

                      <ModalEmoji
                        onPress={() => {
                          handleEvaluationReponseTime(4);
                        }}
                      >
                        <GoodIcon
                          evaluationResponseTime={evaluationResponseTime}
                        />
                        <ModalIconText>
                          {i18n.t("home.myRequests.modals.answerGoodTime")}
                        </ModalIconText>
                      </ModalEmoji>

                      <ModalEmoji
                        onPress={() => {
                          handleEvaluationReponseTime(5);
                        }}
                      >
                        <QuickIcon
                          evaluationResponseTime={evaluationResponseTime}
                        />
                        <ModalIconText>
                          {i18n.t("home.myRequests.modals.answerQuickTime")}
                        </ModalIconText>
                      </ModalEmoji>
                    </Emoji>
                  </EmojiRateContainer>
                </CardContainer>

                <NoteContainer>
                  <InputContainer>
                    <Input
                      multiline={true}
                      placeholder={i18n.t(
                        "home.myRequests.modals.exchangeComment"
                      )}
                      value={responseQuestionTwo}
                      onChangeText={(e) => setResponseQuestionTwo(e)}
                      maxLength={255}
                    />
                  </InputContainer>
                </NoteContainer>
                {errorRequired && (
                  <TextParamsContainer>
                    <ParamsText>
                      {i18n.t("home.myRequests.modals.requiredField")}
                    </ParamsText>
                  </TextParamsContainer>
                )}

                <ModalBtnContainer>
                  <ModalButton onPress={onPress}>
                    <TextBtn>
                      {i18n.t("home.myRequests.modals.submitReview")}
                    </TextBtn>
                  </ModalButton>
                </ModalBtnContainer>
              </SafeAreaView>
            </KeyboardAwareScrollView>
          </GradientContainer>
        </Modal>
      );

    case "modalBid":
      return (
        <Modal
          onBackdropPress={onBackdropPress}
          transparent
          isVisible={isVisible}
          coverScreen={true}
          style={{ margin: 0 }}
        >
          <GradientContainer
            colors={["#0B5393", "#041452"]}
            // onStartShouldSetResponder={() => {
            //   Keyboard.dismiss();
            // }}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <ModalTitleContainer marginTop={10}>
                <ModalClose onPress={onClose}>
                  <BackIcon />
                </ModalClose>
                <TextTitleModal>
                  {i18n.t("home.myRequests.modals.requestAnswer")}
                </TextTitleModal>
              </ModalTitleContainer>
              {children}
            </SafeAreaView>
          </GradientContainer>
        </Modal>
      );

    case "acceptExchange":
      return (
        <Modal
          onBackdropPress={onBackdropPress}
          transparent
          avoidKeyboard={true}
          isVisible={isVisible}
          coverScreen={true}
          style={{ margin: 0 }}
          animationIn="slideInUp"
        >
          <GradientContainer colors={["#0B5393", "#041452"]}>
            <SafeAreaView style={{ flex: 1 }}>
              <ModalTitleContainer>
                <ModalClose onPress={onClose}>
                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={RFValue(24)}
                    color="#eeecee"
                  />
                </ModalClose>
                <TextTitleModal>
                  {i18n.t("chatScreen.modals.confirmValues")}
                </TextTitleModal>
              </ModalTitleContainer>
              {children}
            </SafeAreaView>
          </GradientContainer>
        </Modal>
      );

    case "orderModal":
      return (
        <Modal
          onBackdropPress={onBackdropPress}
          transparent
          avoidKeyboard={true}
          isVisible={isVisible}
          coverScreen={false}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          animationOutTiming={800}
          useNativeDriver={true}
          style={{ margin: 0 }}
        >
          {children}
        </Modal>
      );

    case "filterModal":
      return (
        <Modal
          onBackdropPress={onBackdropPress}
          transparent
          avoidKeyboard={true}
          isVisible={isVisible}
          coverScreen={false}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          animationOutTiming={800}
          useNativeDriver={true}
          style={{ margin: 0 }}
        >
          {children}
        </Modal>
      );

    default:
      return null;
  }
}
