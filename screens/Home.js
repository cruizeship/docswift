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
} from 'react-native';
import Camera from "../screens/Camera";
import Gallery from "../screens/Gallery";
import Analysis from "../screens/Analysis";
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';

export default function Home() {
    const [isCameraPageOpen, setIsCameraPageOpen] = useState(false);
    const [isGalleryPageOpen, setIsGalleryPageOpen] = useState(false);
    const [isAnalysisPageOpen, setIsAnalysisPageOpen] = useState(false);
    const [isFilesPageOpen, setIsFilesPageOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [imageLst, setImageLst] = useState([]);

    const cameraMemo = useMemo(() => {
        return (
            <Camera
                onRequestClose={() => setIsCameraPageOpen(false)}
                openAnalysis={(images) => {
                    if (images != null && images.length != 0) {
                        setIsCameraPageOpen(false)
                        setIsAnalysisPageOpen(true)
                        setImageLst(images)
                    } else {
                        alert('No Scans to Analyze')
                    }
                }}
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
    const analysisMemo = useMemo(() => {
        return (
            <Analysis
                onRequestClose={() => setIsAnalysisPageOpen(false)}
                images={imageLst}
            />
        );
    });
    const menuMemo = useMemo(() => {
        return (
            <View style={styles.menuContainer}>
                <TouchableOpacity style={{height: '100%', width: '100%'}}
                onPress={() => {
                    setIsMenuOpen(false)
                }}
                >
                <View style={{flex: 5, width: '100%' }} />
                <View style={{flex: 4, width: '100%' }}>
                    <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'rgb(59, 86, 162)', flexDirection: 'row'}]}
                    onPress={() => {
                        setIsCameraPageOpen(true)
                        setIsMenuOpen(false)
                    }}
                    >
                        <Icon name="camera" size={25} color="white" style={{width: '80%', position: 'absolute' }}/>
                        <Text style={{color: 'white', fontSize: 25, flex: 2, textAlign: 'center'}}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'rgb(0, 175, 255)'}]}
                    onPress={() => {
                        setIsGalleryPageOpen(true)
                        setIsMenuOpen(false)
                    }}
                    >
                        <Icon2 name="picture-o" size={25} color="white" style={{width: '80%', position: 'absolute' }}/>
                        <Text style={{color: 'white', fontSize: 25}}>Photos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'rgb(99, 107, 124)'}]}
                    onPress={() => {
                        setIsFilesPageOpen(true)
                        setIsMenuOpen(false)
                    }}
                    >
                        <Icon name="file" size={25} color="white" style={{width: '80%', position: 'absolute' }}/>
                        <Text style={{color: 'white', fontSize: 25}}>Import files</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: '15%', width: '100%' }}>
                    <TouchableOpacity style={[styles.circle, { position: 'absolute', zIndex: 2000, backgroundColor: 'rgb(179, 179, 179)' }]}
                    onPress={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Icon name="x" size={50} color="white" />
                    </TouchableOpacity>
                </View>
                </TouchableOpacity>
            </View>
        );
    });

    return (
        <View style={styles.container}>
            <View style={[styles.middleContainer, { height: '85%' }]} />
            <View style={[styles.bottomContainer, { height: '15%' }]}>
                <TouchableOpacity style={[styles.circle, { position: 'absolute', zIndex: 2000, backgroundColor: 'rgb(76, 193, 255)' }]}
                    onPress={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Icon name="plus" size={50} color="white" />
                </TouchableOpacity>
                <View style={{backgroundColor: 'rgb(0, 31, 80)', height: '100%', flex: 1 }} />
                <View style={{backgroundColor: 'rgb(67, 82, 105 )', height: '100%', flex: 3, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
            </View>
            {isCameraPageOpen && (
                <Modal animationType="slide">{cameraMemo}</Modal>
            )}
            {isGalleryPageOpen && (
                <Modal animationType="slide">{galleryMemo}</Modal>
            )}
            {isAnalysisPageOpen && (
                <Modal animationType="slide">{analysisMemo}</Modal>
            )}
            {isMenuOpen && (
                <Modal animationType="fade" transparent={true}>{menuMemo}</Modal>
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
        margin: '10%', 
        marginTop: 0, 
        marginBottom: '5%', 
        borderRadius: 15,
    },
    menuContainer: {
        height: '100%', 
        width: '100%', 
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    circle: {
        height: '80%',
        borderRadius: 100000,
        aspectRatio: '1/1',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleContainer: {
        backgroundColor: 'rgb(0, 31, 80)',
    },
    bottomContainer: {
        backgroundColor: 'rgb(0, 31, 80)'
    },
})
