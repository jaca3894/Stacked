import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableHighlight, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const width = Dimensions.get('window').width;
  // czas co ile ma sie zmieniac karta
  const autoRotateInterval = 5500;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<{ title: string, description: string, photoPath: string }> | null>(null);


  const data = [
    { title: 'Host games', description: "You've got only deck of cards? Simulate game's board by playing with virtual money.", photoPath: require("../assets/logo.png") },
    { title: 'Learn basics and more', description: "We've got tutorials for everything: from game rules to card flourishes.", photoPath: require("../assets/logo.png") },
    { title: 'Check your poker hand', description: "Not sure if your cards line up into something? Use our tool to find out.", photoPath: require("../assets/logo.png") }
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

  const renderItems = ({ item }: { item: { title: string, description: string, photoPath: any } }) => (
    <View style={styles.carouselItem}>
      <Image source={item.photoPath} style={styles.cardImage}/>
      <Text style={styles.cardButtonText}><Text style={styles.cardTitle}>{item.title}</Text>{'\n\n'}{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
              key={index+1}
              style={[
                styles.dot,
                { backgroundColor: index === currentIndex ? 'green' : '#ccc' }
              ]}
            />
          ))}
        </View>
        <TouchableHighlight underlayColor={"#948870"} style={styles.proceedButton} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={{ color: 'black', fontWeight: "bold", textAlign: 'center', lineHeight: 50 }}>Continue</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>2025 Stacked.</Text>
      </View>
    </View>
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
    height: '60%',
    backgroundColor: '#1c1c1c',
  },
  flatList: {
    height: "90%",
    marginBottom: 10,
  },
  footer: {
    height: '15%',
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
    backgroundColor: '#1c1c1c',
    borderColor: '#cbbb9c',
    borderWidth: 2,
    borderRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: "100%",
    opacity: 0.1,
    backgroundColor: 'black',
    borderRadius: 10, 
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  cardButton: {
    marginTop: 10,
    backgroundColor: '#cbbb9c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  cardTitle: {
    paddingBottom: 0,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cbbb9c',
  },
  cardButtonText: {
    position: 'absolute',
    bottom: "0%",
    color: 'white',
    padding: 20,
    textAlign: 'left',
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
    backgroundColor: '#cbbb9c',
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
