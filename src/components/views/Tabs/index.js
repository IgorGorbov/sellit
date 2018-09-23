import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

let homeIcon;
let postsIcon;
let menuIcon;

const navStyle = {
  navBarTextFontSize: 20,
  navBarTextColor: '#fff',
  navBarTextFontFamily: 'RobotoCondensed-Bold',
  navBarTitleTextCentered: true,
  navBarBackgroundColor: '#00ada9',
};

const navLeftButton = () => ({
  title: 'Drawer',
  id: 'DrawerButton',
  icon: menuIcon,
  disableIconTint: true,
  buttonColor: 'white',
});

const LoadTabs = () => {
  Icon.getImageSource('home', 32)
    .then(icon => {
      homeIcon = icon;
      return Icon.getImageSource('dollar', 32);
    })
    .then(icon => {
      postsIcon = icon;
      return Icon.getImageSource('bars', 20, 'white');
    })
    .then(icon => {
      menuIcon = icon;
    })
    .then(() => {
      Navigation.startTabBasedApp({
        tabs: [
          {
            screen: 'sellitApp.Home',
            label: 'Home',
            icon: homeIcon,
            title: 'Home',
            navigatorStyle: navStyle,
            navigatorButtons: {
              leftButtons: [navLeftButton()],
            },
          },
          {
            screen: 'sellitApp.AddPosts',
            label: 'Sell it',
            icon: postsIcon,
            title: 'Sell it',
            navigatorStyle: navStyle,
            navigatorButtons: {
              leftButtons: [navLeftButton()],
            },
          },
        ],
        tabsStyle: {
          tabBarButtonColor: 'grey',
          tabBarSelectedButtonColor: '#ffc636',
          tabBarTextFontFontFamily: 'RobotoCondensed-Bold',
          tabBarBackgroundColor: 'white',
          tabBarTranslucent: false,
        },
        appStyle: {
          tabBarButtonColor: 'grey',
          tabBarSelectedButtonColor: '#ffc636',
          tabBarTextFontFontFamily: 'RobotoCondensed-Bold',
          tabBarBackgroundColor: 'white',
          tabBarTranslucent: false,
          navBarButtonColor: '#fff',
          keepStyleAcrossPush: true,
        },
        drawer: {
          left: {
            screen: 'sellitApp.Sidedrawer',
            fixedWidth: 400,
          },
        },
      });
    });
};
export default LoadTabs;
