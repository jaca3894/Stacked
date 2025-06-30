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
        {/* <View style={{ position: "absolute", zIndex: -1, top: "0%", backgroundColor: "#cbbb9c", width: "100%", height: blockOneOffset}}></View>
        <View style={{ position: "absolute", zIndex: -1, top: blockOneOffset, backgroundColor: "#1c1c1c", width: "100%", height: blockTwoOffset}}></View>
        <View style={{ position: "absolute", zIndex: -1, top: blockThreeOffset, backgroundColor: "#cbbb9c", width: "100%", height: blockThreeHeight}}></View> */}
        <SafeAreaView style={styles.header}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
          <Text style={styles.text}>Hello, betatester!</Text>
        </SafeAreaView>
        <View style={styles.content}>
         
        </View>
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
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    height: '30%',
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: '50%',
    backgroundColor: '#1c1c1c',
  },
  footer: {
    height: '20%',
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: '10%',
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default HomeScreen;
