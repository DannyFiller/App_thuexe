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
import thongTinDatXe from './pages/thongTinDatXe';
import thongTinSoXe from './pages/ThongTinSoXe';
import LichSuDatXe from './pages/KhachHang/LichSuDatXe';
import ThongTinDangNhap from './pages/ThongTinDangNhap';
import CapNhatThongTinKhachHang from './pages/KhachHang/CapNhatThongTinKhachHang';
import SuaSoDatXe from './pages/SuaSoDatXe';
import TaoKhachHang from './pages/TaoKhachHang';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();


function App () {

  return (
    <ClerkProvider  publishableKey={'pk_test_YWJvdmUtcm9vc3Rlci01MC5jbGVyay5hY2NvdW50cy5kZXYk'}>
        <NavigationContainer> 
            <Stack.Navigator screenOptions={{headerShown:false,headerLeft:()=> null}} initialRouteName='Tab'>
              <Stack.Screen name='Tab' component={Tab}/>
              <Stack.Screen name='Sổ Xe' component={SoXe}/>
              <Stack.Screen name='Sổ Đặt Xe' component={SoDatXe}/>
              <Stack.Screen name="Đăng Nhập" component={DangNhap}/>  
              <Stack.Screen name="Đăng Ký" component={DangKy}/>  
              <Stack.Screen name="Thong tin so dat xe" component={thongTinDatXe} options={{headerShown:true}}/>  
              <Stack.Screen name="Thong tin so xe" component={thongTinSoXe} options={{headerShown:true}}/>  
              <Stack.Screen name="Đặt Xe" component={DatXe} options={{title:'Đặt Xe',headerShown:true}}/>  
              <Stack.Screen name="Thong tin dang nhap" component={ThongTinDangNhap} options={{title:'Thông tin',headerShown:true}}/>  
              <Stack.Screen name="Cap nhat khach hang" component={CapNhatThongTinKhachHang} options={{title:'Thông tin',headerShown:true}}/>  
              <Stack.Screen name="Sửa Sổ Đặt Xe" component={SuaSoDatXe} options={{title:'Sửa Sổ Đặt Xe',headerShown:true}}/> 
              <Stack.Screen name="Tạo Khách Hàng" component={TaoKhachHang} options={{title:'Tạo Khách Hàng',headerShown:true}}/>  
            </Stack.Navigator>
          </NavigationContainer>
    </ClerkProvider >
  );
};


function Tab(){
  return(
   <BottomTab.Navigator screenOptions={{headerShown:true}}>
      <BottomTab.Screen name="Sổ Đặt Xe" component={SoDatXe}/>
      {/* <BottomTab.Screen name="Lịch sử" component={LichSuDatXe}/> */}
      <BottomTab.Screen name="Báo Giá" component={BaoGia}/>
      <BottomTab.Screen name="Sổ xe " component={SoXe}/>
      <BottomTab.Screen name="Thông tin " component={ThongTinDangNhap}/>
   </BottomTab.Navigator>
  )
}

export default App;