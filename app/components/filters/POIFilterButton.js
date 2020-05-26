import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: 130,
        aspectRatio: 1,
    },
    icon: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        marginVertical: 2,
    },
    content: {
        textAlign: 'center',
        color: 'black',
    },
    button: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'white',
        flex: 1,
        aspectRatio: 1,
        justifyContent: 'center',
    },
    selected: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'blue'
    }
});

const POIFilterButton = (props) => {
    const getFilterIcon = () => {
        switch (props.type) {
            case 'art':
                return require('../../assets/poi_filters/art.png')
            case 'outdoor':
                return require('../../assets/poi_filters/outdoors.png')
            case 'nightlife':
                return require('../../assets/poi_filters/nightlife.png')
            case 'event':
                return require('../../assets/poi_filters/event.png')
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => props.toggle()}>
                <Image
                    source={getFilterIcon()}
                    style={props.selected ?
                        [styles.icon, styles.selected] :
                        styles.icon
                    }
                />
                <Text style={styles.content}>{props.content}</Text>
            </TouchableOpacity>
        </View>
    )
};

export default POIFilterButton;
