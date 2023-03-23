import React, { useEffect, useState, useContext } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Animated } from 'react-native'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import * as yup from 'yup'
import { Formik } from 'formik'
import { FirebaseContext } from '../../context/firebaseProvider'
import jwt_decode from 'jwt-decode'
import i18n from 'i18n-js'
import * as Crypto from 'expo-crypto'
import { showMessage } from 'react-native-flash-message'
import { RFValue } from 'react-native-responsive-fontsize'

import * as WebBrowser from 'expo-web-browser'
import firebase from 'firebase/app'
import * as Facebook from 'expo-facebook'
import 'firebase/auth'
import * as GoogleSignIn from 'expo-google-sign-in'
import * as AppleAuthentication from 'expo-apple-authentication'

import { GoogleSignInMethod } from '../../services/signInMethods'
import authRepository from "../../services/authRepository/authRepository";

import {
  ContainerLoading,
  TextBtn,
  GradientContainer,
  LogoContainer,
  LoginContainer,
  ForgotBtn,
  TextForgot,
  LoginWithContainer,
  MainContainerLogins,
  LoginWithText,
  BtnContainer
} from './styles'

import Logo from '../../assets/logo/logo.png'
import GoogleIcon from '../../assets/images/google-icon.js'

import { BtnDark } from '../../components/ButtonDark'
import { BtnLight } from '../../components/ButtonLight'
import { InputField } from '../../components/Inputs'

