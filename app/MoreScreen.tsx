import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const data = [
  { title: 'Check hand', iconName: 'layers-outline' },
  { title: 'Glossary', iconName: 'help-outline' },
  { title: 'Report a bug', iconName: 'bug-outline' },
  { title: 'Patch notes', iconName: 'document-text-outline' },
  { title: 'Our social media', iconName: 'logo-instagram' }, // lub logo-twitter / logo-facebook
  { title: 'Settings', iconName: 'settings-outline' },
];


const MoreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.flexContainer}>
        {data.map((item, index) => (
            <TouchableOpacity key={index} style={styles.block}>
                <Ionicons name={item.iconName} size={Math.round(screenHeight / 20)} color="white" />
                <Text style={styles.blockText}>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>2025 Stacked.</Text>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  flexContainer: {
    height: '70%',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    rowGap: screenWidth * 0.1,
    columnGap: screenWidth * 0.1,
    backgroundColor: '#1c1c1c',
  },
  block: {
    width: '35%',
    height: screenWidth * 0.35,
    backgroundColor: '#cbbb9c',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  footer: {
    height: '10%',
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    height: '20%',
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '70%',
    marginTop: '10%',
  },
  blockText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
},
});

export default MoreScreen;
