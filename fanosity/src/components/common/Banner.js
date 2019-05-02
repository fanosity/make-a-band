import React from 'react';
import {View, TouchableWithoutFeedback, ImageBackground, Text} from 'react-native';

const Banner = ({title, desc, onPress, image}) =>{

    const { titleStyle, descStyle, dataContainerStyle, backdrop } = styles;

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View >
                <ImageBackground source={image} style={backdrop}>
                    <View style={{paddingTop: 80}} >
                        <View style={dataContainerStyle}>

                            <Text style = {titleStyle}>
                                {title}
                            </Text>

                            <Text style={descStyle}>
                                {desc}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = {
    titleStyle: {
        fontSize: 22,
        paddingLeft: 8,
        paddingRight:8,
        color: '#ffffff'
    },
    descStyle:{
        fontSize: 17,
        fontWeight: 'bold',
        paddingLeft: 8,
        paddingRight:8,
        paddingBottom: 5,
        color: '#ddd'
    },
    backdrop: {
        flex:1,
        flexDirection: 'column',
        width: '100%',
        height: 160
    },
    dataContainerStyle:{
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        width: 260,
        height: 80,
        position: 'relative',
        backgroundColor: 'rgba(10, 10, 15, 0.6)'
    }
};

export {Banner};
