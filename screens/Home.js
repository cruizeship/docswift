import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
import {
    StyleSheet,
    Text,
    Modal,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import Camera from "../screens/Camera";
import Gallery from "../screens/Gallery";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
    const [isCameraPageOpen, setIsCameraPageOpen] = useState(false);
    const [isGalleryPageOpen, setIsGalleryPageOpen] = useState(false);
    const [isFilesPageOpen, setIsFilesPageOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cameraMemo = useMemo(() => {
        return (
            <Camera
                onRequestClose={() => setIsCameraPageOpen(false)}
            />
        );
    });
    const galleryMemo = useMemo(() => {
        return (
            <Gallery
                onRequestClose={() => setIsGalleryPageOpen(false)}
            />
        );
    });
    const menuMemo = useMemo(() => {
        return (
            <View style={{height: 100, backgroundColor: 'green', opacity: '100%'}}>
                <Text>stuff here</Text>
            </View>
        );
    });

    return (
        <View style={styles.container}>
            {/*
            <View style={{ flex: 2, backgroundColor: 'white' }} />
            <View style={[styles.buttonContainer, { flex: 5, paddingBottom: 25 }]}>
                <View style={[styles.insideButtonContainer, { flex: 1 }]}>
                <TouchableOpacity style={[styles.tempContainer, { flex: 1}]}
                    onPress={() => setIsCameraPageOpen(!isCameraPageOpen)}
                    >
                        <Text>Scan New Document</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.buttonContainer, { flex: 5, paddingTop: 25 }]}>
                <View style={[styles.insideButtonContainer, { flex: 1 }]}>
                <TouchableOpacity style={[styles.tempContainer, { flex: 1}]}
                    onPress={() => setIsGalleryPageOpen(!isGalleryPageOpen)}
                    >
                        <Text>Choose from Gallery</Text>
                    </TouchableOpacity>
                </View>
            </View>*/}
            <View style={[styles.menuContainer, { flex: 12, backgroundColor: 'lightblue' }]} />
            <View style={[styles.menuContainer, { flex: 3 }]}>
                <TouchableOpacity style={[styles.circle, { position: 'absolute', zIndex: 2000 }]}
                    onPress={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Text>Plus Icon Here</Text>
                </TouchableOpacity>
                <View style={{backgroundColor: 'white', height: '100%', flex: 2 }} />
                <View style={{backgroundColor: 'blue', height: '100%', flex: 3 }} />
            </View>
            {isCameraPageOpen && (
                <Modal animationType="slide">{cameraMemo}</Modal>
            )}
            {isGalleryPageOpen && (
                <Modal animationType="slide">{galleryMemo}</Modal>
            )}
            {isMenuOpen && (
                <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                    <View style={{flex: 1, width: '100%' }} />
                    <View style={{flex: 1, width: '100%' }}>
                        <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => {
                            setIsCameraPageOpen(true)
                            setIsMenuOpen(false)
                        }}
                        >
                            <Text>Take Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => {
                            setIsGalleryPageOpen(true)
                            setIsMenuOpen(false)
                        }}
                        >
                            <Text>Choose from photos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => {
                            setIsFilesPageOpen(true)
                            setIsMenuOpen(false)
                        }}
                        >
                            <Text>Choose from files</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: '20%', width: '100%' }}>
                    <TouchableOpacity style={[styles.circle, { position: 'absolute', zIndex: 2000 }]}
                    onPress={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Text>Cancel Icon Here</Text>
                </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, 
        backgroundColor: 'lightblue', 
        margin: '10%', 
        marginTop: 0, 
        marginBottom: '5%', 
        borderRadius: 15,
    },
    menuContainer: {
        width: '100%',
    },
    circle: {
        height: '90%',
        borderRadius: 100000,
        backgroundColor: 'red',
        aspectRatio: '1/1',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    blurOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
    },
})
