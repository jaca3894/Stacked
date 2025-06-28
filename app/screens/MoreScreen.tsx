import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableHighlight,
  Modal,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { morePanelsData as data } from '../../classes/Database';
import type { DimensionValue } from 'react-native';

const leftHeights: DimensionValue[] = ['45%', '20%', '30%'];
const rightHeights: DimensionValue[] = ['20%', '50%', '25%'];

const MoreScreen = () => {
  const [activePanelIndex, setActivePanelIndex] = useState<number | null>(null);

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
                onPress={() => setActivePanelIndex(index)}
              >
                <View style={[styles.flexBlock, { borderWidth: 0 }]}>
                  <Image source={item.imagePath} style={styles.backgroundImage} resizeMode="cover" />
                  <View style={styles.overlay} />
                  <Text style={styles.overlayText}>{item.title}</Text>
                  <Image
                    source={require('../../assets/arrowRight.png')}
                    style={styles.arrowIcon}
                    resizeMode="cover"
                  />
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
                onPress={() => setActivePanelIndex(index + 3)}
              >
                <View style={[styles.flexBlock, { borderWidth: 0 }]}>
                  <Image source={item.imagePath} style={styles.backgroundImage} resizeMode="cover" />
                  <View style={styles.overlay} />
                  <Text style={styles.overlayText}>{item.title}</Text>
                  <Image
                    source={require('../../assets/arrowRight.png')}
                    style={styles.arrowIcon}
                    resizeMode="cover"
                  />
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 Stacked.</Text>
        </View>

        {activePanelIndex !== null && data[activePanelIndex] && (
          <Modal
            // transparent
            animationType="slide"
            visible
            onRequestClose={() => setActivePanelIndex(null)}
            presentationStyle="fullScreen"
          >
          {React.createElement(data[activePanelIndex].panel as React.ComponentType)}
          </Modal>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '70%',
    marginTop: '10%',
  },
  flexContainer: {
    height: '70%',
    flexDirection: 'row',
    padding: 10,
  },
  leftFlexContainer: {
    width: '50%',
    paddingRight: 5,
    justifyContent: 'space-between',
  },
  rightFlexContainer: {
    width: '50%',
    paddingLeft: 5,
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
    zIndex: 1,
  },
  overlayText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 2,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 2,
    tintColor: 'white',
  },
  footer: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'gray',
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 10,
  },
});

export default MoreScreen;
