import {SafeAreaView, View, Text, Platform} from 'react-native'
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

const SettingsPanel = () =>
{

    useEffect(() => {
        if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('hidden');
        }

    }, []);
    return(
        <SafeAreaView style={{height: "100%", backgroundColor: "white"}}>
            <Text>settings</Text>
        </SafeAreaView>
    )
}

export default SettingsPanel;