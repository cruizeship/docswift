import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Modal,
    View,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native'
import { Camera as Camera2 } from 'expo-camera';

export default function Camera(props) {
    const { onRequestClose } = props;

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera2.Constants.Type.back);useEffect(() => {
    (async () => {
      const cameraStatus = await Camera2.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');})();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImage(data.uri);
        }
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={[styles.tempContainer, { flex: 6, backgroundColor: 'lightblue' }]}>
                <View style={{ flex: 1, width: '100%'}}>
                    <View style={styles.cameraContainer}>
                        <Camera2 
                        ref={ref => setCamera(ref)}
                        style={styles.fixedRatio} 
                        type={type}
                        ratio={'1:1'} />
                    </View>
                    <Button
                    title="Flip Image"
                    onPress={() => {
                    setType(
                        type === Camera2.Constants.Type.back
                        ? Camera2.Constants.Type.front
                        : Camera2.Constants.Type.back
                    );
                    }}></Button>
                    <Button title="Take Picture" onPress={() => takePicture()} />
                    {image && <Image source={{uri: image}} style={{flex:1}}/>}
                </View>
            </View>
            <View style={[styles.tempContainer, { flex: 1, backgroundColor: 'white' }]}>
                <TouchableOpacity
                    onPress={() => {
                        onRequestClose();
                    }}
                >
                    <Text style={{backgroundColor: 'lightblue', padding: 10}}>Click me to close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    tempContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio:{
        flex: 1,
    },
})
