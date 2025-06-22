import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { morePanelsData as data } from "../../classes/Database";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const MoreScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.flexContainer}>
          {data.map((item, index) => (
            <TouchableHighlight key={index+1} style={styles.block} underlayColor="#948870" onPress={() => {}}>
              <View style={styles.buttonView}>
                <Ionicons name={item.iconName} size={Math.round(screenHeight / 20)} color="gray" />
                <Text style={styles.blockText}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 Stacked.</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
  buttonView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
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
    color: '#1c1c1c',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
},
});

export default MoreScreen;
