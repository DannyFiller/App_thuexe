import { SignedOut } from '@clerk/clerk-expo';
import React, { useState,useEffect } from 'react';
import { Image,View, Text, Button,FlatList,StyleSheet, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Platform, Alert, Modal} from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { firebase } from '../config';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';


const DatXe = ({navigation}) =>{

    //Set date 
    const [date, setDate] = useState(new Date(1598051730000));
    const [date1, setDate1] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      setngayBatDau(date);
      console.log(date);
    };

    const onChange1 = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate1(currentDate);
        setNgayKetThuc(date1);
        console.log(date1);
      };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  

    // dữ liệu cũ
    // const [maSo, setMaSo] = useState('');
    // const [tenTaiKhoan, setTenTaiKhoan] = useState('');
    // const [bienSo, setBienSo] = useState('');
    // const [tenXe, setTenXe] = useState('');
    // const [ngayThueXe, setNgayThueXe] = useState('');
    // const [ngayTraXe, setNgayTraXe] = useState('');
    // const [giaThueXe, setGiaThueXe] = useState('');
    // const [soCho, setSoCho] = useState('');
 
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Tạo Khách Hàng')}
              style={{marginRight: 10}}>
              <Text style={{color: 'white',marginRight:10}}>Thêm Khách Hàng</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation]);



    //khai báo biến dữ liệu
    const [chonData, setChonData] = useState(null);
    const [chonUser, setChonUser] = useState(null);


    //data theo api
    const [idDDon,setIDDon] = useState('');
    const [ngayBatDau,setngayBatDau] = useState('');
    const [ngayKetThuc,setNgayKetThuc] = useState('');
    const [tinhTrang,setTinhTrang] = useState('Chưa xác nhận');

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

    const thongTinXe=(a,b,c)=>{
      navigation.navigate("Thong tin xe",a,b,c);
    }

    // //hình
    // const [image,setImage] = useState(null);
    // const [upload,setUploading] = useState(false);
    // const [linkHinh,setLinkHinh] = useState();
    
    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes : ImagePicker.MediaTypeOptions.All,
    //         allowEditing :true,
    //         aspect : [4,3],
    //         quality : 1,
    //     });

    //     if(!result.canceled){
    //         setImage(result.assets[0].uri);
    //     }
    // }
    // //upload hình
    // const uploadMedia = async () => {
    //     setUploading(true);
    //     try{
    //         const {uri} = await FileSystem.getInfoAsync(image);
    //         const blob = await new Promise((resolve,reject) => {
    //             const xhr = new XMLHttpRequest();
    //             xhr.onload = () => {
    //                 resolve(xhr.response);
    //             };
    //             xhr.onerror = (e) => {
    //                 reject(new TypeError('Network request failed'));
    //             }
    //             xhr.responseType = 'blob';
    //             xhr.open('GET',uri,true);
    //             xhr.send(null);
    //         })
    //         const filename = image.substring(image.lastIndexOf('/') + 1);
    //         const ref = firebase.storage().ref().child(filename);
    
    //         await ref.put(blob);
    //         const url = await ref.getDownloadURL()
    //         setUploading(false);
    //         Alert.alert('Photo Uploaded!!');
    //         setLinkHinh(url);
    //         setImage(null);
    //     }catch(error){
    //         console.error(error);
    //         setUploading(false);
    //     }
    // }


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
    const troVeHandle = () =>{
        // navigation.navigate('Tab');

        console.log(date+ " và  " + date1);
        console.log("ngày bad dau : " + ngayBatDau);
        console.log("ngay ket thuc : " + ngayKetThuc);
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
        IDDon : idDDon,
        NgayBatDau : ngayBatDau,
        NgayKetThuc : ngayKetThuc,
        TinhTrang : tinhTrang,
        IDXe : chonData,
        IDKH : chonUser,
      }

    // post dữ liệu lên api
    const DatXeHandle =async() =>{
        axios.post('https://api-thue-xe-5fum.vercel.app/SoXe', testData)
        .then(response => {
          // Xử lý kết quả từ API
          console.log(response.data);
          Alert.alert("Dặt Xe Thành Công");
          navigation.goBack();
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
      }


    //test
    const testDatXe =() =>{
        console.log("KH " + chonData + " IDXe " + chonUser)
        console.log(test);
    }
      
    
    return(
        <SafeAreaView>
            <View style={styles.container}>

                <View style={styles.drop}>
                    <Text style={{marginLeft:10}}>Tên Xe</Text>
                    <Dropdown 
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data.map((item,index)=>({value:item._id,label:item.TenXe}))}
                        placeholder="Chọn xe"
                        labelField="label"
                        valueField="value"
                        value={chonData}
                        onChange={item=>{setChonData(item.value)}}/>
                </View>

                <View style={styles.drop}>
                    <Text style={{marginLeft:10}}>Tên Tài Khoản</Text>
                    <Dropdown 
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={user.map((item,index)=>({value:item._id,label:item.TenKH}))}
                        placeholder="Chọn Tên Tài Khoan"
                        labelField="label"
                        valueField="value"
                        value={chonUser}
                        onChange={item=>{setChonUser(item.value)}}/>
                </View>
                

                {/* <Dropdown 
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data.map((item,index)=>({value:item,label:item._id}))}
                placeholder="Chọn Khách Hàng"
                labelField="label"
                valueField="value"
                value={selectedValue}
                onChange={item=>{setSelectedValue(item.value)}}/> */}


                <View style={styles.maSo}>
                    <Text>Mã Đơn</Text>
                    <TextInput style={styles.maSoInput} onChangeText={HandleIDDon} value={idDDon}/>
                </View>

                {/* <View style={styles.tenTaiKhoan}>
                    <Text>Tên tài khoản</Text>
                    <TextInput style={styles.tenTaiKhoanInput} onChangeText={HandleTenTaiKhoan} value={tenTaiKhoan}/>
                </View> */}

                

                {/* <View style={styles.tenXe}>
                    <Text>Tên xe</Text>
                    <TextInput style={styles.tenXeInput} onChangeText={HandleTenXe} value={tenXe}/>
                </View> */}
                
                


                <View style={styles.ngayThue}>
                    <Text>Ngày thuê xe</Text>
                    <TextInput style={styles.ngayThueInput} value={ngayBatDau} onChangeText={HandleNgayBatDau}/>
                </View>

                <View style={styles.ngayTra}>
                    <Text>Ngày trả xe</Text>
                    <TextInput style={styles.ngayTraInput} value={ngayKetThuc} onChangeText={HandleNgayKetThuc}/>
                </View>
                
                    
                {/* <View style={styles.dropdown}>
                    <SelectList data={countries} setSelected={setSelected} />
                </View> */}

                {/* <View style={styles.soCho}>
                    <Text>Số chỗ</Text>
                    <TextInput style={styles.soChoInput} onChangeText={HandleSoCho} value={soCho}/>
                </View> */}

                
                {/* <View style={styles.Cccd} onStartShouldSetResponder={pickImage}>
                    <Text style={{alignSelf:'center',margin:10}}>Bấm vào đây chọn hình Căn cước công dân</Text>
                    {
                        image && <Image
                        source={{uri:image}}
                        style={styles.hinhCCCD}
                        />
                    }
                </View> */}

                <View style={styles.btnView}>
                    <TouchableOpacity onPress={troVeHandle} style={styles.btnTroVe}><Text>Trở về</Text></TouchableOpacity>
                    <TouchableOpacity onPress={DatXeHandle} style={styles.btnDatXe}><Text>Đặt xe</Text></TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=> {}} style={styles.btnDatXe}><Text>Date</Text></TouchableOpacity> */}
                </View>


                <Button onPress={showDatepicker} title="Show date picker!" />
                <Text>selected: {date.toLocaleString()}</Text>

                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                    />
                )}        


                <Button onPress={showDatepicker} title="Show date 2!" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    // tenTaiKhoanInput:{
    //     backgroundColor:'#fff',
    //     borderRadius:5,
    //     borderWidth:1,
    //     paddingLeft:10,
    // },
    // bienSoXeInput:{
    //     backgroundColor:'#fff',
    //     borderRadius:5,
    //     borderWidth:1,
    //     paddingLeft:10,
    // },
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
    // soChoInput:{
    //     backgroundColor:'#fff',
    //     borderRadius:5,
    //     borderWidth:1,
    //     paddingLeft:10,
    // },
    // tenXeInput:{
    //     backgroundColor:'#fff',
    //     borderRadius:5,
    //     borderWidth:1,
    //     paddingLeft:10,
    // },
    
    maSo:{
        margin:10,
    },
    // tenTaiKhoan:{
    //     margin:10,
    // },
    // bienSoXe:{
    //     margin:10,
    // },
    // tenXe:{
    //     margin:10
    // },
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
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:1,
        paddingHorizontal:10,
        marginHorizontal:10,
        
    },
    Cccd:{
        alignSelf:'center'
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

export default DatXe;