import {SafeAreaView, Text} from 'react-native'
import { StatusBar } from 'react-native';

<StatusBar
  backgroundColor="#1c1c1c"
  barStyle="light-content" // lub "dark-content"
  translucent={false}
/>


const SettingsPanel = () =>
{
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "#1c1c1c"}}>
            <StatusBar
                backgroundColor="#1c1c1c"
                hidden={true}
                barStyle="dark-content" // lub "dark-content"
                translucent={false}
            />
            <Text>settings</Text>
        </SafeAreaView>
    )
}

export default SettingsPanel;