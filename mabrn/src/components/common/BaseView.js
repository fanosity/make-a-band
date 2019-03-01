import React from 'react';
import {View} from 'react-native';

const BaseView = ({children, baseViewStyle}) =>{
    return (
        <View style={[styles.containerStyle, baseViewStyle]}>
            {children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#111',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        flex: 1
    }
};

export {BaseView};
