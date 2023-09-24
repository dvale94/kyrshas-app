import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <Icon 
              name="menu" 
              type="feather" 
              color="#fff"
              style={style.headerIcon}
            />
          ),
			    headerStyle: {
				    backgroundColor: '#38761d'
			    },
          headerTintColor: '#fff'
    	  }} 
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  headerIcon: {
    marginRight: 10
  }
});
