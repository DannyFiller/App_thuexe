import { SignedOut } from '@clerk/clerk-expo';
import React, { useState,useEffect } from 'react';
import { Image,View, Text, Button,FlatList,StyleSheet, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';

const DatXe = ({navigation}) =>{
    // khai báo biến dữ liệu
    const [maSo, setMaSo] = useState('');
    const [tenTaiKhoan, setTenTaiKhoan] = useState('');
    const [bienSo, setBienSo] = useState('');
    const [tenXe, setTenXe] = useState('');
    const [ngayThueXe, setNgayThueXe] = useState('');
    const [ngayTraXe, setNgayTraXe] = useState('');
    const [giaThueXe, setGiaThueXe] = useState('');
    const [soCho, setSoCho] = useState('');
    const [selected,setSelected] = useState('');    

    // Dữ liệu test dropdown
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    //hàm lấy dữ liệu từ TextInput
    const HandleMaSo = (text) =>{
        setTenTaiKhoan(text);
    }

    const HandleTenTaiKhoan = (text) =>{
        setTenTaiKhoan(text);
    }

    const HandleBienSo = (text) =>{
        setBienSo(text);
    }

    const HandleTenXe = (text) =>{
        setTenXe(text);
    }

    const HandleNgayThueXe = (text) =>{
        setNgayThueXe(text);
    }

    const HandleNgayTraXe = (text) =>{
        setNgayTraXe(text);
    }
    const HandleGiaThueXe = (text) =>{
        setGiaThueXe(text);
    }
    const HandleSoCho = (text) =>{
        setSoCho(text);
    }

    
    
    
    // nút trở về
    const troVeHandle = () =>{
        navigation.navigate('Tab');
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

      const testData ={

        BienSoXe:bienSo
      }

    // post dữ liệu lên api
    const DatXeHandle =() =>{
        axios.post('https://api-thue-xe-ten.vercel.app/SoDatXe', testData)
        .then(response => {
          // Xử lý kết quả từ API
          console.log(response.data);
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
      }
      
    return(
        <SafeAreaView>
            <View style={styles.container}>

                <View style={styles.maSo}>
                    <Text>Mã Sổ</Text>
                    <TextInput style={styles.maSoInput} onChangeText={HandleMaSo} value={maSo}/>
                </View>

                <View style={styles.tenTaiKhoan}>
                    <Text>Tên tài khoản</Text>
                    <TextInput style={styles.tenTaiKhoanInput} onChangeText={HandleTenTaiKhoan} value={tenTaiKhoan}/>
                </View>

                <View style={styles.bienSoXe}>
                    <Text>Biển số xe</Text>
                    <TextInput style={styles.bienSoXeInput} onChangeText={HandleBienSo} value={bienSo}/>
                </View>

                {/* <View style={styles.tenXe}>
                    <Text>Tên xe</Text>
                    <TextInput style={styles.tenXeInput} onChangeText={HandleTenXe} value={tenXe}/>
                </View> */}
                
                <View style={styles.ngayThue}>
                    <Text>Ngày thuê xe</Text>
                    <TextInput style={styles.ngayThueInput} onChangeText={HandleNgayThueXe} value={ngayThueXe}/>
                </View>

                <View style={styles.ngayTra}>
                    <Text>Ngày trả xe</Text>
                    <TextInput style={styles.ngayTraInput} onChangeText={HandleNgayTraXe} value={ngayTraXe}/>
                </View>

                <View style={styles.giaThueXe}>
                    <Text>Giá thuê xe</Text>
                    <TextInput style={styles.giaThueXeInput} onChangeText={HandleGiaThueXe} value={giaThueXe}/>
                </View>
                    
                <View style={styles.dropdown}>
                    <SelectList data={countries} setSelected={setSelected} />
                </View>

                {/* <View style={styles.soCho}>
                    <Text>Số chỗ</Text>
                    <TextInput style={styles.soChoInput} onChangeText={HandleSoCho} value={soCho}/>
                </View> */}

                <View style={styles.btnView}>
                    <TouchableOpacity onPress={troVeHandle} style={styles.btnTroVe}><Text>Trở về</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}} style={styles.btnDatXe}><Text>Đặt xe</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=> {console.log(selected)}} style={styles.btnDatXe}><Text>Date</Text></TouchableOpacity>
                </View>

                
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        
    },
    maSoInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
    },
    tenTaiKhoanInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
    },
    bienSoXeInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
    },
    ngayThueInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
    },
    ngayTraInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
    },
    giaThueXeInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
    },
    soChoInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
    },
    tenXeInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
    },
    
    maSo:{
        margin:10,
    },
    tenTaiKhoan:{
        margin:10,
    },
    bienSoXe:{
        margin:10,
    },
    tenXe:{
        margin:10
    },
    ngayThue:{
        margin:10,
    },
    ngayTra:{
        margin:10,
    },
    giaThueXe:{
        margin:10,
    },
    soCho:{
        margin:10,
    },

    btnView:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },

    btnDatXe:{
        width:64,
        height:32,
        borderWidth:1,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        
        marginVertical:5,
    },

    btnTroVe:{
        width:64,
        height:32,
        borderWidth:1,
        borderRadius:5,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:10,
        marginVertical:5,
    },
    dropdown:{
        margin:10,
    }
})

export default DatXe;