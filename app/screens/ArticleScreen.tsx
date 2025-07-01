import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Linking, TouchableOpacity } from "react-native";
import RootStackParamList from "../../props/RootStackParamList";
import { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { articlesData as data } from "../../classes/Database";
import { Image as Gif } from 'expo-image';

type ArticleScreenProp = RouteProp<RootStackParamList, "Article">;

const extractYouTubeId = (url: string): string => {
  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
  const match = RegExp(regExp).exec(url);
  return match ? match[1] : '';
};

const screenHeight = Dimensions.get('window').height;

const ArticleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ArticleScreenProp>();
  const { articleId } = route.params;
  const article = data[articleId];
  const [liked, setLiked] = useState(article.isLiked);

  const toggleLike = () => {
    setLiked(!liked);
    article.isLiked = !liked;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
      <ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
              position: 'absolute',
              top: '3%',
              left: '7%',
              zIndex: 2,
            }}
      >
      <Image
        source={require('../../assets/arrowRight.png')}
        style={{
          width: 20,
          height: 20,
          transform: [{ scaleX: -1 }],
          }}
      />
    </TouchableOpacity>        
    <Gif
          source={article.bannerPath}
          style={styles.banner}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
        />

        <View style={styles.content}>
          <View style={styles.introFlexContainer}>
            <Text style={[styles.categoryTab, { backgroundColor: article.categoryTabColor || '#cbbb9c' }]}>
              {article.category}
            </Text>
            <Text style={styles.titleText}>{article.title}</Text>
            {article.videoLink !== "null" && (
              <Text style={styles.videoNote}>
                Thumbnail sourced from the linked video below.
              </Text>
            )}

            <View style={styles.authorRow}>
              <Image
                source={require('../../assets/logo/logo.png')}
                style={styles.authorAvatar}
              />
              <View style={styles.authorDetails}>
                <Text style={styles.authorTextTitle}>Stacked Academy</Text>
                <Text style={styles.dateText}>{article.date}</Text>
              </View>
              <Icon
                onPress={toggleLike}
                name={liked ? "heart" : "heart-outline"}
                color={liked ? "red" : "#cbbb9c"}
                size={35}
                style={{ alignSelf: "center" }}
              />
            </View>
          </View>

          <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.contentText}>{article.content}</Text>

            {article.videoLink !== "null" && (
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => Linking.openURL(article.videoLink)}
              >
                <Image
                  source={{ uri: `https://img.youtube.com/vi/${extractYouTubeId(article.videoLink)}/hqdefault.jpg` }}
                  style={styles.videoThumbnail}
                />
                <Text style={styles.videoCaption}>
                  Watch the video tutorial — created by {article.videoAuthor}, shared on YouTube under the CC BY 3.0 license.
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.footer}>
              <Text style={styles.footerText}>2025 Stacked.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: screenHeight * 0.35,
  },
  content: {
    marginTop: -screenHeight * 0.05,
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
  videoNote: {
    color: "gray",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 20,
  },
  authorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
  },
  authorDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 70,
    width: "70%",
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
  contentText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  videoThumbnail: {
    height: 200,
    borderRadius: 10,
  },
  videoCaption: {
    color: '#cbbb9c',
    marginTop: 20,
    textAlign: 'center',
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
