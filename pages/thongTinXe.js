import { useRoute } from "@react-navigation/native";
import React from "react";
import { View,Text,StyleSheet,Image, TouchableOpacity } from "react-native";

const ThongTinXe=({route,navigation})=>{

    const item=[route.params.item];
    const XacNhanDatXe=()=>{
        
    }
    return(
        <View style={styles.container}>{item.map((i,index)=>(
            <View key={index} style={styles.info}>
                <View style={styles.carInfoContainer}>
                    <Image style={styles.anh} source={{uri:i.HinhAnh}}></Image>
                    <Text>{i.BienSoXe}</Text>
                    <Text>{i.LoaiXe}</Text>
                    <Text>{i.TenXe}</Text>
                </View>
                <View style={styles.CustomerInfoContainer}>
                    <Text>a</Text>
                </View>
            </View>
        ))}
        <TouchableOpacity style={styles.btn} onPress={XacNhanDatXe()}><Text>Xac nhan</Text></TouchableOpacity>
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
        marginLeft:20
    },
    CustomerInfoContainer:{
        borderWidth:1,
        padding:10,
        width:'90%'
    },
    btn:{
        backgroundColor:'green',
        padding:10,
        marginTop:10,
    },
    info:{
        width:'100%',
    },
    carInfoContainer:{
        width:'90%',
        borderWidth:1,
        height:350,
        marginBottom:50
    },
    anh:{
        width:'100%',
        height:250
    }
})

export default ThongTinXe;