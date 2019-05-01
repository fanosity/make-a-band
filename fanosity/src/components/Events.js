import React, { Component } from 'react';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { BaseView, Placemat, Button } from './common';
import { Actions } from 'react-native-router-flux';


class Events extends Component{
    onEventSelect = () => {
        Actions.homeView();
    };

    render(){
        const { backdrop, eventImage } = styles;
        return(
            <BaseView>
                <Placemat style={{padding: 0}}>
                    <TouchableOpacity style={backdrop} onPress={this.onEventSelect}>
                        <ImageBackground style={eventImage} source={require('../image/mab_banner.png')} />
                    </TouchableOpacity>
                </Placemat>
            </BaseView>
        );
    }
}

const styles = {
    backdrop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        height: 160
    },
    eventImage: {
        flex: 1,
        resizeMode: 'stretch',
        height: 120
    }
};

export default connect(null, { loginUser })(Events);
