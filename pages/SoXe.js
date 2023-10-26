import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import axios from 'axios';

export default function SoXe({navigation}) {
  const [isRentalPricesVisible, setIsRentalPricesVisible] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [searchDays, setSearchDays] = useState('');
  const [soXe,setSoXe]=useState([]);


  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData=async()=>{
    try{
      const res=await axios.get("https://api-thue-xe.vercel.app/SoXe");
      setSoXe(res.data);
    }catch(error){
      console.error(error);
    }
  };

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
    // Thực hiện tìm kiếm dựa trên giá trị của searchDuration và searchSeats
    // Tải dữ liệu hoặc thực hiện xử lý tìm kiếm ở đây
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Home" onPress={handleHomeButton} />
        <Text style={styles.title}>Sổ xe</Text>
        <Button title="Exit" onPress={handleExitButton}  />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên khách hàng"
          value={searchCustomer}
          onChangeText={(text) => setSearchCustomer(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ngày kí"
          value={searchDays}
          onChangeText={(text) => setSearchDays(text)}
        />
      </View>
      <Button title="Tìm kiếm" onPress={handleSearchButton} />
      <Button title="Hiện danh sách thuê" onPress={toggleRentalPrices} />
      <View style={styles.rentalList}>
        {isRentalPricesVisible && (
          <ScrollView>
            {soXe.map((item, index) => {
              if(searchCustomer.length>0){
                const khachHangName=item.KhachHang.Ten.toString().toLowerCase();
                const input=searchCustomer.toString().toLowerCase();
                if(khachHangName.includes(input)){
                  return(
                    <View key={index} style={styles.rentalItemContainer}>
                    <View style={styles.rentalItem}>
                      <Text style={styles.rentalItemTitle}>{item._id}</Text>
                      <View style={styles.accountInfoContainer}>
                        <Text style={styles.boldText}>Tài khoản: {item.KhachHang.TenTaiKhoan}</Text>
                        <Text style={styles.boldText}>Mã số xe: {item.Xe._id}</Text>
                      </View>
                      <View style={styles.rentalPeriodContainer}>
                    <Text style={styles.contractInfoTitle}>Thời gian thuê:</Text>
                        <Text >Ngày nhận: {item.NgayThueXe}</Text>
                        <Text >Ngày trả: {item.NgayTraXe}</Text>
                      </View>
                      <View style={styles.contractInfoContainer}>
                        <Text style={styles.contractInfoTitle}>Hợp đồng:</Text>
                        <Text>Tên hãng xe: {item.Xe.TenXe}</Text>
                        <Text>Biển số xe: {item.Xe.BienSoXe}</Text>
                        <Text style={styles.statusText}>Tình trạng: {item.TinhTrang}</Text>
                        <Text>Giá thuê trong 1 ngày: {item.GiaThue}</Text>
                        <Text>Ngày thuê: {item.NgayKiHopDong}</Text>
                      </View>
    
                    </View>
                  </View>
                  );
                }else{
                  return null;
                }
                
              }else if(searchDays.length>0&&item.NgayKiHopDong!=null){
                if(item.NgayKiHopDong.includes(searchDays)){
                  return(
                    <View key={index} style={styles.rentalItemContainer}>
                    <View style={styles.rentalItem}>
                      <Text style={styles.rentalItemTitle}>{item._id}</Text>
                      <View style={styles.accountInfoContainer}>
                        <Text style={styles.boldText}>Tài khoản: {item.KhachHang.TenTaiKhoan}</Text>
                        <Text style={styles.boldText}>Mã số xe: {item.Xe._id}</Text>
                      </View>
                      <View style={styles.rentalPeriodContainer}>
                    <Text style={styles.contractInfoTitle}>Thời gian thuê:</Text>
                        <Text >Ngày nhận: {item.NgayThueXe}</Text>
                        <Text >Ngày trả: {item.NgayTraXe}</Text>
                      </View>
                      <View style={styles.contractInfoContainer}>
                        <Text style={styles.contractInfoTitle}>Hợp đồng:</Text>
                        <Text>Tên hãng xe: {item.Xe.TenXe}</Text>
                        <Text>Biển số xe: {item.Xe.BienSoXe}</Text>
                        <Text style={styles.statusText}>Tình trạng: {item.TinhTrang}</Text>
                        <Text>Giá thuê trong 12 ngày: {item.GiaThue}</Text>
                        <Text>Ngày thuê: {item.NgayKiHopDong}</Text>
                      </View>
    
                    </View>
                  </View>
                  );
                }else{
                  return null;
                }
              }
              else{
                return(
                  <View key={index} style={styles.rentalItemContainer}>
                <View style={styles.rentalItem}>
                  <Text style={styles.rentalItemTitle}>{item._id}</Text>
                  <View style={styles.accountInfoContainer}>
                    <Text style={styles.boldText}>Tài khoản: {item.KhachHang.TenTaiKhoan}</Text>
                    <Text style={styles.boldText}>Mã số xe: {item.Xe._id}</Text>
                  </View>
                  <View style={styles.rentalPeriodContainer}>
                <Text style={styles.contractInfoTitle}>Thời gian thuê:</Text>
                    <Text >Ngày nhận: {item.NgayThueXe}</Text>
                    <Text >Ngày trả: {item.NgayTraXe}</Text>
                  </View>
                  <View style={styles.contractInfoContainer}>
                    <Text style={styles.contractInfoTitle}>Hợp đồng:</Text>
                    <Text>Tên hãng xe: {item.Xe.TenXe}</Text>
                    <Text>Biển số xe: {item.Xe.BienSoXe}</Text>
                    <Text style={styles.statusText}>Tình trạng: {item.TinhTrang}</Text>
                    <Text>Giá thuê trong 1 ngày: {item.GiaThue}</Text>
                    <Text>Ngày thuê: {item.NgayKiHopDong}</Text>
                  </View>

                </View>
              </View>
                )
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
  container: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
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
    borderRadius: 20,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  rentalList: {
    width: '100%',
    borderRadius: 20,
  },
  rentalItemContainer: {
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  rentalItem: {
    // Styles for individual rental item go here
  },
  accountInfoContainer: {
    // Styles for account information container go here
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  rentalPeriodContainer: {
    // Styles for rental period container go here
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  rentalPeriod: {
    // Styles for rental period information go here
  },
  contractInfoContainer: {
    // Styles for contract information container go here
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  contractInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 20,
  },
  rentalItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 20,
  },
  boldText: {
    fontWeight: 'bold',
    borderRadius: 20,
  },
  homeButton: {
backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 20,
  },
  exitButton: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
  },
  statusText: {
    fontWeight: 'bold',
    color: 'red', // Chọn màu bạn muốn
  },
});