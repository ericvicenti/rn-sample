
import React, {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  Header,
} from './react-navigation/lib/react-navigation';

import ArticlesAppActions from './ArticlesAppActions';
import ArticlesAppPosts from './ArticlesAppPosts';

const PostPage = ({postId}) => {
  const post = ArticlesAppPosts.find(p => p.id === postId);
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
  );
};

const InfoCell = ({onPress, label}) =>
  <TouchableHighlight style={styles.infoCell} onPress={onPress}>
    <View style={styles.infoCellView}>
      <Text style={styles.infoCellText}>{label}</Text>
    </View>
  </TouchableHighlight>;


const IndexPage = ({dispatch}) => {
  return (
    <ScrollView style={styles.scrollView}>
      {ArticlesAppPosts.map(post => (
        <InfoCell
          label={post.title}
          onPress={() => {
            dispatch(ArticlesAppActions.post(post.id));
          }}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    margin: 20,
  },
  headerButton: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  infoCell: {},
  infoCellView: {
    padding: 20,
    marginTop: -StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    backgroundColor: 'white',

  },
  scrollView: {
    marginTop: Header.HEIGHT,
  },
  infoCellText: {
    color: '#333333',
    fontSize: 18,
  },
});

module.exports = {
  IndexPage,
  PostPage,
};
