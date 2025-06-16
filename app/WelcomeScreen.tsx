import { View, Text, TouchableOpacity } from 'react-native';

import type { StackNavigationProp } from '@react-navigation/stack';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('Main tabs')}
        >
        <Text style={{ color: 'white', fontSize: 16 }}>Continue</Text>
        </TouchableOpacity>
    </View>
  );
}

export default WelcomeScreen;