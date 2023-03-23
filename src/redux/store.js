import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk'

import rootReducer from './reducer/rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login', 'user', 'userCoins'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk))

const persistor = persistStore(store)

export { store, persistor }