import React, { useState } from "react";
import { ImageBackground, Text, StyleSheet, View, LayoutChangeEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";

type RootStackParamList = {
  PokerGame: { playersCount: number };
};

type PokerGameRouteProp = RouteProp<RootStackParamList, "PokerGame">;

const seatingPlan: Record<number, [number, number, number, number]> = {
  2: [0, 1, 0, 1],
  3: [1, 1, 0, 1],
  4: [0, 2, 0, 2],
  5: [0, 3, 0, 2],
  6: [0, 3, 0, 3],
  7: [0, 4, 0, 3],
  8: [0, 4, 0, 4],
  9: [1, 4, 0, 4],
  10: [1, 4, 1, 4],
  11: [2, 4, 1, 4],
  12: [2, 4, 2, 4],
};

const PokerGame = () => {
  const route = useRoute<PokerGameRouteProp>();
  const { playersCount } = route.params;
  const [top, right, bottom, left] = seatingPlan[playersCount] ?? [0, 0, 0, 0];

  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/pokerTable.png')}
        style={styles.background}
        resizeMode="contain"
        onLayout={handleLayout}
      >
        {layout.width > 0 && layout.height > 0 && (
          <View style={[styles.content, { width: layout.width, height: layout.height }]}>
            {/* TOP */}
            <View style={[styles.row, { top: 0, width: layout.width }]}>
              {Array.from({ length: top }).map((_, i) => (
                <Text style={styles.text} key={`T${i}`}>T: {i + 1}</Text>
              ))}
            </View>

            {/* BOTTOM */}
            <View style={[styles.row, { bottom: 0, width: layout.width }]}>
              {Array.from({ length: bottom }).map((_, i) => (
                <Text style={styles.text} key={`B${i}`}>B: {i + 1}</Text>
              ))}
            </View>

            {/* LEFT */}
            <View style={[styles.column, { left: 0, height: layout.height }]}>
              {Array.from({ length: left }).map((_, i) => (
                <Text style={styles.text} key={`L${i}`}>L: {i + 1}</Text>
              ))}
            </View>

            {/* RIGHT */}
            <View style={[styles.column, { right: 0, height: layout.height }]}>
              {Array.from({ length: right }).map((_, i) => (
                <Text style={styles.text} key={`R${i}`}>R: {i + 1}</Text>
              ))}
            </View>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 4,
    borderRadius: 6,
    margin: 4,
  },
  row: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 80,
  },
});

export default PokerGame;
