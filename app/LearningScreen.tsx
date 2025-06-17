import { View, Text, StyleSheet } from 'react-native';

const LearningScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1c1c1c' }}>
      <Text style={styles.text}>Learn screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  }
})

export default LearningScreen;