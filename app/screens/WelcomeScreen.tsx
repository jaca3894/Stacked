import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { welcomeCardsData as data } from '../../classes/Database';
import { TouchableHighlight } from 'react-native';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const width = Dimensions.get('window').width;
  const autoRotateInterval = 5500;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const flatListRef = useRef<FlatList<{ title: string, description: string, photoPath: string }> | null>(null);

  const autoRotate = () => {
    setIsRotating(true);
    const nextIndex = (currentIndex + 1) % data.length;
    const nextItemOffset = width * nextIndex;
    flatListRef.current?.scrollToOffset({ animated: true, offset: nextItemOffset });
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(autoRotate, autoRotateInterval);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItems = ({ item }: { item: { title: string, description: string, photoPath: any } }) => (
    <View style={styles.carouselItem}>
      <Image source={item.photoPath} style={styles.cardImage} />
      <View style={{ position: 'absolute', bottom: "15%", width: '100%', padding: 20 }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
        <LinearGradient
          colors={['transparent', '#1c1c1c']}
          style={styles.gradientOverlay}
        >
          
        </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        ref={flatListRef}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / width);
          if (isRotating && index !== currentIndex) return;
          if (index === currentIndex) setIsRotating(false);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />
      <View style={styles.bottomView}>
        <TouchableHighlight
          onPress={() => {
            if (currentIndex < data.length - 1) {
              const nextIndex = currentIndex + 1;
              const nextOffset = width * nextIndex;
              flatListRef.current?.scrollToOffset({ animated: true, offset: nextOffset });
              setCurrentIndex(nextIndex);
            } else {
              navigation.navigate('MainTabs');
            }
          }}
          style={{
            position: 'absolute',
            bottom: 30,
            backgroundColor: '#cbbb9c',
            width: '30%',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center', // to centrowanie horyzontalne
          }}
        >
          <View>
            <Text style={{ color: '#1c1c1c', fontSize: 18, textAlign: 'center' }}>
              {currentIndex === data.length - 1 ? 'Get started' : 'Continue'}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  flatList: {
    height: '100%',
    width: '100%',
    marginBottom: 10,
  },
  carouselItem: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: '#1c1c1c',
    // borderColor: '#cbbb9c',
    // borderWidth: 2,
    // borderRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#cbbb9c',
    textAlign: 'center',
    zIndex: 1,
  },
  cardDescription: {
    zIndex: 1,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  pagination: {
    position: 'absolute',
    bottom: "10%",
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
  bottomView: {
    zIndex: 0,
    position: 'absolute',
    bottom: "5%",
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "transparent",
  },
});

export default WelcomeScreen;
