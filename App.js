import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View,Text, FlatList, Button,StyleSheet } from 'react-native';
import { ClerkProvider , SignedIn, SignedOut } from "@clerk/clerk-expo";



//Import các trang
import SoDatXe from './pages/SoDatXe';
import BaoGia from './pages/BaoGia'
import DangNhap from './pages/DangNhap';
import DangKy from './pages/DangKy';
import DatXe from './pages/DatXe';
import SoXe from './pages/SoXe';
import thongTinXe from './pages/thongTinXe';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();


function App () {

  return (
    <ClerkProvider  publishableKey={'pk_test_YWJvdmUtcm9vc3Rlci01MC5jbGVyay5hY2NvdW50cy5kZXYk'}>
        <NavigationContainer> 
            <Stack.Navigator screenOptions={{headerShown:false,headerLeft:()=> null}} initialRouteName='Tab'>
              <Stack.Screen name='Tab' component={Tab}/>
              <Stack.Screen name='Sổ Xe' component={SoXe}/>
              <Stack.Screen name="Đăng Nhập" component={DangNhap}/>  
              <Stack.Screen name="Đăng Ký" component={DangKy}/>  
              <Stack.Screen name="Thong tin xe" component={thongTinXe} options={{headerShown:true}}/>  
              <Stack.Screen name="Đặt Xe" component={DatXe} options={{title:'Đặt Xe',headerShown:true}}/>  
            </Stack.Navigator>
          </NavigationContainer>
    </ClerkProvider >
  );
};


function Tab(){
  return(
   <BottomTab.Navigator screenOptions={{headerShown:true}}>
      <BottomTab.Screen name="Sổ Đặt Xe" component={SoDatXe}/>
      <BottomTab.Screen name="Báo Giá" component={BaoGia}/>
      <BottomTab.Screen name="Sổ xe " component={SoXe}/>
   </BottomTab.Navigator>
  )
}

export default App;