import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet,Image, TouchableOpacity, Alert, TextInput,ActivityIndicator, Platform } from "react-native";
import moment from 'moment';
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from '@expo/vector-icons';

const ThongTinXe=({route,navigation})=>{
    const { isLoaded, isSignedIn, user } = useUser();
    const[idDDon,HandleIDDon]=useState();
    const[ngayBatDau,HandleNgayBatDau]=useState(new Date());
    const[ngayKetThuc,HandleNgayKetThuc]=useState(new Date());
    const [isRentalPricesVisible, setIsRentalPricesVisible] = useState(false);
    const [isloading,setLoading]=useState(false);
    const [mode,setMode]=useState('date');
    const [show,setShow]=useState(false);
    const [show2,setShow2]=useState(false);
    const [text,setText]=useState('Empty');

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

    React.useLayoutEffect(() => {
        navigation.setOptions({
          title: 'Chi Tiết', 
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {fontWeight: 'bold',},
        });
      }, [navigation]);
    
    const item=[route.params.item];

    const toggleRentalPrices = () => {
        if(isSignedIn){
            setIsRentalPricesVisible(!isRentalPricesVisible);
        }else{
            Alert.alert(
                "Thông báo",
                "Vui lòng đăng nhập để sử dụng tính năng này",
                [
                  {
                    text: "Đăng nhập",
                    onPress: () => navigation.navigate("Đăng Nhập"),
                  },
                  {
                    text: "Hủy",
                    onPress: () => console.log("Đã hủy"),
                    style: "cancel",
                  },
                ]
              );
        }
      };
      
    
    const XacNhanDatXe=async ()=>{  
        try{
            const ngayBD=moment(ngayBatDau).valueOf();
            const ngayKT=moment(ngayKetThuc).valueOf();
            setLoading(true);
            const account=await axios.get("https://api-thue-xe-5fum.vercel.app/TaiKhoan/GetTKKH/"+user.emailAddresses);
            const testData ={
                NgayBatDau : ngayBD,
                NgayKetThuc : ngayKT,
                TinhTrang : 'Chưa xác nhận',
                IDXe : item[0]._id,
                IDKH :account.data[0].IDKH._id,
              }
            await axios.post("https://api-thue-xe-5fum.vercel.app/SoXe",testData);
            Alert.alert("Dặt Xe Thành Công");
            console.log(testData)
            navigation.goBack();
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }


    //trừ 2 ngày 
    // chưa xài dc 
    const date1 = moment('2021-09-01', 'YYYY-MM-DD');
    const date2 = moment('2021-09-10', 'YYYY-MM-DD');
    const differenceInDays = date2.diff(date1, 'days');
    console.log(differenceInDays);
    
    return(
        <View>
             <TouchableOpacity style={styles.thoatLink} onPress={()=>navigation.goBack()}><Text style={{fontSize:20}}>Thoát</Text></TouchableOpacity>
        <View style={styles.container}>
            
            {item.map((i,index)=>(
            <View key={index} style={styles.info}>
                <View style={styles.carInfoContainer}>
                    
                    <Image style={styles.anh} source={{uri:i.HinhAnh}}></Image>
                    <View style={styles.viewInfoXe}>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Biển Số Xe : </Text>
                            <Text>{i.BienSoXe}</Text>
                        </View>
                        
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Tên Xe : </Text>
                            <Text>{i.TenXe}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Loại Xe : </Text>
                            <Text>{i.LoaiXe}</Text>
                        </View>
                        <View style={styles.row_thongtin}>
                            <Text style={styles.label}>Giá thuê 1 ngày : </Text>
                            <Text>{i.SoTien}</Text>
                        </View>
                    </View>
                    
                </View>
            </View>
        ))}
        
        {isRentalPricesVisible?(
                <View style={styles.inputContainer}>
                        <View style={styles.inputItem}>
                            <Text>Ngày thuê xe</Text>
                            <View style={styles.dateContainer}>
                                <TouchableOpacity style={styles.dateBtn} onPress={showMode}><AntDesign name="calendar" size={24} color="black" /></TouchableOpacity>
                                <TextInput style={styles.Input} value={moment(ngayBatDau).format('DD/MM/yyyy').toString()} />
                            </View>
                        </View>

                        <View style={styles.inputItem}>
                            <Text>Ngày trả xe</Text>
                            <View style={styles.dateContainer}>
                                <TouchableOpacity style={styles.dateBtn} onPress={showMode2}><AntDesign name="calendar" size={24} color="black" /></TouchableOpacity>
                                <TextInput style={styles.Input} value={moment(ngayKetThuc).format('DD/MM/yyyy').toString()} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={XacNhanDatXe}>
                            <Text style={{ color: "white" }}>Đặt xe</Text>
                        </TouchableOpacity>
                </View>
        ):(isloading?(
            <ActivityIndicator></ActivityIndicator>
        ):(
            <View>
                <TouchableOpacity style={styles.btn} onPress={toggleRentalPrices}>
                    <Text style={{ color: "white" }}>Đặt xe</Text>
                </TouchableOpacity>
            </View>
        )     
            
        )}
       {show&&(
         <DateTimePicker
         testID="dateTimePicker"
         value={ngayBatDau}
         mode='date'
         display="default"
         onChange={onChange}
       />
       )}
        {show2&&(
         <DateTimePicker
         testID="dateTimePicker"
         value={ngayKetThuc}
         mode='date'
         display="default"
         onChange={onChange2}
       />
       )}
        </View>
        </View>
       
        
    )
}
const styles=StyleSheet.create({
    inputContainer:{
        width:"90%",
        marginRight:35,
        justifyContent:'center',
        display:"flex",
        backgroundColor:'white',
        alignItems:'center',
        padding:10,
        borderRadius:10,
        borderWidth:1
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
        justifyContent:'top',
        width:'100%',
        height:'100%',
        display:"flex",
        flexDirection:'column',
        alignItems:'center',
        marginLeft:20,


    },
    thoatLink:{
        margin:20,
    },
    CustomerInfoContainer:{
        borderWidth:1,
        padding:10,
        width:'90%',
        borderRadius:5,
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
        marginRight:25,
        width:100,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
    },
    info:{
        width:'100%',
    },
    carInfoContainer:{
        width:'90%',
        borderWidth:1,
        height:350,
        marginBottom:16,
        borderRadius:5,
    },
    anh:{
        width:'100%',
        height:250,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
    },
    viewInfoXe:{
        padding:16,
    },
    row_thongtin:{
        display:"flex",
        flexDirection:"row"
    },
    label:{
        fontWeight:"bold"
    },
    titleText:{
        fontSize:24,
        fontWeight:"bold",
    },
    titleContain:{
       alignItems:"center",
       marginBottom:8
    }
})

export default ThongTinXe;