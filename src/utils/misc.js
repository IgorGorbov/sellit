import { Dimensions, Platform, AsyncStorage } from 'react-native';

export const FIREBASE = 'https://sellitapp-3476e.firebaseio.com';
export const APIKEY = 'AIzaSyA60DWbj_Ql7nVe72yMBw5dUWSJgp4Mgb4';
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

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

export const navigatorDeepLink = (event, $this) => {
  if (event.type === 'DeepLink') {
    $this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });

    if (event.payload.typeLink === 'tab') {
      $this.props.navigator.switchToTab({
        tabIndex: event.payload.indexLink,
      });
    } else {
      $this.props.navigator.showModal({
        screen: event.link,
        animationType: 'slide-horizontal',
        navigatorStyle: {
          navBarBackgroundColor: '#00ada9',
          screenBackgroundColor: '#fff',
        },
        backButtonHidden: false,
      });
    }
  }
};

export const gridTwoColumns = list => {
  const newArticles = [];
  const articles = list;

  let count = 1;
  let vessel = {};

  if (articles) {
    articles.forEach(article => {
      if (count === 1) {
        vessel.blockOne = article;
        count++;
      } else {
        vessel.blockTwo = article;
        newArticles.push(vessel);

        count = 1;

        vessel = {};
      }
    });
  }

  return newArticles;
};
