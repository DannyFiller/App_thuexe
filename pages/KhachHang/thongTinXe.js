import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet,Image, TouchableOpacity, Alert, TextInput,ActivityIndicator } from "react-native";
import moment from 'moment';
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";


const ThongTinXe=({route,navigation})=>{
    const { isLoaded, isSignedIn, user } = useUser();
    const[idDDon,HandleIDDon]=useState();
    const[ngayBatDau,HandleNgayBatDau]=useState();
    const[ngayKetThuc,HandleNgayKetThuc]=useState();
    const [idKH,setIDKH]=useState("");  
    const [isRentalPricesVisible, setIsRentalPricesVisible] = useState(false);
    const [isloading,setLoading]=useState(false);
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
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    const item=[route.params.item];

    const toggleRentalPrices = () => {
        setIsRentalPricesVisible(!isRentalPricesVisible);
      };
      
    
    const XacNhanDatXe=async ()=>{  
        try{
            setLoading(true);
            const account=await axios.get("https://api-thue-xe-5fum.vercel.app/TaiKhoan/GetTKKH/"+user.emailAddresses);
            const testData ={
                IDDon : idDDon,
                NgayBatDau : ngayBatDau,
                NgayKetThuc : ngayKetThuc,
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
             <TouchableOpacity onPress={()=>navigation.goBack()}><Text>Tro lai</Text></TouchableOpacity>
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
                            <Text style={styles.label}>Loại Xe  : </Text>
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
                            <Text>Mã Đơn</Text>
                            <TextInput style={styles.Input} onChangeText={HandleIDDon} value={idDDon} />
                        </View>
                        <View style={styles.inputItem}>
                            <Text>Ngày thuê xe</Text>
                            <TextInput style={styles.Input} value={ngayBatDau} onChangeText={HandleNgayBatDau} />
                        </View>

                        <View style={styles.inputItem}>
                            <Text>Ngày trả xe</Text>
                            <TextInput style={styles.Input} value={ngayKetThuc} onChangeText={HandleNgayKetThuc} />
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
    inputItem:{
        width:'100%',
        marginLeft:65,
        margin:10
    },
    container:{
        justifyContent:'top',
        width:'100%',
        height:'100%',
        display:"flex",
        flexDirection:'column',
        alignItems:'center',
        marginLeft:20,
        top:50

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
        borderWidth:1
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