import { CommonActions } from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  CommonActions.navigate(routeName, params)
}

function goBack(params) {
  _navigator.dispatch(
    CommonActions.back({
      params,
    })
  );
}

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};
