import React, { useState } from "react";
import { Image, View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../config';

export default CapNhatThongTinKhachHang = ({ navigation }) => {
  const [TenKH, setTenKH] = useState();
  const [NgaySinh, setNgaySinh] = useState();
  const [DiaChi, setDiaChi] = useState();
  const [SoDienThoai, setSDT] = useState();
  const [CMND, setCMND] = useState();
  const [BangLai, setBL] = useState();
  const [HinhCMND, setHinhCMND] = useState();
  const [HinhBangLai, setHinhBangLai] = useState();
  const [image, setImage] = useState(null);
  const [imageBangLai, setImageBangLai] = useState(null);
  const [uploading, setUploading] = useState(false);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#f4511e', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
    });
  }, [navigation]);

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  }

  const uploadMedia = async (image, setImg) => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        }
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);
      const url = await ref.getDownloadURL();
      setImg(url);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  const imagePickerButtonStyle = {
    backgroundColor: '#FF6630',
    padding: 7,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center', // Đổi giá trị này
  };

  const imagePickerButtonTextStyle = {
    color: 'white',
    fontSize: 16,
  };

  return (
<KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <Text>Tên</Text>
        <TextInput style={styles.input} onChangeText={setTenKH} value={TenKH}></TextInput>
        <Text>Ngày Sinh</Text>
        <TextInput style={styles.input} onChangeText={setNgaySinh} value={NgaySinh}></TextInput>
        <Text>Địa chỉ</Text>
        <TextInput style={styles.input} onChangeText={setDiaChi} value={DiaChi}></TextInput>
        <Text>Số Điện Thoại</Text>
        <TextInput style={styles.input} onChangeText={setSDT} value={SoDienThoai}></TextInput>
        <Text>CMND</Text>
        <TextInput style={styles.input} onChangeText={setCMND} value={CMND}></TextInput>
        <Text>Bằng Lái</Text>
        <TextInput style={styles.input} onChangeText={setBL} value={BangLai}></TextInput>

        {/* Nút chọn hình cho CMND */}
        <TouchableOpacity
          style={imagePickerButtonStyle}
          onPress={() => pickImage(setImage)}
        >
          <Text style={imagePickerButtonTextStyle}>Chọn Hình Căn Cước Công Dân</Text>
        </TouchableOpacity>
        {/* Hiển thị hình đã chọn */}
        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        </View>

        {/* Nút chọn hình cho Bằng lái */}
        <TouchableOpacity
          style={imagePickerButtonStyle}
          onPress={() => pickImage(setImageBangLai)}
        >
          <Text style={imagePickerButtonTextStyle}>Chọn Hình Bằng Lái</Text>
        </TouchableOpacity>
        {/* Hiển thị hình đã chọn */}
        <View style={styles.imageContainer}>
          {imageBangLai && <Image source={{ uri: imageBangLai }} style={styles.imagePreview} />}
        </View>

        {uploading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity style={styles.btnStyle} onPress={() => { uploadMedia(image, setHinhCMND); uploadMedia(imageBangLai, setHinhBangLai); }}>
            <Text style={styles.btnText}>Cập nhật</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    justifyContent: 'flex-start',
    alignItems: 'center',alignItems:'stretch'
    
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btnStyle: {
    backgroundColor: '#FF6630',
    padding: 12,
    marginTop: 7,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  imagePreview: {
    width: 200,
    height: 150,
borderRadius: 5,
    marginVertical: 10,
  },
});
