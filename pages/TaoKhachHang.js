import React, { useState } from "react";
import { Image,View, Text, Button,FlatList,StyleSheet,Alert, ScrollView, TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { firebase } from '../config';

export default TaoKhachHang=({navigation})=>{
    const [IDKH,setIDKH]=useState();
    const [TenKH,setTenKH]=useState();
    const [NgaySinh,setNgaySinh]=useState();
    const [DiaChi,setDiaChi]=useState();
    const [SoDienThoai,setSDT]=useState();
    const [CMND,setCMND]=useState();
    const [BangLai,setBL]=useState();
    const [HinhCMND,setHinhCMND] = useState();
    const [HinhBangLai,setHinhBangLai] = useState();

    const postData={
        IDKH: IDKH,
        TenKH:TenKH,
        NgaySinh:NgaySinh,
        DiaChi:DiaChi,
        SoDienThoai:SoDienThoai,
        CMND:CMND,
        HinhCMND: HinhCMND,
        BangLai:BangLai,
        HinhBangLai: HinhBangLai,
    }
    const [loading,setLoading]=useState(false);
    const PostKhachHang=()=>{  
        // setLoading(true);
        axios.post('https://api-thue-xe-5fum.vercel.app/KhachHang',postData)
        .then(response => {
          // Xử lý kết quả từ API
          console.log(response.data);
        //   setLoading(false)
          Alert.alert("Tạo Khách hàng thành công");
          navigation.goBack();
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    }

    
    //Upload hình
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
            setHinhCMND(url);
            uploadMedia1();
            setImage(null);
            console.log(HinhCMND);
            // console.log(postData);
            PostKhachHang();
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
            setHinhBangLai(url);
            setimageBangLai(null);
            console.log(HinhBangLai);
            // console.log(postData);
            // PostKhachHang();
        }catch(error){
            console.error(error);
            setUploading(false);
        }
    }

    return(
        <View style={styles.container}>
            <Text>Ten</Text>
            <TextInput style={styles.input} onChangeText={setTenKH} value={TenKH}></TextInput>
            <Text>Ngay Sinh</Text>
            <TextInput style={styles.input} onChangeText={setNgaySinh} value={NgaySinh} ></TextInput>
            <Text>Dia chi</Text>
            <TextInput style={styles.input} onChangeText={setDiaChi} value={DiaChi} ></TextInput>
            <Text>SoDienThoai</Text>
            <TextInput style={styles.input} onChangeText={setSDT} value={SoDienThoai}></TextInput>
            <Text>CMND</Text>
            <TextInput style={styles.input} onChangeText={setCMND} value={CMND}></TextInput>
            <Text>BangLai</Text>
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