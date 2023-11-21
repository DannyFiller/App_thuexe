import { useRoute } from "@react-navigation/native";
import React, { useState,useEffect } from 'react';
import { View,Text,StyleSheet,Image, TouchableOpacity, Alert,ActivityIndicator } from "react-native";
import BaoGia from './BaoGia';
import moment from 'moment';
import axios from "axios";


const ThongTinSoXe=({route,navigation})=>{
    
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

    const item=[route.params.item];
    //trừ 2 ngày 
    // chưa xài dc 
    const [loading,setLoading]=useState(false);
    const date1 = moment('2021-09-01', 'YYYY-MM-DD');
    const date2 = moment('2021-09-10', 'YYYY-MM-DD');
    const differenceInDays = date2.diff(date1, 'days');
    console.log(differenceInDays);
    const dataXe={
        TinhTrang: 'Còn trống'
    }

    const XacNhanTraXe=()=>{
        setLoading(true);
        axios.put('https://api-thue-xe-5fum.vercel.app/Xe/'+item[0].IDXe._id, dataXe)
        .then(response => {
            // Xử lý kết quả từ API
            console.log(response.data);
            setLoading(false);
            Alert.alert("Trả xe thành công");
            navigation.goBack();
          })
          .catch(error => {
            // Xử lý lỗi nếu có
            console.error(error);
          });
    }
    return(
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.carInfoContainer}>
                    
                    <Image style={styles.anh} source={{uri:item[0].IDXe.HinhAnh}}></Image>
                    <View style={styles.viewInfoXe}>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Biển Số Xe : </Text>
                            <Text>{item[0].IDXe.BienSoXe}</Text>
                        </View>
                        
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Tên Xe : </Text>
                            <Text>{item[0].IDXe.TenXe}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Loại Xe : </Text>
                            <Text>{item[0].IDXe.LoaiXe}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Trạng thái : </Text>
                            <Text>{item[0].IDXe.TinhTrang}</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={styles.CustomerInfoContainer}>
                        <View style={styles.titleContain}>
                            <Text style={styles.titleText}> Thông Tin Khách Hàng</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Tên Khách Hàng : </Text>
                            <Text>{item[0].IDKH.TenKH}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Số điện thoại khách hàng: </Text>
                            <Text>{item[0].IDKH.SoDienThoai}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Ngày Thuê : </Text>
                            <Text>{moment(item[0].NgayThueXe).format('DD/MM/yyyy')}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Ngày Trả : </Text>
                            <Text>{moment(item[0].NgayTraXe ).format('DD/MM/yyyy')}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Chi Phí Thuê 1 Ngày : </Text>
                            <Text>{item[0].GiaThue}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Tổng Chi Phí Thuê Xe : </Text>
                            <Text>{differenceInDays}</Text>
                        </View>
                </View>
            </View>
        <View style={{width:"90%",marginRight:35,alignItems:"center"}}>
        </View>
           {loading?(
             <ActivityIndicator />
           ):(
            <TouchableOpacity style={styles.btn} onPress={XacNhanTraXe}>
                <Text style={{color:"white"}}>Xác nhận trả xe</Text>
            </TouchableOpacity> 
           )}
        </View>
        
    )
}
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        width:'100%',
        height:'100%',
        display:"flex",
        flexDirection:'column',
        alignItems:'center',
        marginLeft:20,
        marginTop:-30

    },
    CustomerInfoContainer:{
        borderWidth:1,
        padding:10,
        width:'90%',
        borderRadius:5,
    },
    btn:{
        backgroundColor:'#FF6630',
        padding:10,
        marginTop:30,
        marginRight:30,
        width:150,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
    },
    info:{
        width:'100%',
    },
    carInfoContainer:{
        width:'90%',
        borderWidth:1,
        height:350,
        marginBottom:16,
        borderRadius:5,
    },
    anh:{
        width:'100%',
        height:250,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
    },
    viewInfoXe:{
        padding:16,
    },
    row_thongtin:{
        display:"flex",
        flexDirection:"row"
    },
    label:{
        fontWeight:"bold"
    },
    titleText:{
        fontSize:24,
        fontWeight:"bold",
    },
    titleContain:{
       alignItems:"center",
       marginBottom:8
    }
})

export default ThongTinSoXe;