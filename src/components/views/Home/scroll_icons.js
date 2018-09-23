import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const categoriesIcons = value => {
  let name = '';

  switch (value) {
    case 'All':
      name = 'circle-o-notch';
      break;
    case 'Sports':
      name = 'soccer-ball-o';
      break;
    case 'Music':
      name = 'music';
      break;
    case 'Clothing':
      name = 'shopping-bag';
      break;
    case 'Electronics':
      name = 'tv';
      break;
    default:
      name = '';
  }

  return name;
};

export default class ScrollIcons extends Component {
  state = {};

  generateIcon = categories =>
    categories
      ? categories.map(category => (
          <View style={{ marginRight: 15 }} key={category}>
            <Icon.Button
              name={categoriesIcons(category)}
              iconStyle={{ marginRight: 10, marginLeft: 3 }}
              backgroundColor={
                this.props.categorySelected === category ? '#ff6444' : '#c1c1c1'
              }
              size={20}
              borderRadius={100}
              onPress={() => this.props.updateCategory(category)}
            >
              <Text style={{ color: '#fff', marginRight: 5 }}>{category}</Text>
            </Icon.Button>
          </View>
        ))
      : null;

  render() {
    return (
      <ScrollView
        horizontal
        decelerationRate={0}
        snapToInterval={200}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.scrollContainer}>
          {this.generateIcon(this.props.categories)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
});
