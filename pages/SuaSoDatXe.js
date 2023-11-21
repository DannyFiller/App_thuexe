import { SignedOut } from '@clerk/clerk-expo';
import React, { useState,useEffect } from 'react';
import { Image,View, Text, Button,FlatList,StyleSheet, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Platform, Alert, Modal} from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { firebase } from '../config';
import { Dropdown } from 'react-native-element-dropdown';
import { initializeApp } from 'firebase/app';

const SuaSoDatXe = ({route,navigation}) =>{
    const item= [route.params?.item];
    soDatXe = item[0];

    //khai báo biến dữ liệu
    const [chonXe, setChonXe] = useState(soDatXe[0].IDXe);
    const [chonUser, setChonUser] = useState(soDatXe[0].IDKH);


    //data theo api
    const [idDDon,setIDDon] = useState(soDatXe[0].IDDon);
    const [ngayBatDau,setngayBatDau] = useState((soDatXe[0].NgayBatDau).toString());
    const [ngayKetThuc,setNgayKetThuc] = useState((soDatXe[0].NgayKetThuc).toString());

    //set data dropdown
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]); 
  
    
    //Lấy xe
    useEffect(() => {
      axios.get('https://api-thue-xe-5fum.vercel.app/Xe')
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    }, []);

    //lấy khách hàng
    useEffect(() => {
        axios.get('https://api-thue-xe-5fum.vercel.app/KhachHang')
          .then(response => setUser(response.data))
          .catch(error => console.log(error));
      }, []);


    //hàm lấy dữ liệu từ TextInput
    const HandleIDDon = (text) =>{
        setIDDon(text);
    }

    const HandleNgayBatDau = (text) =>{
        setngayBatDau(text);
    }

    const HandleNgayKetThuc = (text) =>{
        setNgayKetThuc(text);
    }

    const HandleTinhTrang = (text) =>{
        setTinhTrang(text);
    }

    const HandleIDXe = (date) =>{
        
        setIDXe(date);
    }
  
    // nút trở về
    const HandleCapNhat = () =>{
        axios.put('https://api-thue-xe-5fum.vercel.app/SoDatXe/' + soDatXe[0]._id,suaSoData)
        .then(response => {
            // Xử lý kết quả từ API
            console.log(response.data);
            Alert.alert("Cập nhật sổ đặt xe thành công");
            console.log(suaSoData);
            navigation.navigate("Tab");
          })
          .catch(error => {
            // Xử lý lỗi nếu có
            console.error("lỗi push");
          });

          console.log(soDatXe[0]);
          console.log(suaSoData);
       
    }

    // thiết kế header
    React.useLayoutEffect(() => {
        navigation.setOptions({
          title: 'Đặt Xe', 
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {fontWeight: 'bold',},
        });
      }, [navigation]);

      const suaSoData ={
        IDDon : idDDon,
        NgayBatDau : ngayBatDau,
        ngayKetThuc : ngayKetThuc,
        IDXe : chonXe,
        IDKH : chonUser,
      }
    
    return(
        <SafeAreaView>
            <View style={styles.container}>

                <Text>
                    {item.TinhTrang}
                </Text>

                <View style={styles.drop}>
                    <Text style={{marginLeft:10}}>Tên Xe</Text>
                    <Dropdown 
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data.map((item,index)=>({value:item._id,label:item.TenXe}))}
                        placeholder= {soDatXe[0].IDXe.TenXe}
                        labelField="label"
                        valueField="value"
                        value={chonXe}
                        onChange={item=>{setChonXe(item.value)}}/>
                </View>

                <View style={styles.drop}>
                    <Text style={{marginLeft:10}}>Tên Tài Khoản</Text>
                    <Dropdown 
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={user.map((item,index)=>({value:item._id,label:item.TenKH}))}
                        placeholder={soDatXe[0].IDKH.TenKH}
                        labelField="label"
                        valueField="value"
                        value={chonUser}
                        onChange={item=>{setChonUser(item.value)}}/>
                </View>
                
                <View style={styles.ngayThue}>
                    <Text>Ngày thuê xe</Text>
                    <TextInput style={styles.ngayThueInput} value={ngayBatDau} onChangeText={HandleNgayBatDau} />
                </View>

                <View style={styles.ngayTra}>
                    <Text>Ngày trả xe</Text>
                    <TextInput style={styles.ngayTraInput} value={ngayKetThuc} onChangeText={HandleNgayKetThuc}/>
                </View>

                <View style={styles.btnView}>
                    <TouchableOpacity onPress={HandleCapNhat} style={styles.btnCapNhat}><Text style={{color:"white"}}>Cập Nhật</Text></TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center'
    },
    ngayThueInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
        padding:5,
    },
    ngayTraInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
        padding:5,
    },
    tinhTrangInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
        padding:5,
    },
    Cccd:{
        alignSelf:'center'
    },
    
    ngayThue:{
        margin:10,
    },
    ngayTra:{
        margin:10,
    },
    tinhTrang:{
        margin:10,
    },
    // soCho:{
    //     margin:10,
    // },

    btnView:{
        alignItems:'center',
    },

    btnCapNhat:{
        width:88,
        height:32,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginRight:10,
        marginVertical:5,
        backgroundColor:"#FF6630",
        
    },

    dropdown:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingHorizontal:10,
        marginHorizontal:10,
        
    },

    hinhCCCD:{
        width:200,
        height:150,
        alignSelf:'center'
    },
    drop:{
        marginVertical:5,
    }
})

export default SuaSoDatXe;