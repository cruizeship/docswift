import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    Modal,
    View,
    Image,
    TouchableOpacity,
    Button,
    ScrollView,
} from 'react-native'
import { Camera as Camera2 } from 'expo-camera';
import Icon from 'react-native-vector-icons/Feather';

export default function Camera(props) {
    const { onRequestClose, openAnalysis } = props;

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null)
    const [type, setType] = useState(Camera2.Constants.Type.back)
    const [images, setImages] = useState([]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isScansPageOpen, setIsScansPageOpen] = useState(false);

    const permisionFunction = async () => {
        const cameraPermission = await Camera2.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === 'granted');
    }

    useEffect(() => {
        permisionFunction();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImages([
                ...images, { image: data.uri, selected: false } // Put old items at the end
            ]);
        }
    }
    
    const popupMemo = useMemo(() => {
        var objIndex = images.findIndex((obj => obj.selected == true));
        if (objIndex != -1) {
            return (
                <View style={styles.popupContainer}>
                    <TouchableOpacity style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                        setIsPopupOpen(false)
                    }}
                    >
                        <Image source={{uri: images[objIndex].image}} style={{alignSelf: 'center', borderWidth: 4, borderRadius: 5, borderColor: '#007AFF', height: 'undefined', width: '90%', aspectRatio: '3/4'}}/>
                        <Text style={{marginTop: 10, color: 'white'}}>Tap Anywhere to Close</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.popupContainer}>
                    <TouchableOpacity style={{height: '100%', width: '100%'}}
                    onPress={() => {
                        setIsPopupOpen(false)
                    }}
                    >
                        
                    </TouchableOpacity>
                </View>
            );
        }
    });

    const selectImage = async (index) => {
        if (images[index].selected == true) {
            setIsPopupOpen(true)
        }
        var imagesCopy = [];
        images.forEach((element) => {
            element.selected = false;
            imagesCopy.push(element)
        });
        imagesCopy[index].selected = true;
        setImages(imagesCopy);
    }

    const deleteImage = async () => {
        var objIndex = images.findIndex((obj => obj.selected == true));
        if (objIndex == -1) {
            alert('No Scan Selected')
        }
        var imagesCopy = [];
        images.forEach((element) => {
            if (element.selected == false) {
                imagesCopy.push(element)
            }
        });
        setImages(imagesCopy);
    }

    if (hasCameraPermission === false) {
        return (
            <View style={styles.container}>
                <View style={[styles.noPermission, { flex: 4, width: '100%'}]}>
                    <Text>No access to camera</Text>
                </View>
                <View style={[styles.bottomContainer, { flex: 1 }]}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                onRequestClose();
                            }}
                        >
                            <Text style={{ color: '#007AFF', fontSize: 18}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={[styles.tempContainer, { flex: 8 }]}>
                <View style={{ flex: 4, width: '100%'}}>
                    <View style={styles.cameraContainer}>
                        <Camera2 
                        ref={ref => setCamera(ref)}
                        style={styles.camera} 
                        type={type} />
                    </View>
                    <TouchableOpacity
                    style={[styles.flipCameraButton]}
                    onPress={() => {
                    setType(
                        type === Camera2.Constants.Type.back
                        ? Camera2.Constants.Type.front
                        : Camera2.Constants.Type.back
                    );
                    }}>
                        <Icon name="refresh-cw" size={25} color="gray" style={{alignSelf: 'center' }}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.takePictureButton]} onPress={() => takePicture()}>
                        <Icon name="camera" size={35} color="gray" style={{alignSelf: 'center' }}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.middleContainer, {flex:1}]}>
                    {/*image != null && (<View><Image source={{uri: image}} style={{width: 50, flex:1}}/>
                    </View>)*/}
                    {images.length != null && images.length != 0 && (
                        <View style={{width: '100%', height: '100%'}}>
                            <View pointerEvents="none" style={{ zIndex: 100, position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'white'}}>Double Click Scan to Preview</Text>
                            </View>
                            <ScrollView style={{backgroundColor: 'lightgray', flex: 1, paddingLeft: 10, paddingRight: 10}} horizontal={true}>
                                <View style={{flex: 1}}></View>
                                <View style={styles.imagesContainer}>
                                    {images.map((image, index) => (
                                        <View key={index} style={[styles.image]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    selectImage(index);
                                                }}
                                            >
                                            {image.selected && <Image source={{uri: image.image}} style={{borderWidth: 4, borderRadius: 5, borderColor: '#007AFF', width: '100%', height: '100%'}}/>}
                                            {!image.selected && <Image source={{uri: image.image}} style={{ width: '100%', height: '100%'}}/>}
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                                <View style={{flex: 1}}></View>
                            </ScrollView>
                        </View>
                    )}
                    {images.length == null || images.length == 0 && (
                        <View style={{flex: 1, backgroundColor: 'lightgray', justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center', fontSize: 20}}>No Scans Selected</Text>
                        </View>
                    )}
                </View>
            </View>
            <View style={[styles.bottomContainer, { flex: 1 }]}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            onRequestClose();
                        }}
                    >
                        <Text style={{ color: '#007AFF', fontSize: 18}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity
                        onPress={() => {
                            deleteImage();
                        }}
                    >
                        <Icon name="trash-2" size={35} color="gray" style={{alignSelf: 'center'}}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            openAnalysis(images)
                        }}
                    >
                        <Text style={{ color: '#007AFF', fontSize: 18}}>Analyze</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isPopupOpen && (
                <Modal animationType="fade" transparent={true}>{popupMemo}</Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    bottomContainer: {
        flexDirection: 'row'
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    camera:{
        flex: 1,
    },
    flipCameraButton: {
        backgroundColor: 'white',
        position: 'absolute',
        height: '10%',
        aspectRatio: '1/1',
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        borderRadius: 10000,
        borderColor: 'gray',
        borderWidth: 3
    },
    takePictureButton: {
        backgroundColor: 'white',
        position: 'absolute',
        height: '15%',
        aspectRatio: '1/1',
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10000,
        borderColor: 'gray',
        borderWidth: 5
    },
    noPermission: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    middleContainer: {
        width: '100%',
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        borderWidth: 3, 
        borderColor: 'gray'
    },
    imagesContainer: {
        width: 'fit-content',
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
    },
    image: {
        marginRight: 10,
        height: '100%', 
        width: 'undefined',
        aspectRatio: '3/4',
    },
    popupContainer: {
        height: '100%', 
        width: '100%', 
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
})
