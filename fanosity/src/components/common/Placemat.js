import React from 'react';
import { View } from 'react-native';


const Placemat = (props) => {
    return(
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
};
const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        backgroundColor: '#111',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 5,
        borderColor: '#222',
        position: 'relative'
    }
};

export {Placemat};