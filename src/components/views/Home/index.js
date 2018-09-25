import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getArticles } from '../../../Store/actions/article_actions';

import {
  navigatorDrawer,
  navigatorDeepLink,
  gridTwoColumns,
} from '../../../utils/misc';
import ScrollIcons from './scroll_icons';
import BlockItem from './blockItem';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      articles: [],
      categorySelected: 'All',
      categories: ['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
    };

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDeepLink(event, this);
      navigatorDrawer(event, this);
    });
  }

  componentDidMount() {
    this.props.getArticles('All').then(() => {
      const newArticles = gridTwoColumns(this.props.Articles.list);

      this.setState({
        isLoading: false,
        articles: newArticles,
      });
    });
  }

  updateCategory = category => {
    this.setState({
      isLoading: true,
      categorySelected: category,
      articles: [],
    });

    this.props.getArticles(category).then(() => {
      const newArticles = gridTwoColumns(this.props.Articles.list);

      this.setState({
        isLoading: false,
        articles: newArticles,
      });
    });
  };

  goToArticle = props => {
    this.props.navigator.push({
      screen: 'sellitApp.Article',
      animationType: 'slide-horizontal',
      passProps: {
        ArticleData: props,
      },
      backButtonTitle: 'Back to Home',
      navigatorStyle: {
        navBarTextFontSize: 20,
        navBarTextColor: '#fff',
        navBarTextFontFamily: 'RobotoCondensed-Bold',
        navBarBackgroundColor: '#00ada9',
        screenBackgroundColor: '#fff',
      },
    });
  };

  showArticles = () =>
    this.state.articles.map((article, i) => (
      <BlockItem key={i} item={article} iteration={i} goto={this.goToArticle} />
    ));

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ScrollIcons
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategory={this.updateCategory}
          />
          {this.state.isLoading ? (
            <View style={styles.isLoading}>
              <Icon name="gears" size={30} color="lightgrey" />
              <Text style={{ color: 'lightgrey' }}>Loading...</Text>
            </View>
          ) : null}

          <View style={styles.articleContainer}>
            <View style={{ flex: 1 }}>{this.showArticles()}</View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  isLoading: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  articleContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

function mapStateToProps(state) {
  return {
    Articles: state.Articles,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArticles }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
