import React, { useEffect, useState } from "react";
import { Image,View, Text, Button,FlatList,StyleSheet, ScrollView, TextInput,TouchableOpacity} from 'react-native';
import axios from "axios";

export default ThongTinDangNhap=({navigation})=>{
    const [data,setData]=useState([]);
    const handleSignOut = async () => {
        await clerk.signOut();
        navigation.navigate('Đăng Nhập');
      };
    React.useLayoutEffect(() => {
    navigation.setOptions({
        title: 'Chi Tiết', 
        headerStyle: {
        backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {fontWeight: 'bold',},
    });
    }, [navigation]);
    useEffect(() => {
        fetchData();
      }, [data[0]]);

      const fetchData =async()=>{
        try {
          const response = await axios.get('https://api-thue-xe-5fum.vercel.app/TaiKhoan/GetTKKH/quan28022003@gmail.com');
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      }

    return(
        <View>
            {data.map((item,index)=>{
                return(
                    <View key={index}>
                        <Text>{item.TenTaiKhoan}</Text>
                        <Text>{item.MatKhau}</Text>
                        <Text>{item.IDKH.TenKH}</Text>
                        <Text>{item.IDKH.SoDienThoai}</Text>
                        <Text>{data.NgaySinh}28/02/2003</Text>
                        <Text>{data.DiaChi}18/3 Hoang Dieu</Text>
                        <Text>{item.IDKH.GioiTinh?(<Text>Nam</Text>):(<Text>Nữ</Text>)}</Text>
                        <Text>{item.IDKH.CCCD}123456</Text>
                    </View>
                )
            })}
            <TouchableOpacity style={styles.btn} >
                <Text style={{color:"white"}}>Dang xuat</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Cap nhat khach hang",{data})}>
                <Text style={{color:"white"}}>Cập nhật thông tin</Text>
            </TouchableOpacity> 
        </View>
        
    )
}
const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#FF6630',
        padding:10,
        marginTop:10,
        width:100,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
    },
})