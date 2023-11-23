
import React, { useState } from 'react';
import {Colors,} from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity,Button, SafeAreaView,ScrollView, StatusBar, StyleSheet, Text,useColorScheme, View,TextInput,Image, TouchableOpacityBase,} from 'react-native';
import {useSignIn } from "@clerk/clerk-expo";
import axios from 'axios';


const DangNhap = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tkkh,settkkh]=useState();
  const [tknv,settknv]=useState();
  const checkQuyen=async ()=>{
    try{
      console.log(emailAddress);
      const req= await axios.get("https://api-thue-xe-5fum.vercel.app/TaiKhoan/GetTKKH/"+emailAddress);
      const req1= await axios.get("https://api-thue-xe-5fum.vercel.app/TaiKhoan/GetTKNV/"+emailAddress);
      if(req.data!=""){
        navigation.navigate('Tabkh');
      }
      if(req1.data!=""){
        navigation.navigate('Tab');
      }
      
    }catch(err){
      console.log(err);
    }

  }
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicaimport { StylisElement } from './../node_modules/@emotion/cache/dist/declarations/types/index.d';tes the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      checkQuyen();
    } catch (err) {
      alert(err.errors[0].message);
      console.log(Lỗi);
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  

  function checkAccount(){
    // navigation.navigate('Tab');
  }

  return (
    
        <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}/>

        <Image style={styles.hinhanh} source={{uri:'https://t3.ftcdn.net/jpg/03/32/21/64/360_F_332216476_XNjFdgoLgaHjhc4qTIKwucqflDqygx03.jpg'}}/>

        <View style={styles.InputContainer}>
          <TextInput  autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)} style={styles.Input}>
          </TextInput>

          <TextInput 
          value={password}
          autoCapitalize="none"
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)} style={styles.Input}>
          </TextInput>
        </View>

        <TouchableOpacity title='Sign In' onPress={onSignInPress} style={styles.btnLogin}>
        <Text>Sign in</Text>
      </TouchableOpacity>
      <View style={styles.btnDangKy}>
        <Text onPress={()=>{navigation.navigate('Đăng Ký')}}>Đăng ký</Text>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
  },
  InputContainer:{

  },
  Input:{
    marginHorizontal:10,
    marginVertical:4,
    height:50,
    borderWidth:1,
    borderColor:"#6c47ff",
    borderRadius:4,
    padding:10,
    backgroundColor:'#fff'
  },
  btnLogin:{
    alignSelf: "center",
    marginTop:8,
    paddingVertical: 10,
    paddingHorizontal:16,
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'#fff'
  },
  btnDangKy:{
    marginTop:8,
    alignSelf:'center',
  },
  hinhanh:{
    marginBottom:10,
    width:200,
    height:100, 
    borderRadius:10,
    alignSelf:'center'
  }
});

export default DangNhap;
