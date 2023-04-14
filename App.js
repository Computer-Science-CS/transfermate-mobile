import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React, { useState, useEffect } from "react";
import { Platform, SafeAreaView, Alert, LogBox, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage from "react-native-flash-message";
import * as Notifications from "expo-notifications";
import NetInfo from "@react-native-community/netinfo";
import * as Updates from 'expo-updates';
import "./src/translate/i18n";

import LoadingApp from './src/components/LoadingApp'

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_400Regular_Italic,
} from "@expo-google-fonts/poppins";

import {
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import * as Font from 'expo-font';

import Routes from "./src/routes";
import Constants from "expo-constants";
import { store, persistor } from "./src/redux/store";
import firebaseconfig from "./src/config/firebaseConfig";
import firebase from "firebase/app";
import { FirebaseProvider } from "./src/context/firebaseProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

!firebase.apps.length ? firebase.initializeApp(firebaseconfig) : firebase.app();

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  const [connectionState, setConnectionState] = useState(null);

  const [updateMsg, setUpdateMsg] = useState('');
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const onLoad = async () => {
    if (__DEV__ || true) {
      setUpdateMsg("Carregando...");
      _loadResourcesAsync().then(() => {
        setAssetsLoaded(true);
      });
    } else {
      try {
        setUpdateMsg("Verificando se há atualizações");
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setUpdateMsg("Baixando atualizações");
          const newBundle = await Updates.fetchUpdateAsync();
          // if (newBundle.isNew) {
            await Updates.reloadAsync();
          // }
        } else {
          setUpdateMsg("Carregando, aguarde ...");
          _loadResourcesAsync().then(() => {
            setAssetsLoaded(true);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
      }),
    ]);
  };

  async function getPermissionNotifications() {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (existingStatus !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionState(state.isConnected);
    });
    return unsubscribe();
  }, []);

  useEffect(() => {
    onLoad();
    getPermissionNotifications();
  }, []);

  return (
    <>
      {
        assetsLoaded ?
          <FirebaseProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <StatusBar barStyle="light-content" backgroundColor="#0B5393" />
                <SafeAreaView style={{ backgroundColor: "#0B5393" }} />
                <Routes />
                <FlashMessage position="top" />
                <SafeAreaView style={{ backgroundColor: "#041452" }} />
              </PersistGate>
            </Provider>
          </FirebaseProvider>
          :
          <LoadingApp message={updateMsg ? updateMsg : ''} />
      }
    </>
  )

  // if (connectionState) {
  //   if (!fontsLoaded) {
  //     return <AppLoading />;
  //   } else {
  //     return (
  //       <FirebaseProvider>
  //         <Provider store={store}>
  //           <PersistGate loading={null} persistor={persistor}>
  //             <StatusBar barStyle="light-content" backgroundColor="#0B5393" />
  //             <SafeAreaView style={{ backgroundColor: "#0B5393" }} />
  //             <Routes />
  //             <FlashMessage position="top" />
  //             <SafeAreaView style={{ backgroundColor: "#041452" }} />
  //           </PersistGate>
  //         </Provider>
  //       </FirebaseProvider>
  //     );
  //   }
  // } else {
  //   return <></>;
  // }
}
