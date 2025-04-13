import { View, Button, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setImageUri, clearImage } from '../slices/imageSlice';
import { RootState } from '../store';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen() {
  const imageUri = useSelector((state: RootState) => state.image.uri);
  const dispatch = useDispatch();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      dispatch(setImageUri(result.assets[0].uri));
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera permission is needed.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      dispatch(setImageUri(result.assets[0].uri));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <Button title="Chụp ảnh" onPress={takePhoto} />
      <Button title="Chọn ảnh từ thư viện" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }}
        />
      )}
    </View>
  );
}
