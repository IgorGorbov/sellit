import { Dimensions, Platform, AsyncStorage } from 'react-native';

export const APIKEY = 'AIzaSyA60DWbj_Ql7nVe72yMBw5dUWSJgp4Mgb4';
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key${APIKEY}`;

export const getOrientation = value =>
  Dimensions.get('window').height > value ? 'portrait' : 'landscape';

export const setOrientationListener = cb =>
  Dimensions.addEventListener('change', cb);

export const removeOrientationListener = () =>
  Dimensions.removeEventListener('change');

export const getPlatform = () => {
  if (Platform.OS === 'ios') {
    return 'ios';
  }
  return 'android';
};

export const getToken = cb => {
  AsyncStorage.multiGet([
    '@sellitApp@token',
    '@sellitApp@refreshToken',
    '@sellitApp@uid',
    '@sellitApp@expirationToken',
  ]).then(data => {
    cb(data);
  });
};

export const setToken = (values, cb) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + 3600 * 1000;

  AsyncStorage.multiSet([
    ['@sellitApp@token', values.token],
    ['@sellitApp@refreshToken', values.refToken],
    ['@sellitApp@uid', values.uid],
    ['@sellitApp@expirationToken', expiration.toString()],
  ]).then(response => {
    cb();
  });
};

export const navigatorDrawer = (event, $this) => {
  if (event.type === 'NavBarButtonPress' && event.id === 'DrawerButton') {
    $this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }
};
