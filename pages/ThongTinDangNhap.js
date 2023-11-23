import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from "axios";
import moment from "moment";
import { Clerk, useUser } from "@clerk/clerk-expo";
import { clerk } from "@clerk/clerk-expo/dist/singleton";

export default ThongTinDangNhap = ({ navigation }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [data, setData] = useState([]);

  const handleSignOut = async () => {
    await clerk.signOut();
    navigation.navigate('Đăng Nhập');
  };

  useEffect(() => {
    fetchData();
  }, [data[0]]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api-thue-xe-5fum.vercel.app/TaiKhoan/GetTKNV/' + user.emailAddresses);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Tên tài khoản: </Text>
            <Text style={styles.text}>{item.TenTaiKhoan}</Text>
            <Text style={styles.title}>Mật khẩu: </Text>
            <Text style={styles.text}>{item.MatKhau}</Text>
            <Text style={styles.title}>Ngày Sinh: </Text>
            <Text style={styles.text}>{moment(item.IDKH.NgaySinh).format("DD/MM/YYYY")}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.btn} onPress={handleSignOut}>
        <Text style={styles.btnText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingVertical: 20,
  },
  flatListContent: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding:10,
  },
  title: {
    fontSize: 18,
    fontWeight:"bold",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#FF6630',
    padding: 15,
    marginTop: 20,
    width: '50%',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
  },
});