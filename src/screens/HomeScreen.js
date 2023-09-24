import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

export default function HomeScreen () {
  return (
    <View style={style.view}>
      <Text>Welcome Home!!</Text>
    </View>
  )
}

const style = StyleSheet.create({
    view: {
    }
  });
