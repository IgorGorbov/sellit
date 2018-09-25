import React from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { autoSignIn } from '../../../Store/actions/user_actions';

import {
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
  getPlatform,
  getToken,
  setToken,
} from '../../../utils/misc';

import Logo from './logo';
import LoginPanel from './loginPanel';
import LoadTabs from '../Tabs';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      platform: getPlatform(),
      orientation: getOrientation(500),
      logoAnimation: false,
    };

    setOrientationListener(this.changeOrientation);
  }

  componentWillUnmount = () => {
    removeOrientationListener();
  };

  componentDidMount = () => {
    getToken(tokens => {
      if (tokens[0][1] === null) {
        this.setState({
          loading: false,
        });
      } else {
        this.props.autoSignIn(tokens[1][1]).then(() => {
          if (!this.props.User.userData.token) {
            this.setState({
              loading: false,
            });
          } else {
            setToken(this.props.User.userData, () => {
              LoadTabs(true);
            });
          }
        });
      }
    });
  };

  changeOrientation = () => {
    this.setState({
      orientation: getOrientation(500),
    });
  };

  showLogin = () => {
    this.setState({
      logoAnimation: true,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Logo
            showLogin={this.showLogin}
            orientation={this.state.orientation}
          />
          <LoginPanel
            show={this.state.logoAnimation}
            orientation={this.state.orientation}
            platform={this.state.platform}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoSignIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
