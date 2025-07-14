import React, { useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { morePanelsData as data } from "../../../classes/Database";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Math.round(Dimensions.get("window").width);

const MoreScreen = () => {
  const navigation = useNavigation();
  const animRefs = useRef<any>([]);
  const AnimatableView = Animatable.createAnimatableComponent(View);
  const [refreshKey] = useState(Date.now());
  const hasAnimated = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      if (hasAnimated.current) return;

      data.forEach((_, index) => {
        const ref = animRefs.current[index];
        if (ref) {
          ref.setNativeProps({ style: { opacity: 0 } });
          setTimeout(() => {
            ref.animate("fadeIn", 1000);
          }, index * 200);
        }
      });

      hasAnimated.current = true;
    }, [])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/icons/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <ScrollView style={styles.flexContainer}>
          {data.map((item, index) => (
            <AnimatableView
              key={`${refreshKey}-${index}`}
              ref={(ref) => {
                if (ref) animRefs.current[index] = ref;
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                opacity: hasAnimated.current ? 1 : 0,
              }}
            >
              <TouchableOpacity
                style={styles.card}
                onPress={() => (navigation as any).navigate(item.panel)}
                activeOpacity={0.7}
              >
                <Icon
                  name={item.iconName}
                  size={36}
                  color="#cbbb9c"
                  style={styles.cardIcon}
                />
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
                <Icon name="chevron-forward" size={20} color="#cbbb9c" />
              </TouchableOpacity>
            </AnimatableView>
          ))}
          <View style={styles.footer}>
            <Text style={styles.footerText}>2025 Stacked.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  header: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
  },
  flexContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: "#cccccc",
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "gray",
    fontSize: 16,
  },
});

export default MoreScreen;
