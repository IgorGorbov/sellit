import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { navigatorDrawer, navigatorDeepLink } from '../../../utils/misc';
import ScrollIcons from './scroll_icons';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categorySelected: 'All',
      categories: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
    };

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDeepLink(event, this);
      navigatorDrawer(event, this);
    });
  }

  updateCategory = category => {
    this.setState({
      categorySelected: category,
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ScrollIcons
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategory={this.updateCategory}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});
