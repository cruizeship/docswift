import React from 'react'
import {
    StyleSheet,
    Text,
    Modal,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'

export default function Gallery(props) {
    const { onRequestClose } = props;

    return (
        <View style={styles.container}>
            <View style={[styles.tempContainer, { flex: 6, backgroundColor: 'lightblue' }]}>
                <Text>Gallery Here</Text>
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
})
