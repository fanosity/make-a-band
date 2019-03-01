import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const NowPlayingBottomBar = ({ children, bandName }) => {

    const { headerTextStyle, bandNameTextStyle, containerStyle } = styles;
    return(
        <View style={containerStyle}>
            <Text style={headerTextStyle}>
                {children}
            </Text>
            <Text style={bandNameTextStyle}>
                {bandName}
            </Text>
        </View>
    );
};

const styles = {
    headerTextStyle:{
        fontSize: 18,
        justifyContent: 'flex-start',
        color:'#ddd'

    },
    bandNameTextStyle:{
        fontSize: 18,
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        color:'#ddd'
    },
    containerStyle:{
        justifyContent: 'center',
        flex:1,
        height: 80,
        bottom:0,
        position: 'relative',
        backgroundColor: 'rgba(10, 10, 15, 0.9)'
    }
};


export { NowPlayingBottomBar };