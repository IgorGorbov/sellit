import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';

export default class Logo extends Component {
  state = {
    sellAnim: new Animated.Value(0),
    itAnim: new Animated.Value(0),
  };

  componentWillMount() {
    Animated.sequence([
      Animated.timing(this.state.sellAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.easeOutCubic,
      }),
      Animated.timing(this.state.itAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.easeOutCubic,
      }),
    ]).start(() => {
      this.props.showLogin();
    });
  }

  render() {
    return (
      <View>
        <View
          style={
            this.props.orientation === 'portrait'
              ? styles.logoStylesPortrait
              : styles.logoStylesLandscape
          }
        >
          <Animated.View
            style={{
              opacity: this.state.sellAnim,
              top: this.state.sellAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            }}
          >
            <Text style={styles.sell}>Sell</Text>
          </Animated.View>
          <Animated.View
            style={{
              opacity: this.state.itAnim,
            }}
          >
            <Text style={styles.it}>It</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoStylesPortrait: {
    flex: 1,
    marginTop: 50,
    flexDirection: 'row',
    maxHeight: 100,
  },
  logoStylesLandscape: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    maxHeight: 100,
  },
  sell: {
    fontSize: 40,
    fontFamily: 'RobotoCondensed-Regular',
    color: '#555',
  },
  it: {
    fontSize: 40,
    fontFamily: 'RobotoCondensed-Regular',
    color: '#00ADA9',
  },
});
