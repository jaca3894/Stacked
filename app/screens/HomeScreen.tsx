import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import LoadingPanel from '../panels/LoadingPanel'; // Zakładamy, że masz ten komponent
import * as NavigationBar from 'expo-navigation-bar';

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
        <Text style={styles.text}>Home screen</Text>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
