import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_COINS,
  ALL_REQUESTS,
  MY_REQUESTS,
  USER_DETAILS,
  MATCHES
} from "../types/types";

const initialState = {
  login: {
    accessToken: "",
    expiresIn: "",
    usuario: {
      email: "",
      id: null,
      nome: "",
    },
  },
  user: {
    usuarioMoedas: [],
  },
  userDestinyCoins: [],
  userOriginCoins: [],
  userCoins: [],
  userCoinsId: [],
  allRequests: [],
  matchesAvailable: [],
  error: 0,
  myOrders: [],
  oneProposal: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: action.payload.login,
        user: action.payload.user,
        error: 0,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        login: {
          accessToken: "",
          expiresIn: "",
          usuario: {
            email: "",
            id: null,
            nome: "",
          },
        },
        user: {
          usuarioMoedas: [],
        },
        allRequests: []
      };
    case USER_COINS:
      const coins = [...state.userCoins];
      const payload = action.payload;
      const destinyCoins = [];
      const originCoins = [];
      const coinsId = [];

      payload.map((coin) => {
        if (coin.tipoMoeda === "D") {
          destinyCoins.push({
            label: coin.moeda.nome,
            value: coin.moedaId,
          });
          coinsId.push(coin.moedaId)
        } else {
          originCoins.push({
            label: coin.moeda.nome,
            value: coin.moedaId,
          });
          coinsId.push(coin.moedaId)
        }
      });

      return {
        ...state,
        userCoins: action.payload,
        userDestinyCoins: destinyCoins,
        userOriginCoins: originCoins,
        userCoinsId: coinsId
      };
    case USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      }
    case MY_REQUESTS:
      return {
        ...state,
        myOrders: action.payload
      }
    case ALL_REQUESTS:
      // let teste = action.payload;
      return {
        ...state,
        allRequests: action.payload,
      };
    case MATCHES: {
      // console.log('aqui', state.userCoinsId)
      const filterTransactions = action.payload.matchs
        .filter(match => state.userDestinyCoins.flatMap(x => x.value).includes(match.moedaOrigem.id))
        .filter(match => state.userOriginCoins.flatMap(x => x.value).includes(match.moedaDestino.id))
        .filter(match => match.ativo === true)
        .filter(r => r.propostas.every(p => p.usuarioId !== action.payload.id))
        .filter(m => m.propostas.every(m => m.status === 0))

      return {
        ...state,
        matchesAvailable: filterTransactions
      }
    }
    case 'ONE_PROPOSE':
      return {
        ...state,
        oneProposal: action.payload,
      }
    default:
      return state;
  }
}
