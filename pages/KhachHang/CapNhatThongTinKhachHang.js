import React, { useState } from "react";
import { Image,View, Text, Button,FlatList,StyleSheet,Alert, ScrollView, TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import firebase from "firebase/compat";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

export default CapNhatThongTinKhachHang=({route,navigation})=>{
    const currentAccount=[route.params.data];
    const account=currentAccount[0]
    const [TenKH,setTenKH]=useState(account[0].IDKH.TenKH);
    const [NgaySinh,setNgaySinh]=useState(new Date());
    const [DiaChi,setDiaChi]=useState(account[0].IDKH.DiaChi);
    const [SoDienThoai,setSDT]=useState(account[0].IDKH.SoDienThoai);
    const [CMND,setCMND]=useState(account[0].IDKH.CMND);
    const [BangLai,setBL]=useState(account[0].IDKH.BangLai);
    var [hinhCCCD,setCMNDImg] = useState("");
    var [hinhBang,setBLImg] = useState("");
    const [show,setShow]=useState(false);
    const onChange = (event, selectedDate) => {
        setShow(false);
        if(selectedDate){
            setNgaySinh(selectedDate);
        }

      };
      const showMode = () => {
        setShow(true);
      };
    const updateData={
        TenKH:TenKH,
        NgaySinh:moment(NgaySinh).valueOf(),
        DiaChi:DiaChi,
        SoDienThoai:SoDienThoai,
        CMND:CMND,
        HinhCMND:hinhCCCD,
        BangLai:BangLai,
        HinhBangLai:hinhBang,
    }
    const [loading,setLoading]=useState(false);
    const CapNhat=()=>{  
        setLoading(true);
        axios.put('https://api-thue-xe-5fum.vercel.app/KhachHang/654dc4e4d37dc60ba7fd134d',updateData)
        .then(response => {
          // Xử lý kết quả từ API
          console.log(response.data);
          setLoading(false)
          Alert.alert("Dặt Xe Thành Công");
          navigation.goBack();
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    }
    const [image,setImage] = useState(null);
    const [imageBangLai,setimageBangLai] = useState(null);
    const [upload,setUploading] = useState(false);
    const [linkHinh,setLinkHinh] = useState();

    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowEditing :true,
            aspect : [4,3],
            quality : 1,
        });

        if(!result.canceled){
            setImage(result.assets[0].uri);
        }
    }

    const pickImageBangLai = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowEditing :true,
            aspect : [4,3],
            quality : 1,
        });

        if(!result.canceled){
            setimageBangLai(result.assets[0].uri);
        }
    }

    //upload hình
    const uploadMedia = async () => {
        setUploading(true);
        try{
            const {uri} = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve,reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                }
                xhr.responseType = 'blob';
                xhr.open('GET',uri,true);
                xhr.send(null);
            })
            const filename = image.substring(image.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);
    
            await ref.put(blob);
            const url = await ref.getDownloadURL()
            setUploading(false);
            Alert.alert('Photo Uploaded!!');
            console.log(url);
            setCMNDImg(url);
            uploadMedia1();
            setImage(null);
            console.log(hinhCCCD);
            console.log(updateData);
            CapNhat();
        }catch(error){
            console.error(error);
            setUploading(false);
        }
    }

    //Upload BangLai
    const uploadMedia1 = async () => {
        setUploading(true);
        try{
            const {uri} = await FileSystem.getInfoAsync(imageBangLai);
            const blob = await new Promise((resolve,reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                }
                xhr.responseType = 'blob';
                xhr.open('GET',uri,true);
                xhr.send(null);
            })
            const filename = imageBangLai.substring(imageBangLai.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);
    
            await ref.put(blob);
            const url = await ref.getDownloadURL()
            setUploading(false);
            // Alert.alert('Photo Uploaded!!');
            setBLImg(url);
            setimageBangLai(null);
            console.log(hinhBang);
            // console.log(postData);
            // PostKhachHang();
        }catch(error){
            console.error(error);
            setUploading(false);
        }
    }
    return(
        <View style={styles.container}>
            <Text> Họ và tên </Text>
            <TextInput style={styles.input} onChangeText={setTenKH} value={TenKH}></TextInput>
            <Text> Ngày Sinh </Text>
            <View style={styles.dateContainer}>
                <TouchableOpacity style={styles.dateBtn} onPress={showMode}><AntDesign name="calendar" size={24} color="black" /></TouchableOpacity>
                <TextInput style={styles.Input} value={moment(account[0].IDKH.NgaySinh).format('DD/MM/yyyy').toString()} />
            </View>
            <Text>Địa chỉ</Text>
            <TextInput style={styles.input} onChangeText={setDiaChi} value={DiaChi} ></TextInput>
            <Text>Số điện thoại</Text>
            <TextInput style={styles.input} onChangeText={setSDT} value={SoDienThoai}></TextInput>
            <Text>CMND</Text>
            <TextInput style={styles.input} onChangeText={setCMND} value={CMND}></TextInput>
            <Text>Bằng lái</Text>
            <TextInput style={styles.input} onChangeText={setBL} value={BangLai}></TextInput>
            
           
            <View style={styles.Cccd} onStartShouldSetResponder={pickImage}>
                    <Text style={{alignSelf:'center',margin:10}}>Bấm vào đây chọn hình Căn cước công dân</Text>
                    {
                        image && <Image
                        source={{uri:image}}
                        style={styles.hinhCCCD}
                        />
                    }
                </View>

                <View style={styles.Cccd} onStartShouldSetResponder={pickImageBangLai}>
                    <Text style={{alignSelf:'center',margin:10}}>Bấm vào đây chọn hình bằng lái</Text>
                    {
                        imageBangLai && <Image
                        source={{uri:imageBangLai}}
                        style={styles.hinhCCCD}
                        />
                    }
                </View>


            {loading?(
             <ActivityIndicator />
           ):(
            <TouchableOpacity style={styles.btn} onPress={uploadMedia}><Text style={{color:'white'}}>Cap Nhat</Text></TouchableOpacity>
           )}
           {show&&(
         <DateTimePicker
         testID="dateTimePicker"
         value={NgaySinh}
         mode='date'
         display="default"
         onChange={onChange}
       />
       )}
        </View>

    )
}

const styles=StyleSheet.create({
    input:{
        width:'80%',
        backgroundColor:'white',
        
    },
    container:{
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
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
    Input:{
        backgroundColor:'white',
        width:'80%',
        borderWidth:1,
        paddingLeft:40
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
    Cccd:{
        alignSelf:'center'
    },
    hinhCCCD:{
        width:200,
        height:150,
        alignSelf:'center'
    },
})