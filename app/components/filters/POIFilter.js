import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import MainButton from '../MainButton';
import POIFilterButton from './POIFilterButton';

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 15,
        marginBottom: 5,
    },
    divider: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row'
    }
});

const POIFilter = (props) => {

    const handleApply = () => {
        props.setShow(false);
        props.update();
    }

    return (
        <View>
            <Text style={styles.title}>Filter</Text>
            <Divider style={styles.divider} />
            <View style={styles.container}>
                <View style={styles.row}>
                    <POIFilterButton style={styles.selected} type="art" content="Arts" toggle={props.toggleArt} selected={props.art} />
                    <POIFilterButton type="event" content="Events" toggle={props.toggleEvent} selected={props.event} />
                </View>
                <View style={styles.row}>
                    <POIFilterButton type="nightlife" content="Nightlife" toggle={props.toggleNightlife} selected={props.nightlife} />
                    <POIFilterButton type="outdoor" content="Outdoors" toggle={props.toggleOutdoor} selected={props.outdoor} />
                </View>
            </View>
            <View style={styles.button}>
                <MainButton text='Apply' widthRatio={0.7} handlePress={handleApply} />
            </View>
        </View >
    )
};

export default POIFilter;
