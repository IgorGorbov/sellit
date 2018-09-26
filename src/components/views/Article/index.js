import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Article = props => {
  const openEmail = () => {
    Linking.openURL(
      `mailto://${props.ArticleData.email}&subject=Regarding ${
        props.ArticleData.title
      }`
    );
  };
  const articleImage = () => (
    <View style={{ position: 'relative' }}>
      <Image
        resizeMode="cover"
        style={styles.itemImage}
        source={{
          uri: 'https://loremflickr.com/400/400/girl,brazil,dog,paris,cat/all',
        }}
      />

      <Text style={styles.price}>$ {props.ArticleData.price}</Text>
    </View>
  );

  const articleText = () => (
    <View>
      <Text style={styles.title}>{props.ArticleData.title}</Text>
      <Text style={styles.description}>{props.ArticleData.description}</Text>
    </View>
  );

  const ownerInfo = () => (
    <View style={styles.ownerInfo}>
      <Text style={{ fontSize: 14 }}>
        Contact the owner of this article to the following mail:
      </Text>
      <Icon.Button
        name="envelope-o"
        color="#00ada9"
        backgroundColor="#fff"
        onPress={() => openEmail}
      >
        <Text style={{ fontSize: 18 }}>{props.ArticleData.email}</Text>
      </Icon.Button>
    </View>
  );

  return (
    <ScrollView style={styles.articleContainer}>
      {articleImage()}
      {articleText()}
      {ownerInfo()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10,
  },
  itemImage: {
    width: '100%',
    height: 250,
  },
  price: {
    position: 'absolute',
    backgroundColor: '#ff6444',
    bottom: 0,
    padding: 10,
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto-Black',
  },
  title: {
    fontSize: 30,
    color: '#474143',
    fontFamily: 'Roboto-Black',
    marginTop: 20,
  },
  description: {
    marginTop: 20,
    fontSize: 18,
  },
  ownerInfo: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
});

export default Article;
