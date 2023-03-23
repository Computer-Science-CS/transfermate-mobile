import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  USER_COINS,
  ALL_REQUESTS,
  MY_REQUESTS,
  USER_DETAILS,
  MATCHES,
} from "../types/types";

import i18n from "i18n-js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import authRepository from "../../services/authRepository/authRepository";
import userRepository from "../../services/userRepository/userRepository";
import requestSolicitationRepository from "../../services/requestSolicitationRepository/requestSolicitationRepository";
import requestRepository from "../../services/requestRepository/requestRepository";
import evaluationRepository from '../../services/evaluationRepository/evaluationRepository'
import coinRepository from "../../services/coinRepository/coinRepository";

export function LoginUser(user, setLoading) {
  return (dispatch) => {
    // dispatch({ type: LOGIN_ERROR, payload: 0 });
    authRepository
      .authUser(user)
      .then(async (auth) => {
        const login = auth.data.data;
        const user = await userRepository.getUserDetailsById(
          auth.data.data.usuario.id
        );
        const formattedUser = {
          ...user.data.data,
        };
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        if (Constants.isDevice) {
          if (existingStatus === "granted") {
            const token = await Notifications.getExpoPushTokenAsync(data);
            let data = { ...user.data.data, pushNotificationId: token.data };
            await userRepository.updateUser(data);
          }
        }
        setLoading(false);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { login: login, user: formattedUser },
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        dispatch({ type: LOGIN_ERROR, payload: 400 });
      });
  };
}

export const UpdateProfile = (payload) => ({
  type: "UPDATE_PROFILE",
  payload,
});

export function getUserDetails(id, setProfile) {
  return async (dispatch) => {
    const user = await userRepository.getUserDetailsById(id);
    const formattedUser = {
      ...user.data.data,
      fotoUrl: user.data.data.fotoUrl,
    };
    console.log(formattedUser)
    setProfile(formattedUser);
    dispatch({ type: USER_DETAILS, payload: formattedUser });
  };
}

export function LoginSocialMidias(data, setLoading, navigation, showMessage) {
  console.log("Retornou até aqui ---------- LoginSocialMidias")
  return (dispatch) => {
    dispatch({ type: LOGIN_ERROR, payload: 0 });
    authRepository
      .createNewUserSocialMidia(data)
      .then(async (response) => {
        const user = await userRepository.getUserDetailsById(
          response.data.data.usuario.id
        );
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        if (existingStatus === "granted") {
          const token = await Notifications.getExpoPushTokenAsync(data);
          let data = { ...user.data.data, pushNotificationId: token.data };
          await userRepository.updateUser(data);
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { login: response.data.data, user: user.data.data },
        });
        setLoading(false);
        navigation.navigate("Root", { screen: "Home" });
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          type: "danger",
          message: i18n.t("notifications.errorAccount"),
          icon: { icon: "danger", position: "right" },
          titleStyle: { fontSize: 16, textAlign: "center" },
          hideOnPress: true,
          duration: 5000,
        });
      });
  };
}

export function LogOut() {
  return (dispatch) => {
    firebase.auth().signOut();
    dispatch({ type: LOGOUT });
  };
}

export function getUserCoins(id) {
  return (dispatch) => {
    userRepository
      .getUserCoins(id)
      .then((response) => {
        dispatch({ type: USER_COINS, payload: response.data.data });
      })
      .catch((error) => {
      });
  };
}

export function getMySolicitations(id) {
  return async (dispatch) => {
    if (id !== null) {
      const promise = await requestRepository
        .getRequestByUserId(id)
        .then(async (response) => {
          const myTrade = response.data.data;
          const trades = await Promise.all(
            myTrade.map(async (trade) => {
              return {
                ...trade,
                moedaDestino: await (
                  await coinRepository.getCoinById(trade.moedaDestinoId)
                ).data.data,
                moedaOrigem: await (
                  await coinRepository.getCoinById(trade.moedaOrigemId)
                ).data.data,
                propostas: await Promise.all(
                  trade.propostas.map(async (proposta) => {
                    return {
                      ...proposta,
                      lastMessage: await firebase
                        .firestore()
                        .collection("chat")
                        .doc(proposta.firebaseId)
                        .collection("chats")
                        .orderBy("createdAt", "desc")
                        .limit(1)
                        .get()
                        .then((res) =>
                          res.docs.map((doc) => {
                            return doc.data().text;
                          })
                        ),
                      valorCentavos: trade.valorCentavos,
                      dataDisponibilidade: trade.dataDisponibilidade,
                      usuarioIdSolicitacao: trade.usuario.id,
                    };
                  })
                ),
              };
            })
          );
          // setMyRequests(trades);
          return trades;
        });
      Promise.all(promise).then((data) => {
        dispatch({
          type: MY_REQUESTS,
          payload: data,
        });
      });
    } else {
      dispatch({
        type: MY_REQUESTS,
        payload: [],
      });
    }
  };
}

