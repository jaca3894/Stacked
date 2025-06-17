import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableHighlight, Image, Dimensions, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const width = Dimensions.get('window').width;
  // czas co ile ma sie zmieniac karta
  const autoRotateInterval = 5500;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<{ title: string }> | null>(null);


  const data = [
    { title: 'Strona 1' },
    { title: 'Strona 2' },
    { title: 'Strona 3' }
  ];

  const autoRotate = () => {
    const nextIndex = (currentIndex + 1) % data.length;
    const nextItemOffset = (width) * nextIndex;
    flatListRef.current?.scrollToOffset({ animated: true, offset: nextItemOffset });
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(autoRotate, autoRotateInterval);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItems = ({ item }: { item: { title: string } }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <TouchableHighlight style={styles.cardButton} onPress={() => console.log(`Kliknięto: ${item.title}`)}>
        <Text style={styles.cardButtonText}>Więcej</Text>
      </TouchableHighlight>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
      </View>
      <View style={styles.main}>
        <FlatList style={ styles.flatList}
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={width}
          decelerationRate="fast"
          onScroll={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(contentOffsetX / width);
            setCurrentIndex(index);
          }}
          scrollEventThrottle={16}
        />
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === currentIndex ? 'green' : '#ccc' }
              ]}
            />
          ))}
        </View>
        <TouchableHighlight style={styles.proceedButton} onPress={() => navigation.navigate('Main tabs')}>
          <Text style={{ color: 'white', textAlign: 'center', lineHeight: 50 }}>Przejdź dalej</Text>
        </TouchableHighlight>
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
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    height: '25%',
  },
  main: {
    marginVertical: 10,
    height: '55%',
    backgroundColor: '#1c1c1c',
  },
  flatList: {
    height: "90%",
    marginBottom: 10,
  },
  footer: {
    height: '20%',
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 16,
  },
  carouselItem: {
    width: Dimensions.get('window').width * 0.75,
    height: "100%",
    marginHorizontal: Dimensions.get('window').width * 0.125,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardButton: {
    marginTop: 10,
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pagination: {
    alignSelf: 'center',
    flexDirection: 'row', 
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  proceedButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: "10%",
    width: "35%",
    marginTop: "10%",
    borderRadius: 5,
  },
});

export default WelcomeScreen;
