import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { navigatorDrawer } from '../../../utils/misc';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDrawer(event, this);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
