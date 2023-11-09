import { useRoute ,useState} from "@react-navigation/native";
import React from "react";
import { View,Text,StyleSheet,Image, TouchableOpacity } from "react-native";
import BaoGia from './BaoGia';
import moment from 'moment';

const ThongTinXe=({route,navigation})=>{

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
   
    const XacNhanDatXe=()=>{   
    }


    //trừ 2 ngày 
    // chưa xài dc 
    const date1 = moment('2021-09-01', 'YYYY-MM-DD');
    const date2 = moment('2021-09-10', 'YYYY-MM-DD');
    const differenceInDays = date2.diff(date1, 'days');
    console.log(differenceInDays);
    
    return(
        <View style={styles.container}>{item.map((i,index)=>(
            <View key={index} style={styles.info}>
                <View style={styles.carInfoContainer}>
                    
                    <Image style={styles.anh} source={{uri:i.HinhAnh}}></Image>
                    <View style={styles.viewInfoXe}>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Biển Số Xe : </Text>
                            <Text>{i.BienSoXe}</Text>
                        </View>
                        
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Tên Xe : </Text>
                            <Text>{i.TenXe}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Loại Xe : </Text>
                            <Text>{i.LoaiXe}</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={styles.CustomerInfoContainer}>
                        <View style={styles.titleContain}>
                            <Text style={styles.titleText}> Thông Tin Khách Hàng</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Tên Khách Hàng : </Text>
                            <Text>{i.TenTaiKhoan}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Ngày Thuê : </Text>
                            <Text>{i.NgayThueXe}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Ngày Trả : </Text>
                            <Text>{i.NgayTraXe}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Chi Phí Thuê 1 Ngày : </Text>
                            <Text>{i.GiaThue}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Tổng Chi Phí Thuê Xe : </Text>
                            <Text>{differenceInDays}</Text>
                        </View>
                </View>
            </View>
        ))}
        <View style={{width:"90%",marginRight:35,alignItems:"center"}}>
            <TouchableOpacity style={styles.btn} onPress={XacNhanDatXe()}>
                <Text style={{color:"white"}}>Xác Nhận</Text>
            </TouchableOpacity>
        </View>
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
        marginTop:10,
        width:100,
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

export default ThongTinXe;