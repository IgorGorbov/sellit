import React from 'react';
import { StyleSheet, TextInput, Picker } from 'react-native';

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
    case 'picker':
      template = (
        <Picker selectedValue={props.value} {...props}>
          {props.options.map(o => (
            <Picker.Item key={o} label={o} value={o} />
          ))}
        </Picker>
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
