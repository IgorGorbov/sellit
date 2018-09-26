import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUserPosts } from '../../../../Store/actions/user_actions';

import { deleteUserPost } from '../../../../Store/actions/article_actions';

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

    this.state = {
      isOpenModal: false,
      posts: [],
      toDelete: '',
    };

    if (Platform.OS === 'ios') {
      this.props.navigator.setOnNavigatorEvent(event => {
        if (event.id === 'goBack') {
          this.props.navigator.dismissAllModals({
            animationType: 'slide-down',
          });
        }
      });
    }
  }

  componentDidMount() {
    const UID = this.props.User.userData.uid;
    this.props.getUserPosts(UID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.User.userPosts) {
      this.setState({
        posts: nextProps.User.userPosts,
      });
    }
  }

  showConfirm = id => {
    this.setState({
      isOpenModal: true,
      toDelete: id,
    });
  };

  deletePost = id => {
    this.props.deleteUserPost(id, this.props.User.userData).then(() => {
      const UID = this.props.User.userData.uid;
      this.props.getUserPosts(UID);

      this.setState({
        isOpenModal: false,
        toDelete: '',
      });
    });
  };

  showPosts = posts =>
    posts
      ? posts.map(post => (
          <View style={styles.postWrapper} key={post.id}>
            <View style={styles.postTitle}>
              <Text style={{ fontFamily: 'Roboto-Black' }}>{post.title}</Text>
            </View>
            <View style={styles.postDescription}>
              <Text>{post.description}</Text>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.price}>Price: $ {post.price}</Text>
                <Text style={styles.category}>Category: {post.category}</Text>
              </View>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => this.showConfirm(post.id)}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Black',
                    color: '#f44336',
                    paddingBottom: 10,
                  }}
                >
                  Delete post
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
              visible={this.state.isOpenModal}
              transparent={false}
            >
              <View style={{ padding: 50 }}>
                <Text style={{ fontSize: 20 }}>
                  Are you sure want to delete the post ?
                </Text>
              </View>

              <View style={{ marginTop: 50 }}>
                <TouchableOpacity
                  onPress={() => this.deletePost(this.state.toDelete)}
                >
                  <Text style={styles.modalDelete}>Yes, Delete it</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isOpenModal: false,
                      toDelete: '',
                    });
                  }}
                >
                  <Text style={styles.modalClose}>No, Close modal</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        ))
      : null;

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={{ marginBottom: 25 }}>
              <Text>You have {this.state.posts.length} posts</Text>
            </View>

            {this.showPosts(this.state.posts)}
          </View>
        </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postWrapper: {
    borderWidth: 2,
    borderColor: '#ececec',
    borderRadius: 2,
    marginBottom: 10,
  },
  postTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  postDescription: {
    padding: 10,
  },
  price: {
    fontSize: 12,
  },
  category: {
    fontSize: 12,
  },
  buttons: {
    alignItems: 'center',
  },
  modalDelete: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: 'red',
  },
  modalClose: {
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: '#00ada9',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserPosts, deleteUserPost }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPosts);
