import React, { useState } from "react";
import { Image,View, Text, Button,FlatList,StyleSheet,Alert, ScrollView, TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import axios from "axios";

export default CapNhatThongTinKhachHang=({route,navigation})=>{
    const currentAccount=[route.params.data];
    const account=currentAccount[0]
    const [TenKH,setTenKH]=useState(account[0].IDKH.TenKH);
    const [NgaySinh,setNgaySinh]=useState((account[0].IDKH.NgaySinh).toString());
    const [DiaChi,setDiaChi]=useState(account[0].IDKH.DiaChi);
    const [SoDienThoai,setSDT]=useState(account[0].IDKH.SoDienThoai);
    const [CMND,setCMND]=useState(account[0].IDKH.CMND);
    const [BangLai,setBL]=useState(account[0].IDKH.BangLai);
   
    const updateData={
        TenKH:TenKH,
        NgaySinh:NgaySinh,
        DiaChi:DiaChi,
        SoDienThoai:SoDienThoai,
        CMND:CMND,
        BangLai:BangLai,
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
            
            {loading?(
             <ActivityIndicator />
           ):(
            <TouchableOpacity style={styles.btn} onPress={CapNhat}><Text style={{color:'white'}}>Cap Nhat</Text></TouchableOpacity>
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
})