export function getAllRequests(id, setLoading) {
  return (dispatch) => {
    if (id !== null) {
      setLoading && setLoading(true);
      let temporaryRequests = [];
      requestSolicitationRepository
        .getRequestsSolicitationsByUser(id)
        .then(async (response) => {
          const teste = await Promise.all(
            response.data.data.map(async (t) => {
              return {
                ...t,
                lastMessage: await firebase
                  .firestore()
                  .collection("chat")
                  .doc(t.firebaseId)
                  .collection("chats")
                  .orderBy("createdAt", "desc")
                  .limit(1)
                  .get()
                  .then((res) =>
                    res.docs.map((doc) => {
                      return doc.data().text;
                    })
                  ),
              };
            })
          );
          temporaryRequests.push(...teste);
          // temporaryRequests.push(...response.data.data);
          requestRepository
            .getRequestByUserId(id)
            .then(async (request) => {
              const requests = request.data.data;
              const teste2 = await Promise.all(
                requests
                  .filter((r) => r.propostas.length > 0)
                  .map(async (r) => {
                    return {
                      ...r,
                      propostas: await Promise.all(
                        r.propostas.map(async (p) => {
                          return {
                            ...p,
                            dataCadastro: r.dataCadastro,
                            valorCentavos: r.valorCentavos,
                            dataDisponibilidade: r.dataDisponibilidade,
                            usuarioIdSolicitacao: r.usuario.id,
                            lastMessage: await firebase
                              .firestore()
                              .collection("chat")
                              .doc(p.firebaseId)
                              .collection("chats")
                              .orderBy("createdAt", "desc")
                              .limit(1)
                              .get()
                              .then((res) =>
                                res.docs.map((doc) => {
                                  return doc.data().text;
                                })
                              ),
                          };
                        })
                      ),
                    };
                    // r.propostas.map((p) => {
                    //   temporaryRequests.push({
                    //     ...p,
                    //     valorCentavos: r.valorCentavos,
                    //     dataDisponibilidade: r.dataDisponibilidade,
                    //     usuarioIdSolicitacao: r.usuario.id,
                    //   });
                    // });
                  })
              );
              teste2.map((r) => {
                r.propostas.map((p) => {
                  temporaryRequests.push(p);
                });
              });
              setLoading && setLoading(false);
              // console.log(teste2[0].propostas[0])
              // temporaryRequests.push()
              // console.log(teste[0].propostas);
              // temporaryRequests.push(...teste);
              // console.log(temporaryRequests);
              dispatch({
                type: ALL_REQUESTS,
                payload: temporaryRequests,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
    }
  };
}

export function getProposeById(id, setLoading) {
  return (dispatch) => {
    setLoading && setLoading(true)
    requestSolicitationRepository
      .getRequestsSolicitationsById(id)
      .then(async (res) => {
        const data = res.data.data;
        const moedaOrigem = await coinRepository.getCoinById(
          data.solicitacao.moedaOrigemId
        );
        const moedaDestino = await coinRepository.getCoinById(
          data.solicitacao.moedaDestinoId
        );

        data.moedaOrigem = moedaOrigem.data.data;
        data.moedaDestino = moedaDestino.data.data;

        dispatch({
          type: "ONE_PROPOSE",
          payload: data,
        });
        setLoading && setLoading(false)
      })
      .catch((error) => {
        console.log("caiu aqui2");
      });
  };
}

export function getMatchesAvailable(id, setLoading) {
  return async (dispatch) => {
    setLoading && setLoading(true);
    const promise = await requestRepository
      .getRequests()
      .then(async (response) => {
        const trade = await Promise.all(
          response.data.data
            .filter((r) => r.usuario.id !== id)
            .map(async (request) => {
              // try{
              //   await evaluationRepository.getEvaluationByUserIdAvaliado(request.usuario.id)
              // }catch(eeee){
              //   console.log(eeee, 'PROBLEMA')
              // }
              return {
                ...request,
                moedaOrigem: await (
                  await coinRepository.getCoinById(request.moedaOrigemId)
                ).data.data,
                moedaDestino: await (
                  await coinRepository.getCoinById(request.moedaDestinoId)
                ).data.data,
                pontuacao: await (
                  await evaluationRepository.getEvaluationByUserIdAvaliado(request.usuario.id)
                ).data.data,
                // qtdTransacao: await(
                //   await transactionRepository.getTransactions(200)
                // ).data.data

              };
            })
        );
        console.log(trade);
        return trade;
      })
      .catch((error) => {
        setLoading && setLoading(false);
      });
    Promise.all([promise]).then(async (res) => {
      setLoading && setLoading(false)
      dispatch({ type: MATCHES, payload: { matchs: res[0], id: id } })
    })
  }
}

// export function setUserActive(id) {
//   return dispatch => {
//     dispatch({
//       type: 'USER_ACTIVE',
//       payload:
//     })
//   }
// }

// export function getUserDestinyCoins(id) {
//   return (dispatch) => {
//     userRepository.getUserCoins(id).then((response) => {
//       console.log(response.data.data);
//       dispatch({ type: USER_COINS, payload: response.data.data });
//     });
//   };
// }
