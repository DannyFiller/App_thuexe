// import React, { useState } from "react";
// import { Image,View, Text, Button,FlatList,StyleSheet,Alert, ScrollView, TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
// import axios from "axios";
// import * as ImagePicker from 'expo-image-picker'
// import * as FileSystem from 'expo-file-system';
// import { firebase } from '../config';
// import { AntDesign } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from 'moment';

// export default TaoKhachHang=({navigation})=>{
//     const [IDKH,setIDKH]=useState();
//     const [TenKH,setTenKH]=useState();
//     const [NgaySinh,setNgaySinh]=useState(new Date());
//     const [DiaChi,setDiaChi]=useState();
//     const [SoDienThoai,setSDT]=useState();
//     const [CMND,setCMND]=useState();
//     const [BangLai,setBL]=useState();
//     const [HinhCMND,setHinhCMND] = useState();
//     const [HinhBangLai,setHinhBangLai] = useState();

//     //ngày
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);

//     const onChange = (event, selectedDate) => {
//         setShow(false);
//         if(selectedDate){
//             setNgaySinh(selectedDate);
//         }
//       };
      

//     const showMode = () => {
//     setShow(true);
//     };
//     const [loading,setLoading]=useState(false);
    
//     const PostKhachHang=()=>{  
//         const ngay=moment(NgaySinh).valueOf();
//         const postData={
//             IDKH: IDKH,
//             TenKH:TenKH,
//             NgaySinh:12312312,
//             DiaChi:DiaChi,
//             SoDienThoai:SoDienThoai,
//             CMND:CMND,
//             HinhCMND: HinhCMND,
//             BangLai:BangLai,
//             HinhBangLai: HinhBangLai,
//         }
//         // setLoading(true);
//         axios.post('https://api-thue-xe-5fum.vercel.app/KhachHang',postData)
//         .then(response => {
//           // Xử lý kết quả từ API
//           console.log(response.data);
//         //   setLoading(false)
//           Alert.alert("Tạo Khách hàng thành công");
//           navigation.goBack();
//         })
//         .catch(error => {
//           // Xử lý lỗi nếu có
//           console.error(error);
//         });
//     }

    
//     //Upload hình
//     const [image,setImage] = useState(null);
//     const [imageBangLai,setimageBangLai] = useState(null);
//     const [upload,setUploading] = useState(false);
//     const [linkHinh,setLinkHinh] = useState();

    
//     const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes : ImagePicker.MediaTypeOptions.Images,
//             allowEditing :true,
//             aspect : [4,3],
//             quality : 1,
//         });

//         if(!result.canceled){
//             setImage(result.assets[0].uri);
//         }
//     }

//     const pickImageBangLai = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes : ImagePicker.MediaTypeOptions.Images,
//             allowEditing :true,
//             aspect : [4,3],
//             quality : 1,
//         });

//         if(!result.canceled){
//             setimageBangLai(result.assets[0].uri);
//         }
//     }

//     //upload hình
//     const uploadMedia = async () => {
//         setUploading(true);
//         try{
//             const {uri} = await FileSystem.getInfoAsync(image);
//             const blob = await new Promise((resolve,reject) => {
//                 const xhr = new XMLHttpRequest();
//                 xhr.onload = () => {
//                     resolve(xhr.response);
//                 };
//                 xhr.onerror = (e) => {
//                     reject(new TypeError('Network request failed'));
//                 }
//                 xhr.responseType = 'blob';
//                 xhr.open('GET',uri,true);
//                 xhr.send(null);
//             })
//             const filename = image.substring(image.lastIndexOf('/') + 1);
//             const ref = firebase.storage().ref().child(filename);
    
//             await ref.put(blob);
//             const url = await ref.getDownloadURL()
//             setUploading(false);
//             Alert.alert('Photo Uploaded!!');
//             setHinhCMND(url);
//             uploadMedia1();
//             setImage(null);
//             console.log(HinhCMND);
//             // console.log(postData);
//             PostKhachHang();
//         }catch(error){
//             console.error(error);
//             setUploading(false);
//         }
//     }

//     //Upload BangLai
//     const uploadMedia1 = async () => {
//         setUploading(true);
//         try{
//             const {uri} = await FileSystem.getInfoAsync(imageBangLai);
//             const blob = await new Promise((resolve,reject) => {
//                 const xhr = new XMLHttpRequest();
//                 xhr.onload = () => {
//                     resolve(xhr.response);
//                 };
//                 xhr.onerror = (e) => {
//                     reject(new TypeError('Network request failed'));
//                 }
//                 xhr.responseType = 'blob';
//                 xhr.open('GET',uri,true);
//                 xhr.send(null);
//             })
//             const filename = imageBangLai.substring(imageBangLai.lastIndexOf('/') + 1);
//             const ref = firebase.storage().ref().child(filename);
    
