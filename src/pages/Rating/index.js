import React, { useState, useEffect } from "react";
import { RefreshControl } from 'react-native'
import { useSelector, shallowEqual } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import i18n from "i18n-js";

import {
  GradientContainer,
  TitleHeaderContainer,
  TextTitle,
  HeaderContainer,
  IconsHeaderContainer,
  TextButtonHeader,
  RatingListContainer,
  ExchangeListContainer,
  EmptyTextContainer,
  EmptyText,
} from "./styles";

import Header from "../../components/Header";
import CardInfo from "../../components/CardInfo";
import Loader from "../../components/Loader";

import StarIcon from "../../assets/images/star-icon.js";

import evaluationRepository from "../../services/evaluationRepository/evaluationRepository";
import userRepository from "../../services/userRepository/userRepository";

export default function Rating() {
  const navigation = useNavigation();

  const user = useSelector((state) => state.login, shallowEqual);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const [totalRating, setTotalRating] = useState(0);

  const onRefreshMatchScreen = React.useCallback(async () => {
    setRefreshing(true)
    fetchEvaluation()
  }, [refreshing]);

  //evaluationRepository.getEvaluationByUserIdAvaliado(request.usuario.id)

  const fetchEvaluation = () => {
    setLoading(true)
    evaluationRepository.getEvaluations().then(res => {
      const response = res.data.data
      evaluationRepository.getEvaluationByUserId(user.usuario.id).then((rating) => {
        const myRating = rating.data.data
        const promise = myRating.map(async r => {
          return {
            ...r,
            usuarioSolicitacao: (await userRepository.getUserDetailsById(r?.transacao?.proposta?.solicitacao?.usuarioId)).data.data,
            usuarioProposta: (await userRepository.getUserDetailsById(r?.usuarioId)).data.data,
          }
        })
        Promise.all(promise).then(res => {
          if (myRating.length > 0) {
            setLoading(false)
            setRefreshing(false)
            setEvaluations(res);
            const totalRating = myRating.reduce((acc, obj) => {
              return (acc += obj.avaliacaoGeral);
            }, 0);
            setTotalRating((totalRating / myRating.length).toFixed(1));
          }
          setLoading(false)
          setRefreshing(false)
        })
      }).catch(error => {
        setLoading(false)
      })
    }).catch(error => {
      setLoading(false)
    })
  };

  useEffect(() => {
    fetchEvaluation();
  }, [user.usuario.id]);

  const renderEvaluation = ({ item }) => {
    return (
      <CardInfo
        cardRender="myRatings"
        evaluation={item}
        userPhoto={user?.usuario?.id === item?.transacao?.proposta?.usuarioId ? item?.usuarioProposta?.fotoUrl : item?.usuarioSolicitacao?.fotoUrl}
        userAvaliation={user?.usuario?.id ===  item?.transacao?.proposta?.usuarioId  ? item?.avaliacaoGeral : item?.avaliacaoGeral}
        userName={user?.usuario?.id ===  item?.transacao?.proposta?.usuarioId  ? item?.usuarioProposta?.nome : item?.usuarioSolicitacao?.nome}
      />
    );
  };

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
        <TitleHeaderContainer>
          <TextTitle>
            {i18n.t("personProfileScreen.myRating.ratingAndReview")}
          </TextTitle>
        </TitleHeaderContainer>

        <HeaderContainer>
          <IconsHeaderContainer>
            <StarIcon />
          </IconsHeaderContainer>
          <TextButtonHeader>
            {evaluations.length ? (evaluations.flatMap(x => x.avaliacaoGeral).reduce((a,b) => a + b) / evaluations.length).toFixed(1) : ' 0'}{" "}{i18n.t("personProfileScreen.myRating.ofRating")}
            {" "}{evaluations.length}{" "}
            {evaluations.length <= 1
              ? i18n.t("personProfileScreen.myRating.rating")
              : i18n.t("personProfileScreen.myRating.ratings")}
          </TextButtonHeader>
        </HeaderContainer>

        <RatingListContainer
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshMatchScreen}
            />
          }
          refreshing={refreshing}
          data={evaluations}
          extraData={evaluations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEvaluation}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <ExchangeListContainer>
              <EmptyTextContainer>
                <EmptyText>
                  {i18n.t("personProfileScreen.myRating.ratingMessage")}
                </EmptyText>
              </EmptyTextContainer>
            </ExchangeListContainer>
          )}
        />
      </GradientContainer>
    </>
  );
}
