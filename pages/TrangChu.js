
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import DangNhap from './DangNhap';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
      <View>
        <Text>Home Screen</Text>
        <TouchableOpacity 
          style={styles.btn}
          title="Go to Setting Screen"
          onPress={() => navigation.navigate('DangNhap')}>
            <Text>Login page</Text>
          </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
    btn:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
      },
});

export default HomeScreen;