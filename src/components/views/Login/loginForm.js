import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUp, signIn } from '../../../Store/actions/user_actions';

import Input from '../../../utils/forms/input';
import ValidationRulesfrom from '../../../utils/forms/validationRules';
import LoadTabs from '../Tabs';
import { setToken, getToken } from '../../../utils/misc';

class LoginForm extends Component {
  state = {
    type: 'Login',
    action: 'Login',
    actionMode: 'Not a user, Register',
    hasErrors: false,
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          minLength: 6,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          confirmPass: 'passwords',
        },
      },
    },
  };

  componentDidMount() {
    getToken(() => {
      console.log('get Token');
    });
  }

  manageAccess = () => {
    if (!this.props.User.userData.uid) this.setState({ hasErrors: true });
    else {
      setToken(this.props.User.userData, () => {
        this.setState({ hasErrors: false });
        LoadTabs();
      });
    }
  };

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false,
    });

    const formCopy = this.state.form;
    formCopy[name].value = value;

    const { rules } = formCopy[name];
    const valid = ValidationRulesfrom(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({
      form: formCopy,
    });
  };

  changeFormType = () => {
    const type = this.state.type;
    this.setState({
      hasErrors: false,
      type: type === 'Login' ? 'Register' : 'Login',
      action: type === 'Login' ? 'Register' : 'Login',
      actionMode:
        type === 'Login' ? 'Not registered, Login' : 'Not a user, Register',
    });
  };

  confirmPassword = () =>
    this.state.type !== 'Login' ? (
      <Input
        placeholder="Confirm your passwords"
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText={value => this.updateInput('confirmPassword', value)}
        autoCapitalize="none"
        secureTextEntry
      />
    ) : null;

  submitUser = () => {
    let isFormValid = true;
    const formToSubmit = {};
    const formCopy = this.state.form;

    for (const key in formCopy) {
      if (this.state.type === 'Login') {
        if (key !== 'confirmPassword') {
          isFormValid = isFormValid && formCopy[key].valid;
          formToSubmit[key] = formCopy[key].value;
        }
      } else {
        isFormValid = isFormValid && formCopy[key].valid;
        formToSubmit[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      if (this.state.type === 'Login') {
        this.props.signIn(formToSubmit).then(() => {
          console.log('signIn');
        });
      } else {
        this.props.signUp(formToSubmit).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({
        hasErrors: true,
      });
    }
  };

  formHasErrors = () =>
    this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Opps, check your info</Text>
      </View>
    ) : null;

  render() {
    return (
      <View
        style={
          this.props.orientation === 'portrait'
            ? styles.formInputConrainerPortrait
            : styles.formInputConrainerLandscape
        }
      >
        <Input
          placeholder="Enter your email"
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.updateInput('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="Enter your password"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput('password', value)}
          autoCapitalize="none"
          secureTextEntry
        />

        {this.confirmPassword()}
        {this.formHasErrors()}

        <View
          style={
            this.props.platform === 'android'
              ? styles.buttonStyleAndroid
              : styles.buttonStyleIos
          }
        >
          <Button
            title={this.state.action}
            color="#fd9727"
            onPress={this.submitUser}
          />
        </View>
        <Button
          title={this.state.actionMode}
          color="lightgrey"
          onPress={this.changeFormType}
        />
        <Button title="I'll do it later" color="lightgrey" onPress={LoadTabs} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formInputConrainerPortrait: {
    width: '100%',
    minHeight: 440,
  },
  formInputConrainerLandscape: {
    width: '100%',
    minHeight: 440,
    marginTop: -35,
  },
  buttonStyleAndroid: {
    marginBottom: 15,
    marginTop: 155,
  },
  buttonStyleIos: {
    marginBottom: 5,
    marginTop: 10,
  },
  errorContainer: {
    marginBottom: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Roboto-Black',
  },
});

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp, signIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