import { LoginSocialMidias, LoginUser } from '../../redux/actions/actions'

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
  const navigation = useNavigation()

  const error = useSelector(state => state.error, shallowEqual)
  const dispatch = useDispatch()
  const { app, auth } = useContext(FirebaseContext)

  const [loading, setLoading] = useState(false)
  const [availableAppleLogin, setAvailableAppleLogin] = useState(null)
  const [logo] = useState(new Animated.Value(0.2))
  const [logoContainer] = useState(new Animated.Value(10))

  const FormSchema = yup.object().shape({
    email: yup
      .string()
      .email(`${i18n.t('notifications.validEmail')}`)
      .required(`${i18n.t('notifications.requiredEmail')}`),
    senha: yup
      .string()
      .matches(/\d/, 'A senha deve ter um número')
      .min(
        8,
        ({ min }) =>
          `${i18n.t('notifications.atLeastPassword')} ${min} ${i18n.t(
            'notifications.minCharactersPasword'
          )}`
      )
      .required(`${i18n.t('notifications.requiredPassword')}`)
  })

  const initAsync = async () => {
    await GoogleSignIn.initAsync()
  }

  const signInAsync = async () => {
    const response = await GoogleSignInMethod(setLoading)

    const user = {
      nome: response.dataG.nome,
      email: response.dataG.email,
      senha: '123@Mudar'
    }


    try {
      const response = await authRepository.createNewUser(user);
      console.log(response, 'AQUI')
      setLoading(false)
      if (response.status === 200) {
        auth
          .createUserWithEmailAndPassword(
            user.email.toLowerCase(),
            user.senha
          )
          .then((createResponse) => {
            if (createResponse.additionalUserInfo.isNewUser) {
              auth
                .signInWithEmailAndPassword(
                  user.email.toLowerCase(),
                  user.senha
                )
                .then(() => {
                  setTimeout(() => {
                    showMessage({
                      type: "success",
                      message: i18n.t("notifications.registration"),
                      icon: { position: "right", icon: "success" },
                      titleStyle: { fontSize: 16, textAlign: "center" },
                      hideOnPress: true,
                      duration: 5000,
                    });
                    dispatch(LoginUser(user, setLoading));
                  }, 1850);
                })
                .catch((error) => {
                  setLoading(false);
                  showMessage({
                    type: "danger",
                    message: i18n.t("notifications.errorRegistrationLogin"),
                    icon: { position: "right", icon: "danger" },
                    titleStyle: { fontSize: 16, textAlign: "center" },
                    hideOnPress: true,
                    duration: 5000,
                  });
                });
              return;
            }
          })
          .catch((error) => {
            console.log(error, 'ERRROOOOO')
            setLoadingSignIn(false);
            showMessage({
              type: "danger",
              message: i18n.t("notifications.errorRegistration"),
              icon: { position: "right", icon: "danger" },
              titleStyle: { fontSize: 16, textAlign: "center" },
              hideOnPress: true,
              duration: 5000,
            });
          });
      }
    } catch (error) {
      console.log(error.response.data, 'ERRRRO')
      setLoading(false)
      try{
        auth
                .signInWithEmailAndPassword(
                  user.email.toLowerCase(),
                  user.senha
                )
                .then(() => {
                  setTimeout(() => {
                    showMessage({
                      type: "success",
                      message: i18n.t("notifications.registration"),
                      icon: { position: "right", icon: "success" },
                      titleStyle: { fontSize: 16, textAlign: "center" },
                      hideOnPress: true,
                      duration: 5000,
                    });
                    dispatch(LoginUser(user, setLoading));
                  }, 1850);
                })
      }catch(error){
        console.log('ERRRRROOR', error)
        setLoading(false);
        showMessage({
          type: "danger",
          message: error.response.data.errors[0],
          icon: { position: "right", icon: "danger" },
          titleStyle: { fontSize: 16, textAlign: "center" },
          hideOnPress: true,
          duration: 5000,
        });
      }
      
    }
    //  app
    //   .auth()
    //   .signInWithCredential(response.googleCredential)
    //   .then(() => {
    //     console.log('Retornou até aqui-----------------------');
    //     dispatch(
    //       LoginSocialMidias(response.dataG, setLoading, navigation, showMessage)
    //     );
    //   })
    //   .catch((error) => {
    //     if (error.code === 'auth/account-exists-with-different-credential') {
    //       Alert.alert(i18n.t('notifications.errorRegistrationLogin'));
    //     }
    //     console.log("NOSSO ERRO __________----", error)
    //     setLoading(false);
    //   });

    // dispatch(
    //   LoginSocialMidias(response.dataG, setLoading, navigation, showMessage)
    // )
  }

  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '387746075988221'
      })
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email']
        })
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=email,name&access_token=${token}`
        )
        const user = await response.json()
        let dataF = {
          nome: user.name,
          email: user.email,
          socialMidiaToken: token,
          socialMidia: 'Facebook'
        }
        setLoading(true)
        const facebookCredential =
          firebase.auth.FacebookAuthProvider.credential(token)
        app
          .auth()
          .signInWithCredential(facebookCredential)
          .then(res => {
            dispatch(LoginSocialMidias(dataF, setLoading, navigation))
          })
          .catch(error => {
            if (
              error.code === 'auth/account-exists-with-different-credential'
            ) {
              setLoading(false)
              Alert.alert(i18n.t('notifications.errorRegistrationLogin'))
            }
          })
      } else {
        // type === 'cancel'
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loginApple = async () => {
    try {
      if (availableLogin) {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL
          ],
          nonce: await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            'CUSTOM STRING'
          )
        })
        setLoading(true)
        if (credential.email === null) {
          const user = jwt_decode(credential.identityToken)
          const authCredential = new firebase.auth.OAuthProvider(
            'apple.com'
          ).credential({
            idToken: credential.identityToken,
            rawNonce: 'CUSTOM STRING'
          })
          let dataA = {
            email: user.email,
            socialMidiaToken: credential.identityToken,
            socialMidia: 'Apple'
          }
          app
            .auth()
            .signInWithCredential(authCredential)
            .then(res => {
              dispatch(
                LoginSocialMidias(dataA, setLoading, navigation, showMessage)
              )
            })
            .catch(error => {
              if (
                error.code === 'auth/account-exists-with-different-credential'
              ) {
                setLoading(false)
                Alert.alert(i18n.t('notifications.errorRegistrationLogin'))
              }
            })
        } else {
          const authCredential = new firebase.auth.OAuthProvider(
            'apple.com'
          ).credential({
            idToken: credential.identityToken,
            rawNonce: 'CUSTOM STRING'
          })
          let dataA = {
            nome: credential.fullName.familyName,
            email: credential.email,
            socialMidiaToken: credential.identityToken,
            socialMidia: 'Apple'
          }
          app
            .auth()
            .signInWithCredential(authCredential)
            .then(res => {
              dispatch(LoginSocialMidias(dataA, setLoading, navigation))
            })
            .catch(error => {
              if (
                error.code === 'auth/account-exists-with-different-credential'
              ) {
                setLoading(false)
                Alert.alert(i18n.t('notifications.errorRegistrationLogin'))
              }
            })
        }
      }
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }

  function handleSign() {
    navigation.navigate('Sign')
  }

  function handleForgotPassword() {
    navigation.navigate('Forgot')
  }

  const handleLogin = async (values, actions) => {
    Keyboard.dismiss()
    setLoading(true)
    app
      .auth()
      .signInWithEmailAndPassword(values.email.toLowerCase(), values.senha)
      .then(() => {
        dispatch(
          LoginUser(
            { email: values.email.toLowerCase(), senha: values.senha },
            setLoading,
            navigation
          )
        )
      })
      .catch(error => {
        console.log(error)
        if (
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          dispatch(
            LoginUser(
              { email: values.email.toLowerCase(), senha: values.senha },
              setLoading,
              navigation
            )
          )
        }
      })
  }

  const availableLogin = async () => {
    try {
      const response = await AppleAuthentication.isAvailableAsync()
      console.log(response)
      setAvailableAppleLogin(response)
    } catch (error) {}
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.parallel([
          Animated.timing(logo, {
            toValue: 0.15,
            duration: 100,
            useNativeDriver: true
          }),
          Animated.timing(logoContainer, {
            toValue: 5,
            duration: 100,
            useNativeDriver: true
          })
        ]).start()
      }
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.parallel([
          Animated.timing(logo, {
            toValue: 0.2,
            duration: 100,
            useNativeDriver: true
          }),
          Animated.timing(logoContainer, {
            toValue: 15,
            duration: 100,
            useNativeDriver: true
          })
        ]).start()
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  useEffect(() => {
    availableLogin()
  }, [])

  /*useEffect(() => {
    initAsync();
  }, []);*/

  return (
    <>
      {loading && (
        <ContainerLoading>
          <BtnDark loading={loading} error={error === 400 ? true : false}>
            <TextBtn>
              {loading ? i18n.t('buttons.entering') : i18n.t('buttons.enter')}
            </TextBtn>
          </BtnDark>
        </ContainerLoading>
      )}
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, flexGrow: 1 }}>
        <GradientContainer colors={['#0B5393', '#041452']}>
          <LogoContainer style={{ transform: [{ translateY: logoContainer }] }}>
            <Animated.Image
              source={Logo}
              resizeMode="contain"
              style={{ width: RFValue(320) }}
            />
          </LogoContainer>

          <LoginContainer>
            <Formik
              validationSchema={FormSchema}
              onSubmit={(values, actions) => {
                handleLogin(values, actions)
              }}
              initialValues={{
                email: '',
                senha: ''
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldTouched,
                setFieldValue
              }) => (
                <>
                  <InputField
                    placeholder={i18n.t('placeholder.email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => {
                      setFieldTouched('email', true)
                    }}
                    backgroundColor={errors.email && touched.email && 'red'}
                    borderColor={errors.email && touched.email && 'red'}
                  />

                  <InputField
                    placeholder={i18n.t('placeholder.password')}
                    value={values.senha}
                    secureTextEntry={true}
                    onChangeText={handleChange('senha')}
                    onBlur={() => {
                      setFieldTouched('senha', true)
                    }}
                    backgroundColor={errors.senha && touched.senha && 'red'}
                    borderColor={errors.senha && touched.senha && 'red'}
                  />

                  {error === 400 && (
                    <ForgotBtn alignItems="flex-start">
                      <TextForgot color="red">
                        {i18n.t('notifications.userErrorLogin')}
                      </TextForgot>
                    </ForgotBtn>
                  )}

                  <ForgotBtn onPress={handleForgotPassword}>
                    <TextForgot>{i18n.t('buttons.forgot')}</TextForgot>
                  </ForgotBtn>
                  {!loading && (
                    <BtnContainer>
                      <BtnDark onPress={handleSubmit}>
                        <TextBtn>{i18n.t('buttons.enter')}</TextBtn>
                      </BtnDark>
                    </BtnContainer>
                  )}
                </>
              )}
            </Formik>
            <KeyboardAvoidingView behavior="height" />
          </LoginContainer>

          <LoginWithContainer>
            <MainContainerLogins
              onPress={() => {
                signInAsync()
                console.log('é um login')
              }}
            >
              <GoogleIcon />
              <LoginWithText company="Roboto_700Bold">
                {i18n.t('buttons.google')}
              </LoginWithText>
            </MainContainerLogins>

            {/* <MainContainerLogins
              marginBottom={!availableAppleLogin && '0'}
              backgroundColor='#1877f2'
              onPress={() => {
                logIn();
              }}
            >
              <FontAwesome5 name='facebook' size={RFValue(15)} color='white' />

              <LoginWithText marginLeft={10} color='white'>
                {i18n.t('buttons.facebook')}
              </LoginWithText>
            </MainContainerLogins> */}

            {/* {availableAppleLogin && (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                }
                buttonStyle={
                  AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                }
                cornerRadius={2}
                style={{ width: 305, height: 40 }}
                onPress={() => {
                  loginApple();
                }}
              />
            )} */}
          </LoginWithContainer>

          <BtnContainer>
            <BtnLight handleFunction={handleSign}>
              <TextBtn>{i18n.t('buttons.register')}</TextBtn>
            </BtnLight>
          </BtnContainer>
        </GradientContainer>
        <ForgotBtn style={{ backgroundColor: '#01062A' }}>
          <TextForgot>v7.0.8</TextForgot>
        </ForgotBtn>
      </KeyboardAwareScrollView>
    </>
  )
}
