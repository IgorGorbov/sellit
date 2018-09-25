import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Navigation } from 'react-native-navigation';
import { navigatorDrawer } from '../../../../utils/misc';

export default class NotAllow extends Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDrawer(event, this);
    });

    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="frown-o" size={60} color="#f44336" />
        <Text> You need to log in or register </Text>

        <Button
          title="Login / Register"
          color="#fd9727"
          onPress={() => {
            Navigation.startSingleScreenApp({
              screen: {
                screen: 'sellitApp.Login',
                title: 'Login',
                navigatorStyle: {
                  navBarHidden: true,
                },
              },
            });
          }}
        />
      </View>
    );
  }
}
