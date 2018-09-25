import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUserPosts } from '../../../../Store/actions/user_actions';

class UserPosts extends Component {
  static navigatorButtons = {
    leftButtons:
      Platform.OS === 'ios'
        ? [
            {
              title: 'Go back',
              id: 'goBack',
            },
          ]
        : null,
  };

  constructor(props) {
    super(props);

    if (Platform.OS === 'ios') {
      this.props.navigator.setOnNavigatorEvent(event => {
        if (event.id === 'goBack') {
          this.props.navigator.dismissAllModals({
            animationType: 'slide-down',
          });
        }
      });
    }
    this.state = {};
  }

  componentDidMount() {
    const UID = this.props.User.userData.uid;
    this.props.getUserPosts(UID);
  }

  render() {
    return (
      <View>
        <Text> UserPosts </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPosts);
