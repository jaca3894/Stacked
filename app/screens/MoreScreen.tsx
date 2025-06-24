import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { morePanelsData as data } from "../../classes/Database";
import type { DimensionValue } from 'react-native';

const leftHeights: DimensionValue[] = ['45%', '20%', '30%'];
const rightHeights: DimensionValue[] = ['20%', '50%', '25%'];

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
          <View style={styles.leftFlexContainer}>
            {data.slice(0, 3).map((item, index) => (
              <TouchableHighlight
                key={index}
                style={[styles.flexBlock, { height: leftHeights[index] }]}
                underlayColor="#948870"
                onPress={() => {}}
              >
                <View style={[styles.flexBlock, { borderWidth: 0, borderColor: "transparent" }]}>
                  <Image
                    source={item.imagePath} // lub item.image
                    style={styles.backgroundImage}
                    resizeMode="cover"
                  />
                  <View style={styles.overlay} />
                  <Text style={styles.overlayText}>{item.title}</Text>
                  <Image
                    source={require('../../assets/arrowRight.png')} // lub item.image
                    style={{ width: 20, height: 20, position: 'absolute', right: 10, bottom: 10, zIndex: 2, tintColor: 'white' }}
                    resizeMode="cover"></Image>
                </View>
              </TouchableHighlight>
            ))}
          </View>

          <View style={styles.rightFlexContainer}>
            {data.slice(3, 6).map((item, index) => (
              <TouchableHighlight
                key={index + 3}
                style={[styles.flexBlock, { height: rightHeights[index] }]}
                underlayColor="#948870"
                onPress={() => {}}
              >
                <View style={[styles.flexBlock, {borderWidth: 0, borderColor: 'transparent'}]}>
                  <Image
                    source={item.imagePath} // lub item.image
                    style={styles.backgroundImage}
                    resizeMode="cover"
                  />
                  <View style={styles.overlay} />
                  <Text style={styles.overlayText}>{item.title}</Text>
                  <Image
                    source={require('../../assets/arrowRight.png')} // lub item.image
                    style={{ width: 20, height: 20, position: 'absolute', right: 10, bottom: 10, zIndex: 2, tintColor: 'white' }}
                    resizeMode="cover"></Image>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </View>


          {/* {data.map((item, index) => (
            <TouchableHighlight key={index+1} style={styles.block} underlayColor="#948870" onPress={() => {}}>
              <View style={styles.buttonView}>
                <Ionicons name={item.iconName} size={Math.round(screenHeight / 20)} color="gray" />
                <Text style={styles.blockText}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          ))} */}
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
    padding: 10,
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    // alignContent: 'center',
    // rowGap: screenWidth * 0.1,
    // columnGap: screenWidth * 0.1,
    backgroundColor: '#1c1c1c',
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
leftFlexContainer: {
  width: '50%',
  height: '100%',
  backgroundColor: '#1c1c1c',
  padding: 10,
  paddingRight: 5,
  flexDirection: 'column',
  justifyContent: 'space-between',
},
rightFlexContainer: {
  width: '50%',
  height: '100%',
  backgroundColor: '#1c1c1c',
  padding: 10,
  paddingLeft: 5,
  flexDirection: 'column',
  justifyContent: 'space-between',
},
flexBlock: {
  width: '100%',
  backgroundColor: '#cbbb9c',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'white',
  borderWidth: 2,
},
backgroundImage: {
  width: '100%',
  height: '100%',
  borderRadius: 10,
  zIndex: 0,
},

overlay: {
  position: 'absolute',
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
  borderRadius: 10,
  zIndex: 1,},

overlayText: {
  position: 'absolute',
  bottom: 10,
  left: 10,
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  zIndex: 2,
},

});

export default MoreScreen;
