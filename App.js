import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
			    headerStyle: {
				    backgroundColor: '#38761d'
			    },
          headerTintColor: '#fff'
    	  }} 
        initialRouteName="Kyrsha's App"
      >
        <Stack.Screen name="Kyrsha's App" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
