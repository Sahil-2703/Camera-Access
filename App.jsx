import {
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

export default function App() {
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [image, setimage] = useState('');
  const [takePhotoClicked, setTakePhotoClicked] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    // const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission);
  };
  if (device === null) return <ActivityIndicator />;

  const takePicture = async () => {
    if (camera != null) {
      const photo = await camera.current.takePhoto({
        flash: 'on',
      });
      setimage(photo.path);
      setTakePhotoClicked(false)
    }
  };
  return (
    <View style={{flex: 1}}>
      {takePhotoClicked ? (
        <View style={{flex: 1}}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo
          />
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#FF0037',
              position: 'absolute',
              bottom: 50,
              alignSelf: 'center',
            }}
            onPress={() => {
              takePicture();
            }}></TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {image !== '' && (<Image source={{uri:'file://'+image}} style={{width:'90%', height:200}}/>)}
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius:10,
              justifyContent: 'center',
              alignItems:'center'
            }}
            onPress={()=>{
                setTakePhotoClicked(true)
            }}>
                <Text>Click Photo</Text>
            </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
