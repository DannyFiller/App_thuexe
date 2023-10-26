import { SignedOut } from '@clerk/clerk-expo';
import React, { useState,useEffect } from 'react';
import { Image,View, Text, Button,FlatList,StyleSheet, ScrollView, TextInput, SafeAreaView, TouchableOpacity} from 'react-native';

const DatXe = ({navigation}) =>{


    const troVeHandle = () =>{
        navigation.navigate('Tab');
    }



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
                <View style={styles.tenTaiKhoan}>
                    <Text>Tên tài khoản</Text>
                    <TextInput style={styles.tenTaiKhoanInput}/>
                </View>

                <View style={styles.bienSoXe}>
                    <Text>Biển số xe</Text>
                    <TextInput style={styles.bienSoXeInput}/>
                </View>

                <View style={styles.tenXe}>
                    <Text>Tên xe</Text>
                    <TextInput style={styles.tenXeInput}/>
                </View>
                
                <View style={styles.ngayThue}>
                    <Text>Ngày thuê xe</Text>
                    <TextInput style={styles.ngayThueInput}/>
                </View>

                <View style={styles.ngayTra}>
                    <Text>Ngày trả xe</Text>
                    <TextInput style={styles.ngayTraInput}/>
                </View>

                <View style={styles.giaThueXe}>
                    <Text>Giá thuê xe</Text>
                    <TextInput style={styles.giaThueXeInput}/>
                </View>

                <View style={styles.soCho}>
                    <Text>Số chỗ</Text>
                    <TextInput style={styles.soChoInput}/>
                </View>

                <View style={styles.btnView}>
                    <TouchableOpacity onPress={troVeHandle} style={styles.btnTroVe}><Text>Trở về</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}} style={styles.btnDatXe}><Text>Đặt xe</Text></TouchableOpacity>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        
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
    }


})

export default DatXe;