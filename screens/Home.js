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

export default function Home() {
    const [isCameraPageOpen, setIsCameraPageOpen] = useState(false);
    const [isGalleryPageOpen, setIsGalleryPageOpen] = useState(false);

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

    return (
        <View
            style={styles.container}>
            <View style={{ flex: 1, backgroundColor: 'white' }} />
            <View style={[styles.buttonContainer, { flex: 3, backgroundColor: 'blue', paddingBottom: 5 }]}>
                <View style={{ flex: 1, backgroundColor: 'lightblue' }}>
                <TouchableOpacity style={[styles.tempContainer, { flex: 1}]}
                    onPress={() => setIsCameraPageOpen(!isCameraPageOpen)}
                    >
                        <Text>Open Camera</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.buttonContainer, { flex: 3, backgroundColor: 'blue', paddingTop: 5 }]}>
                <View style={{ flex: 1, backgroundColor: 'lightblue' }}>
                <TouchableOpacity style={[styles.tempContainer, { flex: 1}]}
                    onPress={() => setIsGalleryPageOpen(!isGalleryPageOpen)}
                    >
                        <Text>Open Gallery</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }} />
            {isCameraPageOpen && (
                <Modal animationType="slide">{cameraMemo}</Modal>
            )}
            {isGalleryPageOpen && (
                <Modal animationType="slide">{galleryMemo}</Modal>
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
        padding: 10,
    },
    tempContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
