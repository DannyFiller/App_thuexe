import * as React from "react";
import { Text, TextInput, TouchableOpacity, View ,StyleSheet} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
 
const DangKy = ({navigation}) => {
  const { isLoaded, signUp, setActive } = useSignUp();
 
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
 
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
      console.error(JSON.stringify(err, null, 2));
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
 
      await setActive({ session: completeSignUp.createdSessionId });
      navigation.navigate('Tab');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
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
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
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