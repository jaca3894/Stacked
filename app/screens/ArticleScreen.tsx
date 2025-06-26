import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Linking, TouchableOpacity } from "react-native";
import RootStackParamList from "../../props/RootStackParamList";
import { useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { articlesData as data } from "../../classes/Database";
import { Image as Gif} from 'expo-image';


type ArticleScreenProp = RouteProp<RootStackParamList, "Article">;

const extractYouTubeId = (url: string): string => {
  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regExp);
  return match ? match[1] : '';
};


const screenHeight = Dimensions.get('window').height;

const ArticleScreen = () => {
  
  const route = useRoute<ArticleScreenProp>();
  const { articleId } = route.params;
  const article = data[articleId];
  const [liked, setLiked] = useState(article.isLiked);
  console.log("Article ID:", articleId);

  const toggleLike = () => {
    setLiked(!liked);
    article.isLiked = !liked;
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#1c1c1c', height: '100%' }}>
      <Gif source={article.bannerPath} style={ styles.banner } contentFit='cover' transition={300} cachePolicy="memory-disk"/>
      <ScrollView style={ styles.content }>
        <View style={ styles.introFlexContainer }>
            <Text style={[styles.categoryTab, { backgroundColor: article.categoryTabColor || '#cbbb9c' }]}>{article.category}</Text>
            <Text style={ styles.titleText }>{article.title}</Text>
            {article.videoLink != "null" && (<Text style={{ color: "gray", fontSize: 14, fontStyle: "italic", marginBottom: 20 }}>Thumbnail sourced from the linked video below.</Text>)}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Image source={require('../../assets/logo.png')} style={{ width: 50, height: 50, borderRadius: 25, alignSelf: "center" }} />
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', height: 70, width: "70%" }}>
                <Text style={ styles.authorTextTitle }>Stacked Academy</Text>
                <Text style={ styles.dateText }>{article.date}</Text>
              </View>
              <Icon onPress={toggleLike} name={liked ? "heart" : "heart-outline"} color={!liked ? "#cbbb9c" : "red"} size={35} style={{ alignSelf: "center"}}/>
            </View>
        </View>
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ color: 'white', fontSize: 16, lineHeight: 24 }}>
            {article.content}
          </Text>
          {article.videoLink != "null" && (
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => Linking.openURL(article.videoLink)}
            >
              <Image
                source={{ uri: `https://img.youtube.com/vi/${extractYouTubeId(article.videoLink)}/hqdefault.jpg` }}
                style={{ height: 200, borderRadius: 10 }}
              />
              <Text style={{ color: '#cbbb9c', marginTop: 20, textAlign: 'center', fontStyle: 'italic' }}>
                Watch the video tutorial — created by {article.videoAuthor}, shared on YouTube under the CC BY 3.0 license.             
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.footer}>
            <Text style={styles.footerText}>2025 Stacked.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: '40%',
  },
  content: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  introFlexContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1.5,
  },
  categoryTab: {
    fontSize: 16,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    maxWidth: '70%',
    textAlign: 'center',
    height: screenHeight * 0.03,
    lineHeight: screenHeight * 0.03,
    color: '#1c1c1c',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    textAlign: 'left',
    marginBottom: 10,
  },
  authorTextTitle: {
    fontSize: 16,
    color: '#cbbb9c',
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
  footer: {
    height: screenHeight * 0.1,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default ArticleScreen;