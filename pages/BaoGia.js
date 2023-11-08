import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import axios from 'axios';

export default function BaoGia({ navigation }) {
  const [isRentalPricesVisible, setIsRentalPricesVisible] = useState(false);
  const [searchSeats, setSearchSeats] = useState('');
  const [rentalPrices, setRentalPrices] = useState([]);
  const [ngayThue, setNgayThue] = useState(0);
  const [LoaiXe,setloaiXe]=useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api-thue-xe-5fum.vercel.app/BangGia");
      const res=await axios.get("https://api-thue-xe-5fum.vercel.app/LoaiXe")
      setRentalPrices(response.data);
      setloaiXe(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const toggleRentalPrices = () => {
    setIsRentalPricesVisible(!isRentalPricesVisible);
  }
  const getAllRentalPrices=()=>{
    setSelectedValue(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
      <Dropdown 
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={LoaiXe.map((item,index)=>({value:item,label:item}))}
      placeholder="Chọn loại xe"
      labelField="label"
      valueField="value"
      value={selectedValue}
      onChange={item=>{setSelectedValue(item.value)}}/>
      <TouchableOpacity onPress={toggleRentalPrices} style={styles.priceToggle}><Text>Xem</Text></TouchableOpacity>
      </View>
      <TouchableOpacity title='Xem danh sách bảng giá' onPress={getAllRentalPrices}><Text>Xem tất cả giá thuê</Text></TouchableOpacity>
      <View style={styles.rentalList}>
        {isRentalPricesVisible && (
          <ScrollView>
            {rentalPrices.map((item, index) => {
              if (selectedValue !=null) {
                if (item._id.LoaiXe==selectedValue) {
                  return (
                    <View key={index} style={styles.rentalItem}>
                      <Text style={styles.rentalItemTitle}>{item._id.HangXe}</Text>
                      <Text>Giá thuê: {item._id.GiaThue + ngayThue}</Text>
                      <Text>Số chỗ ngồi: {item._id.LoaiXe}</Text>
                    </View>
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <View key={index} style={styles.rentalItem}>
                    <Text style={styles.rentalItemTitle}>{item._id.HangXe}</Text>
                    <Text>Giá thuê: {item._id.GiaThue + ngayThue}</Text>
                    <Text>Số chỗ ngồi: {item._id.LoaiXe}</Text>
                  </View>
                );
              }
            })}
          </ScrollView>
        )}
      </View>
<StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginBottom:20,
    height: 50,
    borderColor:'gray',
    borderWidth: 1,
    width:'85%',
    borderRadius:5,
    textAlign:'center'
  },
  priceToggle:{
    height: 50,
    width:'15%',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:10
  },
  sortContainer:{
    width:'100%',
    display:'flex',
    flexDirection:'row',    
  },
  placeholderStyle: {
    marginLeft:10,
  },
  selectedTextStyle:{
    marginLeft:10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    marginTop: 13,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  rentalList: {
    width: '100%',
    height: '80%',
    marginTop:20,
    borderColor:'gray',
    borderWidth:1,
    padding:20,
    borderRadius:8
  },
  rentalItem: {
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,

  },
  rentalItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});