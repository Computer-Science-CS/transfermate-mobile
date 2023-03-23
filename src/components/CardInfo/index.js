import React from 'react';
import {
  MaterialIcons,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import i18n from 'i18n-js';
import moment from 'moment';

import StarIcon from '../../assets/images/star-icon.js';

import {
  CardContainer,
  MainContainer,
  UserContainer,
  UserImage,
  DetailsCardContainer,
  Title,
  ValueContainer,
  Value,
  TransactionsContainer,
  Transactions,
  Picture,
  //Match screen card
  ValueBox,
  ValuePlaceholder,
  RateContainer,
  StarRateContainer,
  RatingText,
  MatchScreenButtonContainer,
  MatchScreenTextBtn,
  MatchScreenCardButton,
  //My Request card
  Rating,
  TransactionButton,
  TransactionButtonText,
  MyRequestButtonContainer,
  Button,
  ActiveRequest,
  MyRequestTextBtn,
  //My Rating Card
  DescriptionContainer,
  Description,
  // Exchange Bid Card
  CardContainerBtn,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

export default function CardInfo({
  cardRender,
  handleMatchBid,
  handleRating,
  handleBid,
  userNameRequest,
  openUserChat,
  deleteSolicitation,
  deleteMatch,
  evaluation,
  lastMessage,
  userPhoto,
  handleTransaction,
  match,
  proposal,
  userAvaliation,
  userTotalAvaliation,
  userTotalTransaction,
  userName,
}) {
  const renderDecision = () => {
    switch (proposal.propostaAceita?.transacao?.status) {
      case 4:
        return (
          <TransactionButtonText>
            {i18n.t('home.cardInfo.dateCompleted') +
              moment(proposal.propostaAceita?.transacao?.dataAlteracao).format(
                'DD/MM/YYYY'
              )}
          </TransactionButtonText>
        );
      case 5:
        return null;

      default:
        return (
          <TransactionButtonText>
            {proposal.totalPropostas > 1
              ? `${i18n.t('home.cardInfo.seeProposals')} (${
                  proposal.totalPropostas
                })`
              : `${i18n.t('home.cardInfo.seeProposal')} (${
                  proposal.totalPropostas
                })`}
          </TransactionButtonText>
        );
    }
  };

  switch (cardRender) {
    case 'matchScreen':
      return (
        <CardContainer>
          <TouchableOpacity onPress={handleMatchBid}>
            <MainContainer>
              <UserContainer>
                {userPhoto && userPhoto !== '' ? (
                  <Picture source={{ uri: userPhoto }} />
                ) : (
                  <UserImage>
                    <Ionicons
                      name='person'
                      size={RFValue(30)}
                      color='#101957'
                    />
                  </UserImage>
                )}

                <RateContainer>
                  <StarRateContainer>
                    <StarIcon style={{ marginRight: 2 }} />
                    <Rating>{match.pontuacao}</Rating>
                  </StarRateContainer>
                  <RatingText>
                    {match.totalAvaliacoes <= 1
                      ? `${
                          match.totalAvaliacoes +
                          ' ' +
                          i18n.t('home.cardInfo.ratingS')
                        }`
                      : `${
                          match.totalAvaliacoes +
                          ' ' +
                          i18n.t('home.cardInfo.rating')
                        }`}
                  </RatingText>
                </RateContainer>

                {/* <MatchScreenCardButton>
                <MaterialIcons
                  name="cancel"
                  size={RFValue(16)}
                  color="#9B0E1C"
                />

                <MatchScreenTextBtn color="#9B0E1C">
                  {i18n.t("home.cardInfo.refuseButton")}
                </MatchScreenTextBtn>
              </MatchScreenCardButton> */}
              </UserContainer>

              <DetailsCardContainer>
                <Title>{match.nome}</Title>

                <ValueContainer>
                  <ValueBox>
                    <ValuePlaceholder>
                      {i18n.t(
                        'personProfileScreen.currencyScreen.originCurrency'
                      )}
                    </ValuePlaceholder>
                    <Value>
                      {match.moedaOrigemSimbolo} ({match.moedaOrigemNome})
                    </Value>
                  </ValueBox>
                  <MaterialCommunityIcons
                    name='arrow-left-right'
                    size={RFValue(24)}
                    color='#15258b'
                    style={{ marginTop: 15 }}
                  />
                  <ValueBox>
                    <ValuePlaceholder style={{ alignSelf: 'flex-end' }}>
                      {i18n.t(
                        'personProfileScreen.currencyScreen.destinationCurrency'
                      )}
                    </ValuePlaceholder>
                    <Value>
                      {match.moedaDestinoSimbolo} {match.valor}
                    </Value>
                  </ValueBox>
                </ValueContainer>

                <TransactionsContainer>
                  <Transactions>
                    {/* {match.transacoes <= 0
                    ? `${match.transacoes +
                    " " +
                    i18n.t("home.cardInfo.exchangeCountS")
                    }`
                    : `${match.transacoes +
                    " " +
                    i18n.t("home.cardInfo.exchangeCount")
                    }`} */}
                  </Transactions>
                </TransactionsContainer>

                <MatchScreenButtonContainer>
                  <MatchScreenCardButton onPress={handleMatchBid}>
                    <Entypo
                      name='circle-with-plus'
                      size={RFValue(16)}
                      color='#076025'
                    />

                    <MatchScreenTextBtn color='#076025'>
                      {i18n.t('home.cardInfo.detailsButton')}
                    </MatchScreenTextBtn>
                  </MatchScreenCardButton>
                </MatchScreenButtonContainer>
              </DetailsCardContainer>
            </MainContainer>
          </TouchableOpacity>
        </CardContainer>
      );

    case 'myMatchs':
      console.log(match, 'natch')
      return (
        <CardContainer>
          <TransactionButton onPress={handleBid}>
            <MainContainer>
              <UserContainer>
                {match.fotoUrl && match.fotoUrl !== '' ? (
                  <Picture source={{ uri: match.fotoUrl }} />
                ) : (
                  <UserImage>
                    <Ionicons
                      name='person'
                      size={RFValue(30)}
                      color='#101957'
                    />
                  </UserImage>
                )}

                {match.avaliacaoDisponivel ? (
                  <Button onPress={handleRating}>
                    <Rating>{i18n.t('home.cardInfo.makeRating')}</Rating>
                  </Button>
                ) : (
                  <></>
                )}
              </UserContainer>

              <DetailsCardContainer>
                <Title>{match.nome}</Title>

                <ValueContainer>
                  <ValueBox>
                    <ValuePlaceholder>
                      {i18n.t(
                        'personProfileScreen.currencyScreen.originCurrency'
                      )}
                    </ValuePlaceholder>
                    <Value>
                      {match.moedaOrigemSimbolo} ({match.moedaOrigemNome})
                    </Value>
                  </ValueBox>

                  <MaterialCommunityIcons
                    name='arrow-left-right'
                    size={RFValue(24)}
                    color='#15258b'
                  />

                  <ValueBox>
                    <ValuePlaceholder>
                      {i18n.t(
                        'personProfileScreen.currencyScreen.destinationCurrency'
                      )}
                    </ValuePlaceholder>
                    <Value>
                    {match.moedaDestinoSimbolo} {match.valor}
                    </Value>
                  </ValueBox>
                </ValueContainer>

                {/* <TransactionButtonText>
                  {match.avaliacaoDisponivel
                    ? i18n.t("home.cardInfo.seeExchange")
                    : i18n.t("home.cardInfo.goToChat")}
                </TransactionButtonText> */}
              </DetailsCardContainer>
            </MainContainer>
          </TransactionButton>

          <MyRequestButtonContainer>
            <ActiveRequest>
              {i18n.t('home.cardInfo.activeUntil')} {match.dataDisponibilidade}
            </ActiveRequest>

            <Button onPress={deleteMatch}>
              <MaterialIcons name='cancel' size={RFValue(16)} color='#9B0E1C' />
              <MyRequestTextBtn color='#9B0E1C'>
                {i18n.t('home.cardInfo.deleteButton')}
              </MyRequestTextBtn>
            </Button>
          </MyRequestButtonContainer>
        </CardContainer>
      );

    case 'myRequests':
      console.log(proposal)
      return (
        <CardContainer>
          <TouchableOpacity onPress={handleBid}>
            <MainContainer>
              <UserContainer>
                {userPhoto && userPhoto !== '' ? (
                  <Picture source={{ uri: userPhoto }} />
                ) : (
                  <UserImage>
                    <Ionicons
                      name='person'
                      size={RFValue(30)}
                      color='#101957'
                    />
                  </UserImage>
                )}

                {proposal.propostaAceita?.transacao?.status === 5 && (
                  <Button onPress={handleRating}>
                    <Rating paddingLeft='0'>
                      {i18n.t('home.cardInfo.makeRating')}
                    </Rating>
                  </Button>
                )}
              </UserContainer>

              <DetailsCardContainer>
                <Title>
                  {proposal.propostaAceita?.transacao?.status === 5
                    ? proposal.usuarioPropostaAceita?.usuario?.nome
                    : i18n.t('home.cardInfo.waitingMate')}
                </Title>

                <ValueContainer>
                  <ValueBox>
                    <ValuePlaceholder>
                      {i18n.t(
                        'personProfileScreen.currencyScreen.originCurrency'
                      )}
                    </ValuePlaceholder>
                    <Value>
                      {proposal.moedaOrigemSimbolo} ({proposal.moedaOrigemNome})
                    </Value>
                  </ValueBox>
                  <MaterialCommunityIcons
                    name='arrow-left-right'
                    size={RFValue(24)}
                    color='#15258b'
                  />
                  <ValueBox>
                    <ValuePlaceholder>
                      {i18n.t(
                        'personProfileScreen.currencyScreen.destinationCurrency'
                      )}
                    </ValuePlaceholder>
                    <Value>
                      {proposal.moedaDestinoSimbolo} {proposal.valor}
                    </Value>
                  </ValueBox>
                </ValueContainer>
              </DetailsCardContainer>
            </MainContainer>
          </TouchableOpacity>

          <MyRequestButtonContainer>
            <ValueBox>
              <TransactionButton
                activeOpacity={
                  proposal.propostaAceita?.transacao?.status === 5 ? 0.5 : 0.2
                }
                onPress={
                  proposal.propostaAceita?.transacao?.status === 5
                    ? handleTransaction
                    : handleBid
                }
              >
                {renderDecision()}
              </TransactionButton>
              <ActiveRequest>
                {i18n.t('home.cardInfo.activeUntil')}{' '}
                {proposal.dataDisponibilidade}
              </ActiveRequest>
            </ValueBox>

            <Button onPress={deleteSolicitation}>
              <MaterialIcons name='cancel' size={RFValue(16)} color='#9B0E1C' />
              <MyRequestTextBtn>
                {i18n.t('home.cardInfo.deleteButton')}
              </MyRequestTextBtn>
            </Button>
          </MyRequestButtonContainer>
        </CardContainer>
      );

    case 'myRatings':
      return (
        <CardContainer>
          <MainContainer>
            <UserContainer>
              {userPhoto && userPhoto !== '' ? (
                <Picture source={{ uri: userPhoto }} />
              ) : (
                <UserImage>
                  <Ionicons name='person' size={RFValue(30)} color='#101957' />
                </UserImage>
              )}

              <RateContainer>
                <StarRateContainer>
                  <StarIcon />
                  <Rating>
                    {userAvaliation ? userAvaliation.toFixed(1) : '0.0'}
                  </Rating>
                </StarRateContainer>
              </RateContainer>
            </UserContainer>

            <DetailsCardContainer justifyContent='null'>
              <Title>{userName}</Title>
              <DescriptionContainer>
                <Description>{evaluation?.avaliacao?.resposta2}</Description>
              </DescriptionContainer>
            </DetailsCardContainer>
          </MainContainer>
        </CardContainer>
      );

    case 'exchangeBid':
      return (
        <CardContainerBtn onPress={openUserChat}>
          <MainContainer>
            <UserContainer>
              {userPhoto && userPhoto !== '' ? (
                <Picture source={{ uri: userPhoto }} />
              ) : (
                <UserImage>
                  <Ionicons name='person' size={RFValue(30)} color='#101957' />
                </UserImage>
              )}
              <RateContainer>
                <StarRateContainer>
                  <StarIcon />
                  <Rating>{userAvaliation}</Rating>
                </StarRateContainer>
                <RatingText>
                  {userTotalAvaliation === 0
                    ? userTotalAvaliation + ' ' + i18n.t('home.cardInfo.rating')
                    : userTotalAvaliation === 1
                    ? userTotalAvaliation +
                      ' ' +
                      i18n.t('home.cardInfo.ratingS')
                    : userTotalAvaliation +
                      ' ' +
                      i18n.t('home.cardInfo.rating')}
                </RatingText>
              </RateContainer>
            </UserContainer>

            <DetailsCardContainer justifyContent='null'>
              <Title>{userNameRequest}</Title>

              <TransactionsContainer>
                <Transactions color='#0D0D19'>
                  {/* {userTotalTransaction === 0
                    ? userTotalTransaction +
                    " " +
                    i18n.t("home.cardInfo.exchangeCountS")
                    : userTotalTransaction === 1
                      ? userTotalTransaction +
                      " " +
                      i18n.t("home.cardInfo.exchangeCount")
                      : userTotalTransaction +
                      " " +
                      i18n.t("home.cardInfo.exchangeCountS")} */}
                </Transactions>
              </TransactionsContainer>
            </DetailsCardContainer>
          </MainContainer>
        </CardContainerBtn>
      );

    default:
      return null;
  }
}
