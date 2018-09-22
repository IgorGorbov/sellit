import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const input = props => {
  let template = null;
  switch (props.type) {
    case 'textinput':
      template = (
        <TextInput
          underlineColorAndroid="transparent"
          {...props}
          style={[styles.input, props.overrideStyle]}
        />
      );
      break;
    default:
      return template;
  }
  return template;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    minWidth: 220,
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    padding: 5,
    marginTop: 10,
  },
});

export default input;
