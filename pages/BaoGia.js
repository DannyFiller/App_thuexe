import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import {useClerk} from '@clerk/clerk-expo';

import axios from 'axios';

export default function BaoGia({navigation}) {
  const [isRentalPricesVisible, setIsRentalPricesVisible] = useState(false);
  const [searchDuration, setSearchDuration] = useState('');
  const [searchSeats, setSearchSeats] = useState('');
  const [rentalPrices, setRentalPrices] = useState([]);
  const [ngayThue, setNgayThue] = useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#f4511e', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
    });
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api-thue-xe-v2.vercel.app/BangGia");
      setRentalPrices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(parseInt(value));
  }
  

  const toggleRentalPrices = () => {
    setIsRentalPricesVisible(!isRentalPricesVisible);
  };

  const handleHomeButton = () => {
    // Xử lý khi nút "Home" được nhấn
  };

  const handleExitButton = () => {
    // Xử lý khi nút "Exit" được nhấn
  };

  const handleSearchButton = () => {
    if (searchDuration.length > 0 && isNumeric(searchDuration) && parseInt(searchDuration)>=0 && parseInt(searchDuration)<10) {
      const ngayThueValue = (parseInt(searchDuration)-1) * 200000;
      setNgayThue(ngayThueValue);
    } else {
      setNgayThue(0);
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Home" onPress={handleHomeButton}/>
        <Text style={styles.title}>Báo giá thuê xe</Text>
        <Button title="Exit" onPress={handleExitButton} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Số ngày thuê"
          value={searchDuration}
          onChangeText={(text) => setSearchDuration(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Số chỗ ngồi"
          value={searchSeats}
          onChangeText={(text) => setSearchSeats(text)}
        />
      </View>
      <Button title="Tìm kiếm"  onPress={handleSearchButton} />
      <Button title="Hiện danh sách giá thuê" onPress={toggleRentalPrices} />
      <View style={styles.rentalList}>
        {isRentalPricesVisible && (
          <ScrollView>
            {rentalPrices.map((item, index) => {
              if(searchSeats.length>0){
                if (item._id.LoaiXe.includes(searchSeats)) {
                  return (
                    <View key={index} style={styles.rentalItem}>
                      <Text style={styles.rentalItemTitle}>{item._id.HangXe}</Text>
                      <Text>Giá thuê: {item._id.GiaThue + ngayThue}</Text>
                      <Text>Số chỗ ngồi: {item._id.LoaiXe}</Text>
                    </View>
                  );
                } else {
                  return null; // Bỏ qua các dòng ko thỏa điều kiện
                }
              }else{
                return(
                  <View key={index} style={styles.rentalItem}>
                      <Text style={styles.rentalItemTitle}>{item._id.HangXe}</Text>
                      <Text>Giá thuê: {item._id.GiaThue + ngayThue}</Text>
                      <Text>Số chỗ ngồi: {item._id.LoaiXe}</Text>
                    </View>
                )
              }
            }
            )}
          </ScrollView>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    marginTop: 13,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  rentalList: {
    width: '100%',
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
  homeButton: {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
  },
  exitButton: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
  },
});