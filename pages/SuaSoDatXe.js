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
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';


const SuaSoDatXe = ({route,navigation}) =>{
    const item= [route.params?.item];
    soDatXe = item[0];

    //khai báo biến dữ liệu
    const [chonXe, setChonXe] = useState(soDatXe[0].IDXe);
    const [chonUser, setChonUser] = useState(soDatXe[0].IDKH);


    //data theo api
    const [idDDon,setIDDon] = useState(soDatXe[0].IDDon);
    const [ngayBatDau,setngayBatDau] = useState(new Date((soDatXe[0].NgayBatDau)));
    const [ngayKetThuc,setNgayKetThuc] = useState(new Date(soDatXe[0].NgayKetThuc));

    //set data dropdown
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]); 

    //Set date 
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [show2,setShow2]=useState(false);
  
    const onChange = (event, selectedDate) => {
        setShow(false);
        if(selectedDate){
            HandleNgayBatDau(selectedDate);
        }

      };
      const onChange2 = (event, selectedDate) => {
        setShow2(false);
        if(selectedDate){
            HandleNgayKetThuc(selectedDate);
        }

      };
      const showMode = () => {
        setShow(true);
      };
      const showMode2 = () => {
        setShow2(true);
      };
  
    
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
        const ngayBD=moment(ngayBatDau).valueOf();
        const ngayKT=moment(ngayKetThuc).valueOf();

        const suaSoData ={
            IDDon : idDDon,
            NgayBatDau : ngayBD,
            ngayKetThuc : ngayKT,
            IDXe : chonXe,
            IDKH : chonUser,
          }
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
                
                {/* <View style={styles.ngayThue}>
                    <Text>Ngày thuê xe</Text>
                    <TextInput style={styles.ngayThueInput} value={moment(ngayBatDau).format('DD/MM/yyyy').toString()} onChangeText={HandleNgayBatDau} />
                </View> */}

                {/* <View style={styles.ngayTra}>
                    <Text>Ngày trả xe</Text>
                    <TextInput style={styles.ngayTraInput} value={moment(ngayKetThuc).format('DD/MM/yyyy').toString()} onChangeText={HandleNgayKetThuc}/>
                </View> */}

                <View style={styles.ngayThue}>
                    <Text>Ngày thuê xe</Text>
                    <View style={styles.dateContainer}>
                        <TouchableOpacity style={styles.dateBtn} onPress={showMode}><AntDesign name="calendar" size={24} color="black" /></TouchableOpacity>
                        <TextInput style={styles.Input} value={moment(ngayBatDau).format('DD/MM/yyyy').toString()} />
                    </View>
                </View>

                <View style={styles.ngayTra}>
                    <Text>Ngày trả xe</Text>
                    <View style={styles.dateContainer}>
                        <TouchableOpacity style={styles.dateBtn} onPress={showMode2}><AntDesign name="calendar" size={24} color="black" /></TouchableOpacity>
                        <TextInput style={styles.Input} value={moment(ngayKetThuc).format('DD/MM/yyyy').toString()} />
                    </View>
                </View>

                <View style={styles.btnView}>
                    <TouchableOpacity onPress={HandleCapNhat} style={styles.btnCapNhat}><Text style={{color:"white"}}>Cập Nhật</Text></TouchableOpacity>
                </View>

                {show&&(
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={ngayBatDau}
                        mode='date'
                        display="default"
                        onChange={onChange}
                    />)}
                    {show2&&(
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={ngayKetThuc}
                        mode='date'
                        display="default"
                        onChange={onChange2}
                    />)}

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Input:{
        backgroundColor:'white',
        width:'100%',
        borderWidth:1,
        paddingLeft:40
    },
    dateContainer:{
        display:'flex',
        flexDirection:'row',
        position:'relative'
    },
    dateBtn:{
        width:'10%',
        position:'absolute',
        zIndex:6,
        height:'99%',
        borderWidth:1
    },
    inputItem:{
        width:'100%',
        marginLeft:65,
        margin:10,
    },
    container:{
        justifyContent:'center'
    },
    maSoInput:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingLeft:10,
        padding:5,
    },
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