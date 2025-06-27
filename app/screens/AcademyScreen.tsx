import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, Image, FlatList, TouchableHighlight } from 'react-native';
import { skillsData as data } from '../../classes/Database';
import { Image as Gif} from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
const screenHeight = Math.round(Dimensions.get('window').height);

const AcademyScreen = () => {
  
  const navigation = useNavigation<any>();
  let globalIndex = useRef(0).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
      <View style={styles.header}>
          <Image
            source={require('../../assets/logoAcademy.png')}
            style={styles.logo}
            resizeMode="contain"
          />
      </View>
      <ScrollView style={ styles.container } showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <View style={{ width: '100%', padding: 20, alignItems: 'center' }}>
          <Text style={{color: "#f7e2bd", fontSize: 24, fontWeight: "bold"}}>I want to learn more about...</Text>
        </View>
          {data.map((category, categoryIdx) => (
            <View key={categoryIdx} style={styles.categoryBlock}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <FlatList
                data={category.items}
                keyExtractor={(item, idx) => `${item.name}-${idx}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const currentIndex = globalIndex++;
                  return (
                    <TouchableHighlight
                      onPress={() => navigation.navigate("Article", { articleId: currentIndex })}
                      underlayColor={'transparent'}
                    >
                      <View style={styles.skillItem}>
                        <Gif
                          source={item.imagePath}
                          style={styles.skillImage}
                          contentFit='cover'
                          transition={300}
                          cachePolicy="memory-disk"
                        />
                        <View style={styles.skillName}>
                          <Text style={styles.skillNameText}>{item.name}</Text>
                          <Image
                            source={require('../../assets/arrowRight.png')}
                            style={{ width: 20, height: 20, position: 'absolute', right: 10, top: 15 }}
                            resizeMode="contain"
                          />
                        </View>
                      </View>
                    </TouchableHighlight>
                  );
                }}
    />
  </View>
))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>2025 Stacked.</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: 'white',
    backgroundColor: '#1c1c1c',
  },
  header: {
    height: screenHeight * 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1c1c1c',
    alignItems: 'center',  
  },
  logo: {
    marginTop: "10%",
    width: '50%',
    height: '100%',  
  },
  categoryBlock: {
    padding: 20,
    height: 350,
    width: '100%',
    // margin: "auto",
    // borderWidth: 2,
    // borderColor: 'white',
    backgroundColor: '#1c1c1c',
  },
  categoryTitle: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryDescription: {
    color: 'lightgrey',
    fontSize: 12,
    marginBottom: 20,
  },
  categoryScroll: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  skillItem: {
    width: 250,
    height: 200,
    backgroundColor: 'transparent',
    marginRight: 10,
    textAlign: 'left',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  skillImage: {
    width: "100%",
    height: 150,
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  skillName: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: '#cbbb9c',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,

  },
  skillNameText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 50,
    fontWeight: 'bold',
    textAlign: 'left', 
    paddingLeft: 10, 
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
})
export default AcademyScreen;