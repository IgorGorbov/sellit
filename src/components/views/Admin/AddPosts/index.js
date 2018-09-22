import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { navigatorDrawer } from '../../../../utils/misc';

export default class AddPosts extends React.Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDrawer(event, this);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Posts!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
