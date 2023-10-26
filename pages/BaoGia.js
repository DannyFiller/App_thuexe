import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import {useClerk} from '@clerk/clerk-expo';

const BaoGia = ({navigation}) => {
  const [isRentalPricesVisible, setIsRentalPricesVisible] = useState(false);
  const [searchDuration, setSearchDuration] = useState('');
  const [searchSeats, setSearchSeats] = useState('');

  const clerk = useClerk();
  
  const rentalPrices = [
    {
      vehicleType: 'Xe A',
      modelYear: '2022',
      accountName: 'John Doe',
      carNumber: '123456',
      startDate: '21h, Thứ 3, 2023-10-22',
      endDate: '21h, Thứ 4, 2023-10-25',
      contractInfo: {
        carMake: 'Toyota',
        carLicensePlate: 'XYZ 123',
        carStatus: 'Chưa trả',
        dailyRentalPrice: '500.000đ/ 1 ngày',
        rentalDate: '2023-10-22',
      },
    },
    {
      vehicleType: 'Xe A',
      modelYear: '2022',
      accountName: 'John Doe',
      carNumber: '123456',
      startDate: '21h, Thứ 3, 2023-10-22',
      endDate: '21h, Thứ 4, 2023-10-25',
      contractInfo: {
        carMake: 'Toyota',
        carLicensePlate: 'XYZ 123',
        carStatus: 'Chưa trả',
        dailyRentalPrice: '500.000đ/ 1 ngày',
        rentalDate: '2023-10-22',
      },
    },
    {
      vehicleType: 'Xe A',
      modelYear: '2022',
      accountName: 'John Doe',
      carNumber: '123456',
      startDate: '21h, Thứ 3, 2023-10-22',
      endDate: '21h, Thứ 4, 2023-10-25',
      contractInfo: {
        carMake: 'Toyota',
        carLicensePlate: 'XYZ 123',
        carStatus: 'Chưa trả',
        dailyRentalPrice: '500.000đ/ 1 ngày',
        rentalDate: '2023-10-22',
      },
    },
    {
      vehicleType: 'Xe A',
      modelYear: '2022',
      accountName: 'John Doe',
      carNumber: '123456',
      startDate: '21h, Thứ 3, 2023-10-22',
      endDate: '21h, Thứ 4, 2023-10-25',
      contractInfo: {
        carMake: 'Toyota',
        carLicensePlate: 'XYZ 123',
        carStatus: 'Chưa trả',
        dailyRentalPrice: '500.000đ/ 1 ngày',
        rentalDate: '2023-10-22',
      },
    },
    {
      vehicleType: 'Xe A',
      modelYear: '2022',
      accountName: 'John Doe',
      carNumber: '123456',
      startDate: '21h, Thứ 3, 2023-10-22',
      endDate: '21h, Thứ 4, 2023-10-25',
      contractInfo: {
        carMake: 'Toyota',
        carLicensePlate: 'XYZ 123',
        carStatus: 'Chưa trả',
        dailyRentalPrice: '500.000đ/ 1 ngày',
        rentalDate: '2023-10-22',
      },
    },
    // Thêm các mục giá thuê xe khác tại đây
  ];

  const toggleRentalPrices = () => {
    setIsRentalPricesVisible(!isRentalPricesVisible);
  };

  const handleHomeButton = () => {
    // Xử lý khi nút "Home" được nhấn
  };

  const handleExitButton = () => {
    // Xử lý khi nút "Exit" được nhấn
    clerk.signOut();
    navigation.navigate('Đăng Nhập');
  };

  const handleSearchButton = () => {
    // Thực hiện tìm kiếm dựa trên giá trị của searchDuration và searchSeats
    // Tải dữ liệu hoặc thực hiện xử lý tìm kiếm ở đây
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Home" onPress={handleHomeButton} style={styles.homeButton} />
        <Text style={styles.title}>Sổ xe</Text>
        <Button title="Exit" onPress={handleExitButton} style={styles.exitButton} />
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
      <Button title="Tìm kiếm" onPress={handleSearchButton} />
      <Button title="Hiện danh sách thuê" onPress={toggleRentalPrices} />
      <View style={styles.rentalList}>
        {isRentalPricesVisible && (
          <ScrollView>
            {rentalPrices.map((item, index) => (
              <View key={index} style={styles.rentalItemContainer}>
                <View style={styles.rentalItem}>
                  <Text style={styles.rentalItemTitle}>{item.vehicleType}</Text>
                  <View style={styles.accountInfoContainer}>
                    <Text style={styles.boldText}>Tài khoản: {item.accountName}</Text>
                    <Text style={styles.boldText}>Mã số xe: {item.carNumber}</Text>
                  </View>
                  <View style={styles.rentalPeriodContainer}>
                    <Text style={styles.contractInfoTitle}>Thời gian thuê:</Text>
                    <Text style={styles.rentalTime}>Ngày nhận: {item.startDate}</Text>
                    <Text style={styles.rentalTime}>Ngày trả: {item.endDate}</Text>
                  </View>
                  <View style={styles.contractInfoContainer}>
                    <Text style={styles.contractInfoTitle}>Hợp đồng:</Text>
                    <Text>Tên hãng xe: {item.contractInfo.carMake}</Text>
                    <Text>Biển số xe: {item.contractInfo.carLicensePlate}</Text>
                    <Text style={styles.statusText}>Tình trạng: {item.contractInfo.carStatus}</Text>
                    <Text>Giá thuê trong 1 ngày: {item.contractInfo.dailyRentalPrice}</Text>
                    <Text>Ngày thuê: {item.contractInfo.rentalDate}</Text>
                  </View>

                </View>
              </View>
            ))}
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

export default BaoGia;