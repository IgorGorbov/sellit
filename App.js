import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import ConfigSrore from './src/Store/config';

import Login from './src/components/views/Login';
import Home from './src/components/views/Home';
import AddPosts from './src/components/views/Admin/AddPosts';
import Sidedrawer from './src/components/views/Sidedrawer';

const store = ConfigSrore();

Navigation.registerComponent('sellitApp.Login', () => Login, store, Provider);
Navigation.registerComponent('sellitApp.Home', () => Home, store, Provider);
Navigation.registerComponent(
  'sellitApp.AddPosts',
  () => AddPosts,
  store,
  Provider
);

Navigation.registerComponent(
  'sellitApp.Sidedrawer',
  () => Sidedrawer,
  store,
  Provider
);

export default () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'sellitApp.Login',
      title: 'Login',
      navigatorStyle: {
        navBarHidden: true,
      },
    },
  });
