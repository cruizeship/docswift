import React from 'react'
import {
    StyleSheet,
    Text,
    Modal,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'

export default function Analysis(props) {
    const { onRequestClose, images } = props;

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

    return (
        <View style={styles.container}>
            <View style={{ flex: 8, width: '100%'}}>
                <View style={[styles.tempContainer, { flex: 4, backgroundColor: 'lightblue' }]}>
                    <Text>Analysis here</Text>
                </View>

                <View style={[styles.middleContainer, {flex:1}]}>
                    {images.length != null && images.length != 0 && (
                        <View style={{width: '100%', height: '100%'}}>
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
    bottomContainer: {
        flexDirection: 'row'
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
})
