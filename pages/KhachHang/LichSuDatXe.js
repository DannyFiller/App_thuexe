import { SignedOut, useUser } from '@clerk/clerk-expo';
import React, { useState,useEffect } from 'react';
import { Image,View, Text, Button,FlatList,StyleSheet, ScrollView, TextInput,TouchableOpacity} from 'react-native';
import {useClerk} from '@clerk/clerk-expo';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';

const SoXe = ({ navigation }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [selectedValue, setSelectedValue] = useState(null);
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
        <Dropdown style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={[{value:"Đặt trước",label:"Đặt trước"},
                {value:"Hoạt động",label:"Hoạt động"},
                {value:"Hoàn thành",label:"Hoàn thành"}
              ]}
        placeholder="Lọc"
        labelField="label"
        valueField="value"
        value={selectedValue}
        onChange={item=>{setSelectedValue(item.value)}}/>
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
      const res=await axios.get('https://api-thue-xe-5fum.vercel.app/TaiKhoan/GetTKKH/'+user.emailAddresses);
      const response = await axios.get('https://api-thue-xe-5fum.vercel.app/LichSuDatXe/'+res.data[0].IDKH._id);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
        <View>
        <TextInput style={styles.timKiem} value={searchSo} onChangeText={(text) => setSearchSo(text)} placeholder='Tìm kiếm' onSubmitEditing={()=>{console.log(searchSo)}}></TextInput>
        
        </View>
        <ScrollView>
          {data.map((item,index)=>{
            if(selectedValue!=null){
                if(item.TinhTrang==selectedValue){
                    if(searchSo.length>0 ){
                        if(item.IDXe.TenXe.includes(searchSo)||item._id.includes(searchSo)){
                          return(
                            <View key={index}>
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
                                      <Text style={styles.tenxe}>Mã sổ: {item._id}</Text>
                                  </View>
                                  <Text style={styles.ngayThue}>Trạng thái: {item.TinhTrang}</Text>
                                  <Text style={styles.ngayThue}>{moment(new Date(item.NgayBatDau)).format("DD/MM/yyyy")} - {moment(new Date(item.NgayKetThuc)).format("DD/MM/yyyy")}</Text>
                    </View>
                          </View>
                          </View>
                          )
                        }else{  
                          return null;
                        }
                      }else{
                        return(
                            <View key={index}>
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
                                      <Text style={styles.tenxe}>Mã sổ: {item._id}</Text>
                                  </View>
                                  <Text style={styles.ngayThue}>Trạng thái: {item.TinhTrang}</Text>
                                  <Text style={styles.ngayThue}>{moment(new Date(item.NgayBatDau)).format("DD/MM/yyyy")} - {moment(new Date(item.NgayKetThuc)).format("DD/MM/yyyy")}</Text>
                          </View>
                          </View>
                          </View>
                        )
                      }
                        
                      
                }else{
                    return null;
                }
            }else{
                if(searchSo.length>0 ){
                    if(item.IDXe.TenXe.includes(searchSo)||item.IDKH.SoDienThoai.includes(searchSo)){
                      return(
                        <View key={index}>
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
                              <View style={styles.TinhTrang}>
                            <Text>{item.TinhTrang}</Text>
                            </View>
                              <View style={styles.loaiXe}>
                                <Text>{item.IDXe.LoaiXe}</Text>
                              </View>
                            </View>
                              <View style={styles.canGia}>
                                  <Text style={styles.tenxe}>Mã sổ: {item._id}</Text>
                              </View>
                              <Text style={styles.ngayThue}>Trạng thái: {item.TinhTrang}</Text>
                              <Text style={styles.ngayThue}>{moment(new Date(item.NgayBatDau)).format("DD/MM/yyyy")} - {moment(new Date(item.NgayKetThuc)).format("DD/MM/yyyy")}</Text>
                    </View>
                      </View>
                      </View>
                      )
                    }else{  
                      return null;
                    }
                  }else{
                    return(
                      <View key={index}>
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
                            <View style={styles.TinhTrang}>
                          <Text>{item.TinhTrang}</Text>
                        </View>
                            <View style={styles.loaiXe}>
                              <Text>{item.IDXe.LoaiXe}</Text>
                            </View>
                          </View>
                            <View style={styles.canGia}>
                                <Text style={styles.tenxe}>Mã sổ: {item._id}</Text>
                            </View>
                            <Text style={styles.ngayThue}>Trạng thái: {item.TinhTrang}</Text>
                            <Text style={styles.ngayThue}>{moment(new Date(item.NgayBatDau)).format("DD/MM/yyyy")} - {moment(new Date(item.NgayKetThuc)).format("DD/MM/yyyy")}</Text>
                    </View>
                    </View>
                    </View>
                    )
                  }
                    
                  
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
  TinhTrang:{
    position:'absolute',
    backgroundColor:"#fff",
    margin:5,
    padding:5,
    borderRadius:5,
    opacity:0.8,
    left:0,
    bottom:0,
  },
  dropdown: {
    height: 30,
    padding:8,
    borderColor:'gray',
    width:'55%',
    borderRadius:5,
    textAlign:'center',
    marginRight:20,
    backgroundColor:'white'
  },
  placeholderStyle: {
    marginLeft:10,
  },
  selectedTextStyle:{
    marginLeft:10,
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

export default SoXe;