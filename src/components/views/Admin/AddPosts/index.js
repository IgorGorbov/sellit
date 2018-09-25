import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  addArticle,
  resetArticle,
} from '../../../../Store/actions/article_actions';
import { autoSignIn } from '../../../../Store/actions/user_actions';

import { navigatorDrawer, getToken, setToken } from '../../../../utils/misc';
import Input from '../../../../utils/forms/input';
import ValidationRulesfrom from '../../../../utils/forms/validationRules';

class AddPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      loading: false,
      hasErrors: false,
      modalSuccess: false,
      errorsArray: [],
      form: {
        category: {
          value: '',
          name: 'category',
          valid: false,
          type: 'picker',
          options: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
          rules: {
            isRequired: true,
          },
          errorMsg: 'You need to select a category',
        },
        title: {
          value: '',
          name: 'title',
          valid: false,
          type: 'textinput',
          rules: {
            isRequired: true,
            maxLength: 50,
          },
          errorMsg: 'You need to select a tittle, max of 50 char',
        },
        description: {
          value: '',
          name: 'description',
          valid: false,
          type: 'textinput',
          rules: {
            isRequired: true,
            maxLength: 200,
          },
          errorMsg: 'You need to select a tittle, max of 200 char',
        },
        price: {
          value: '',
          name: 'price',
          valid: false,
          type: 'textinput',
          rules: {
            isRequired: true,
            maxLength: 6,
          },
          errorMsg: 'You need to select a tittle, max of 6 char',
        },
        email: {
          value: '',
          name: 'email',
          valid: false,
          type: 'textinput',
          rules: {
            isRequired: true,
            isEmail: true,
          },
          errorMsg: 'You need to select a tittle, make is valid value',
        },
      },
    };

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDrawer(event, this);
    });
  }

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

  submitForm = () => {
    let isFormValid = true;
    const dataToSubmit = {};
    const formCopy = this.state.form;

    for (const key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      dataToSubmit[key] = this.state.form[key].value;
    }

    if (isFormValid) {
      this.setState({
        loading: true,
      });

      getToken(tokens => {
        const dateNow = new Date();
        const expiration = dateNow.getTime();
        const form = {
          ...dataToSubmit,
          uid: tokens[2][1],
        };

        if (expiration > tokens[2][1]) {
          this.props.autoSignIn(tokens[1][1]).then(() => {
            setToken(this.props.User.userData, () => {
              this.props
                .addArticle(form, this.props.User.userData.token)
                .then(() => {
                  this.setState({
                    modalSuccess: true,
                  });
                });
            });
          });
        } else {
          this.props.addArticle(form, tokens[0][1]).then(() => {
            this.setState({
              modalSuccess: true,
            });
          });
        }
      });
    } else {
      const errorsArray = [];

      for (const key in formCopy) {
        if (!formCopy[key].valid) {
          errorsArray.push(formCopy[key].errorMsg);
        }
      }
      this.setState({
        loading: false,
        hasErrors: true,
        modalIsOpen: true,
        errorsArray,
      });
    }
  };

  showErrorsArray = errors =>
    errors
      ? errors.map(err => (
          <Text key={err} style={styles.errors}>
            {err}
          </Text>
        ))
      : null;

  closeModal = () => {
    this.setState({
      hasErrors: false,
      modalIsOpen: false,
      errorsArray: [],
    });
  };

  resetSellitScreen = () => {
    const formCopy = this.state.form;

    for (const key in formCopy) {
      formCopy[key].valid = false;
      formCopy[key].value = '';
    }

    this.setState({
      modalSuccess: false,
      hasErrors: false,
      errorsArray: [],
      loading: false,
    });

    this.props.resetArticle();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.mainTitle}>Sell your things</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text>Select a category</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Input
                placeholder="Select a category"
                type={this.state.form.category.type}
                value={this.state.form.category.value}
                onValueChange={value => this.updateInput('category', value)}
                options={this.state.form.category.options}
              />
            </View>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.secondTitle}>
              Describe what you are selling
            </Text>
          </View>

          <View>
            <Text>Please add the title and description, be descriptive </Text>
            <Input
              placeholder="Enter a title"
              type={this.state.form.title.type}
              value={this.state.form.title.value}
              onChangeText={value => this.updateInput('title', value)}
              overrideStyle={styles.inputText}
            />
          </View>

          <View>
            <Input
              placeholder="Enter a description"
              type={this.state.form.description.type}
              value={this.state.form.description.value}
              onChangeText={value => this.updateInput('description', value)}
              multiline
              numberOfLines={4}
              overrideStyle={styles.inputTextMultiLine}
            />
          </View>

          <View>
            <View>
              <Text style={{ marginTop: 15, marginBottom: 5 }}>
                Add here much you want for the item.
              </Text>
              <Input
                placeholder="Enter a price"
                type={this.state.form.price.type}
                value={this.state.form.price.value}
                onChangeText={value => this.updateInput('price', value)}
                overrideStyle={styles.inputText}
                keyboardType="numeric"
              />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.secondTitle}>Add your contact data</Text>
            </View>

            <View>
              <Text stele={{ flex: 1, alignItems: 'center' }}>
                Please enter the email where users can contact you
              </Text>

              <Input
                placeholder="Enter your email"
                type={this.state.form.email.type}
                value={this.state.form.email.value}
                onChangeText={value => this.updateInput('email', value)}
                overrideStyle={styles.inputText}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {!this.state.loading ? (
            <Button title="Sell it" color="orange" onPress={this.submitForm} />
          ) : null}

          <Modal
            animationType="slide"
            visible={this.state.modalIsOpen}
            onRequestClose={() => {}}
          >
            <View style={{ padding: 20 }}>
              {this.showErrorsArray(this.state.errorsArray)}

              <Button title="Close it" onPress={this.closeModal} />
            </View>
          </Modal>

          <Modal
            animationType="slide"
            visible={this.state.modalSuccess}
            onRequestClose={() => {}}
          >
            <View style={{ padding: 20 }}>
              <Text>Good job!</Text>
              <Button
                title="go back home"
                onPress={() => {
                  this.resetSellitScreen();
                  this.props.navigator.switchToTab({
                    tabIndex: 0,
                  });
                }}
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  mainTitle: {
    fontFamily: 'Roboto-Black',
    fontSize: 30,
    color: '#00ada9',
  },
  secondTitle: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    color: '#00ada9',
    marginTop: 30,
    marginBottom: 30,
  },
  inputText: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 0,
    padding: 10,
  },
  inputTextMultiLine: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 0,
    padding: 10,
    minHeight: 100,
  },
  errors: {
    fontFamily: 'Roboto-Black',
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
});

function mapStateToProps(state) {
  return {
    User: state.user,
    Articles: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticle, autoSignIn, resetArticle }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPosts);
