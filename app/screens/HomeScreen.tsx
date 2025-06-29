import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image, SafeAreaView, DimensionValue } from 'react-native';
import LoadingPanel from '../panels/LoadingPanel'; // Zakładamy, że masz ten komponent
import * as NavigationBar from 'expo-navigation-bar';

const parsePercent = (value: string) => parseFloat(value.replace('%', ''));

const blockOneOffset = "30%"; // ustawia wysokosc naglowka i offset contentu
const blockTwoOffset = "50%"; // ustawia wysokosc contentu
const blockThreeOffset = `${parsePercent(blockOneOffset) + parsePercent(blockTwoOffset)}%` as DimensionValue;
const blockThreeHeight = "20%"; // wysokosc stopki 

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const loaderTime = 1000;
  if (Platform.OS === 'android') {
    NavigationBar.setVisibilityAsync('hidden');
  }



  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), loaderTime);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingPanel visible={loading} />}
      <View style={styles.container}>
        <View style={{ position: "absolute", zIndex: -1, top: "0%", backgroundColor: "#cbbb9c", width: "100%", height: blockOneOffset}}></View>
        <View style={{ position: "absolute", zIndex: -1, top: blockOneOffset, backgroundColor: "#1c1c1c", width: "100%", height: blockTwoOffset}}></View>
        <View style={{ position: "absolute", zIndex: -1, top: blockThreeOffset, backgroundColor: "#cbbb9c", width: "100%", height: blockThreeHeight}}></View>
        <SafeAreaView style={styles.header}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
          <Text style={styles.text}>Hello, betatester!</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.content}>
         
        </SafeAreaView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 Stacked.</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:
  {
    zIndex: 2, 
    width: "100%", 
    height: blockOneOffset, 
    position: 'absolute', 
    top: "0%", 
    backgroundColor: "#1c1c1c",
    borderBottomLeftRadius: 50
  },
  content:
  {
    backgroundColor: "#cbbb9c",
    zIndex: 2, 
    width: "100%", 
    height: blockTwoOffset, 
    position: 'absolute', 
    top: blockOneOffset,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50, 
    // borderWidth: 5,
    // borderColor: "red",
  },
  logo:
  {
    marginTop: "10%",
    alignSelf: "center",
    width: "60%",
    height: "60%",
    zIndex: 2,
    resizeMode: "contain"
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    top: blockThreeOffset,
    zIndex: 2,
    // borderTopWidth: 1,
    // borderTopColor: "",
    height: blockThreeHeight,
    width: "100%",
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 50,
  },
  footerText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
