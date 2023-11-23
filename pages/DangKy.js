import * as React from "react";
import { Text, TextInput, TouchableOpacity, View ,StyleSheet} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import axios from "axios";
 
const DangKy = ({navigation}) => {
  const { isLoaded, signUp, setActive } = useSignUp();
 
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [ten,setTen] = React.useState("");
  const [vaitro, setVaiTro] = React.useState("");
  const [IDKH,setIDKH] = React.useState();
  const [IDNV,setIDNV] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  //tạo khách hàng
  const [TenKH,setTenKH]=React.useState();
  const [NgaySinh,setNgaySinh]=React.useState();
  const [DiaChi,setDiaChi]=React.useState();
  const [SoDienThoai,setSDT]=React.useState();
  const [BangLai,setBL]=React.useState();
  const [CMND,setCMND] = React.useState();
 
  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        emailAddress,
        password,
      });
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // change the UI to our pending section.
      setPendingVerification(true);
      
    } catch (err) {
      // console.error(JSON.stringify(err, null, 2));
      alert(err.errors[0].message);
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await PostKhachHang();
      await setActive({ session: completeSignUp.createdSessionId });
      navigation.navigate('Tab');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };


  

  const PostTaiKhoan = () =>{
    axios.post('https://api-thue-xe-5fum.vercel.app/TaiKhoan',postNguoiDung)
    .then(response => {
      // Xử lý kết quả từ API
      console.log(response.data);
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error(error);
    });
  }


  const postData={
    // IDKH: IDK  H,
    TenKH:TenKH,
    NgaySinh:NgaySinh,
    DiaChi:DiaChi,
    SoDienThoai:SoDienThoai,
    CMND:CMND,
    BangLai:BangLai,
  }
  const PostKhachHang=async()=>{  
    axios.post('https://api-thue-xe-5fum.vercel.app/KhachHang', postData)
      .then(response => {
        // Xử lý kết quả từ API
       timIDKH();
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.error(error);
      });

    const timIDKH = async() => {
      const req = await axios.get("https://api-thue-xe-5fum.vercel.app/KhachHang/getByCMND/"+CMND);
      console.log("id khach hang "+ req.data[0]._id);
      //Post tài khoản
          const postNguoiDung = {
            TenTaiKhoan : emailAddress,
            MatKhau : password,
            ChucVu: "Khách hàng",
            IDKH : req.data[0]._id,
          }
          axios.post('https://api-thue-xe-5fum.vercel.app/TaiKhoan',postNguoiDung)
            .then(response => {
              // Xử lý kết quả từ API
              console.log(response.data);
            })
            .catch(error => {
              // Xử lý lỗi nếu có
              console.error(error);
            });
         }
}


 
  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <View>
          <View>
            <TextInput style={styles.input}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>
 
          <View>
            <TextInput style={styles.input}
              value={password}
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View>
            <TextInput style={styles.input}
              value={TenKH}
              autoCapitalize="none"
              placeholder="Tên người dùng"
              onChangeText={(TenKH) => setTenKH(TenKH)}
            />
          </View>

          <View>
            <TextInput style={styles.input}
              value={NgaySinh}
              autoCapitalize="none"
              placeholder="Ngày Sinh"
              onChangeText={(NgaySinh) => setNgaySinh(NgaySinh)}
            />
          </View>

          <View>
            <TextInput style={styles.input}
              value={DiaChi}
              autoCapitalize="none"
              placeholder="Địa Chỉ"
              onChangeText={(DiaChi) => setDiaChi(DiaChi)}
            />
          </View>

          <View>
            <TextInput style={styles.input}
              value={SoDienThoai}
              autoCapitalize="none"
              placeholder="Số điện thoại"
              onChangeText={(SoDienThoai) => setSDT(SoDienThoai)}
            />
          </View>

          <View>
            <TextInput style={styles.input}
              value={CMND}
              autoCapitalize="none"
              placeholder="Tên CMND"
              onChangeText={(CMND) => setCMND(CMND)}/>
          </View>

          <View>
            <TextInput style={styles.input}
              value={BangLai}
              autoCapitalize="none"
              placeholder="Bằng lái"
              onChangeText={(BangLai) => setBL(BangLai)}/>
          </View>
          


 
          <TouchableOpacity onPress={onSignUpPress} style={styles.btnSignup}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput style={styles.input}
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify} style={styles.btnSignup}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
  },
  InputContainer:{

  },
  input:{
    marginHorizontal:10,
    marginVertical:4,
    height:50,
    borderWidth:1,
    borderColor:"#6c47ff",
    borderRadius:4,
    padding:10,
    backgroundColor:'#fff'
  },
  btn:{
    padding: 10,
  },
  btnSignup:{
    alignSelf: "center",
    padding: 16,
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'#fff'
  }
});

export default DangKy;