import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginForm from './loginForm';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class LoginPanel extends Component {
  state = {
    backImage: new Animated.Value(0),
    inputForm: new Animated.Value(0),
    animFinished: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.state.animFinished) {
      Animated.parallel([
        Animated.timing(this.state.backImage, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(this.state.inputForm, {
          toValue: 1,
          duration: 1500,
        }),
      ]).start(
        this.setState({
          animFinished: true,
        })
      );
    }
  }

  render() {
    return (
      <View style={styles.panelContainer}>
        <Animated.View
          style={{
            opacity: this.state.backImage,
          }}
        >
          <AnimatedIcon
            style={
              this.props.orientation === 'portrait'
                ? styles.imageStylePortrait
                : styles.imageStyleLandscape
            }
            name="pied-piper-alt"
            size={180}
            color="#358680"
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.inputForm,
            top: this.state.inputForm.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 30],
            }),
          }}
        >
          <LoginForm
            orientation={this.props.orientation}
            platform={this.props.platform}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    marginTop: -50,
    width: '100%',
    alignItems: 'center',
  },
  imageStylePortrait: {
    width: '100%',
    height: 180,
  },
  imageStyleLandscape: {
    width: 0,
    height: 0,
  },
});
