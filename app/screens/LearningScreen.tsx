import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, Image } from 'react-native';

const screenHeight = Math.round(Dimensions.get('window').height);

const LearningScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
      <View style={styles.header}>
          <Image
            source={require('../../assets/logoAcademy.png')}
            style={styles.logo}
            resizeMode="contain"
          />
      </View>
      <ScrollView style={ styles.container } showsVerticalScrollIndicator={false}>
        <View style={styles.categoryBlock}>
          <Text style={styles.categoryTitle}></Text>
          <Text style={styles.categoryDescription}></Text>
          <ScrollView style={styles.categoryScroll} horizontal={true} showsHorizontalScrollIndicator={false}>

          </ScrollView>
        </View>
        <View style={styles.categoryBlock}></View>
        <View style={styles.categoryBlock}></View>
        <View style={styles.categoryBlock}></View>
        <View style={styles.categoryBlock}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1c1c1c',
  },
  categoryBlock: {
    height: screenHeight * 0.3,
    width: '100%',
    margin: "auto",
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'green',
  },
  header: {
    height: screenHeight * 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1c1c1c',
    alignItems: 'center',  
  },
  headerText: {
    width: "50%",
    height: '100%',
    color: '#f8e2bd',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: screenHeight * 0.15,
    textAlign: 'center',
  },
  logo: {
    marginTop: "10%",
    width: '50%',
    height: '100%',  
  },
  categoryTitle: {
    color: '#f8e2bd',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryDescription: {
    color: '#f8e2bd',
    fontSize: 16,
    marginBottom: 20,
  },
  categoryScroll: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
})

export default LearningScreen;