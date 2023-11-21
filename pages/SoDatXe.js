import { SignedOut } from '@clerk/clerk-expo';
import React, { useState,useEffect } from 'react';
import { Image,View, Text, Button,FlatList,StyleSheet, ScrollView, TextInput,TouchableOpacity} from 'react-native';
import {useClerk} from '@clerk/clerk-expo';
import axios from 'axios';



const SoDatXe = ({ navigation }) => {

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
          onPress={() => navigation.navigate('Đặt Xe')}
          style={{marginRight: 10}}>
          <Text style={{color: 'white',marginRight:10}}>Đặt Xe</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  //Tìm kiếm
  const [searchSo, setSearchSo] = useState('');

  const clerk = useClerk();
  //Xử lí đăng xuất 
  const handleSignOut = async () => {
    await clerk.signOut();
    navigation.navigate('Đăng Nhập');
  };

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData =async()=>{
    try {
      const response = await axios.get('https://api-thue-xe-5fum.vercel.app/SoDatXe');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.timKiem} value={searchSo} onChangeText={(text) => setSearchSo(text)} placeholder='Tìm kiếm' onSubmitEditing={()=>{console.log(searchSo)}}></TextInput>
        <ScrollView>
          {data.map((item,index)=>{
            if(searchSo.length>0){
              if(item.IDXe.TenXe.includes(searchSo)||item.IDKH.SoDienThoai.includes(searchSo)){
                return(
                  <TouchableOpacity key={index} onPress={()=>navigation.navigate('Thong tin so dat xe',{item})}>
                  <View style={styles.canGia}>
                  <View style={styles.item_container}>
                      <View style={styles.coverAnh}>       
                        <Image style={styles.anh} source={{uri: item.IDXe.HinhAnh}}/>
                        <View style={styles.maSo}>
                          <Text>{item.IDXe.TenXe}</Text>
                        </View>
                        <View style={styles.bienSoXe}>
                          <Text>{item.IDXe.BienSoXe}</Text> 
                        </View>
                        <View style={styles.loaiXe}>
                          <Text>{item.IDXe.LoaiXe}</Text>
                        </View>
                      </View>
                        <View style={styles.canGia}>
                            <Text style={styles.tenxe}>Tên: {item.IDKH.TenKH}</Text>     
                        </View>
                        <Text style={styles.ngayThue}>Số điện thoại: {item.IDKH.SoDienThoai}</Text>
                      <Text style={styles.ngayThue}>27/10/2022 -10/11/2022</Text>
                    </View>
                </View>
                </TouchableOpacity>
                )
              }else{  
                return null;
              }
            }else{
              return(
                <TouchableOpacity key={index} onPress={()=>navigation.navigate('Thong tin so dat xe',{item})}>
                <View style={styles.canGia}>
                <View style={styles.item_container}>
                    <View style={styles.coverAnh}>       
                      <Image style={styles.anh} source={{uri: item.IDXe.HinhAnh}}/>
                      <View style={styles.maSo}>
                        <Text>{item.IDXe.TenXe}</Text>
                      </View>
                      <View style={styles.bienSoXe}>
                        <Text>{item.IDXe.BienSoXe}</Text> 
                      </View>
                      <View style={styles.loaiXe}>
                        <Text>{item.IDXe.LoaiXe}</Text>
                      </View>
                    </View>
                      <View style={styles.canGia}>
                          <Text style={styles.tenxe}>Tên: {item.IDKH.TenKH}</Text>
                      </View>
                      <Text style={styles.ngayThue}>Số điện thoại: {item.IDKH.SoDienThoai}</Text>
                    <Text style={styles.ngayThue}>27/10/2022 -10/11/2022</Text>
                  </View>
              </View>
              </TouchableOpacity>
              )
            }
              
            
          })}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignSelf:'center',

  },
  coverAnh:{
    position:'relative',

  },
  item_container:{
    padding:1,
    borderRadius:5,
    backgroundColor:'#fff',
    elevation:10,
    marginBottom:10,
  },
  anh:{
    width:300,
    height:170,
    borderWidth:1,
    // borderColor:"#FF0E3C",
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
  },
  canGia:{
    marginTop:5,
    marginHorizontal:10,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'

  },
  tenxe:{
    
  },
  ngayThue:{
    marginHorizontal:10,
    marginVertical:5,
  },
  giaThue:{
    
  },
  maSo:{
    position:'absolute',
    backgroundColor:"#fff",
    margin:5,
    padding:5,
    borderRadius:3,
    opacity:0.8,
    elevation:10,
    top:0,
    left:0,
  },
  bienSoXe:{
    position:'absolute',
    backgroundColor:"#fff",
    margin:5,
    padding:5,
    borderRadius:5,
    opacity:0.8,
    top:0,
    right:0,
  },
  loaiXe:{
    position:'absolute',
    backgroundColor:"#fff",
    margin:5,
    padding:5,
    borderRadius:5,
    opacity:0.8,
    bottom:0,
    right:0,
  },
  timKiem:{
    width:320,
    backgroundColor:'#fff',
    marginTop:10,
    marginBottom:10,
    height:40,
    paddingLeft:15,
    borderRadius:5,
  },
});

export default SoDatXe;