//             await ref.put(blob);
//             const url = await ref.getDownloadURL()
//             setUploading(false);
//             // Alert.alert('Photo Uploaded!!');
//             setHinhBangLai(url);
//             setimageBangLai(null);
//             console.log(HinhBangLai);
//             // console.log(postData);
//             // PostKhachHang();
//         }catch(error){
//             console.error(error);
//             setUploading(false);
//         }
//     }

//     return(
//         <ScrollView>
//             <View style={styles.container}>
//                 <Text style={styles.title}>Tên: </Text>
//                 <TextInput style={styles.input} onChangeText={setTenKH} value={TenKH}></TextInput>
//                 <View style={styles.ngayTra}>
//                     <Text style={{marginHorizontal:20,marginVertical:10}}>Ngày sinh: </Text>
//                     <View style={styles.dateContainer}>
//                         <TouchableOpacity style={styles.dateBtn} onPress={showMode}><AntDesign name="calendar" size={24} color="black" /></TouchableOpacity>
//                         <TextInput style={styles.Input} value={moment(NgaySinh).format('DD/MM/yyyy').toString()} />
//                     </View>
//                 </View>
//                 <Text style={styles.title}>Đia chi: </Text>
//                 <TextInput style={styles.input} onChangeText={setDiaChi} value={DiaChi} ></TextInput>
//                 <Text style={styles.title}>Số điện thoại: </Text>
//                 <TextInput style={styles.input} onChangeText={setSDT} value={SoDienThoai}></TextInput>
//                 <Text style={styles.title}>CMND: </Text>
//                 <TextInput style={styles.input} onChangeText={setCMND} value={CMND}></TextInput>
//                 <Text style={styles.title}>Bằng lái: </Text>
//                 <TextInput style={styles.input} onChangeText={setBL} value={BangLai}></TextInput>

//                 {show&&(
//                         <DateTimePicker
//                         testID="dateTimePicker"
//                         value={NgaySinh}
//                         mode='date'
//                         display="default"
//                         onChange={onChange}
//                     />)}
                
//                 <View style={styles.Cccd} onStartShouldSetResponder={pickImage}>
//                         <Text style={{alignSelf:'center',margin:10}}>Bấm vào đây chọn hình Căn cước công dân</Text>
//                         {
//                             image && <Image
//                             source={{uri:image}}
//                             style={styles.hinhCCCD}
//                             />
//                         }
//                     </View>

//                     <View style={styles.Cccd} onStartShouldSetResponder={pickImageBangLai}>
//                         <Text style={{alignSelf:'center',margin:10}}>Bấm vào đây chọn hình bằng lái</Text>
//                         {
//                             imageBangLai && <Image
//                             source={{uri:imageBangLai}}
//                             style={styles.hinhCCCD}
//                             />
//                         }
//                     </View>


//                 {loading?(
//                 <ActivityIndicator />
//             ):(
//                 <TouchableOpacity style={styles.btn} onPress={uploadMedia}><Text style={{color:'white'}}>Thêm</Text></TouchableOpacity>
//             )}
//             </View>
//         </ScrollView>
        
//     )
// }

// const styles=StyleSheet.create({
//     Input:{
//         backgroundColor:'white',
//         width:'100%',
//         borderWidth:1,
//         paddingLeft:40
//     },
//     dateContainer:{
//         display:'flex',
//         flexDirection:'row',
//         position:'relative',
//         marginHorizontal:16,
//         borderRadius: 5,
//     },
//     dateBtn:{
//         width:'10%',
//         position:'absolute',
//         zIndex:6,
//         height:'99%',
//         borderWidth:1
//     },
//     inputItem:{
//         width:'100%',
//         marginLeft:65,
//         margin:10,
//     },
//     input:{
//         backgroundColor:'white',
//         height:40,
//         borderRadius:5,   
//         padding:10,
//         marginHorizontal:16,
//         marginVertical:10,    
//     },

//     title:{
//         left:20,
//     },
//     container:{
//         display:"flex",
//         width:'100%'
//     },
//     btn:{
//         backgroundColor:'#FF6630',
//         padding:10,
//         marginTop:10,
//         width:100,
//         alignItems:"center",
//         justifyContent:"center",
//         borderRadius:5,
//         alignSelf:"center",
//     },
//     Cccd:{
//         alignSelf:'center'
//     },
//     hinhCCCD:{
//         width:200,
//         height:150,
//         alignSelf:'center'
//     },
// })