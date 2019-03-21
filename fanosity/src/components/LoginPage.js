import React, { Component } from 'react';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { BaseView, Placemat, Button } from './common';


class LoginPage extends Component{

    onLoginPress(){
        this.props.loginUser();
    }

    render(){
        const { backdrop } = styles;
        return(
            <BaseView>
                <Placemat style={{padding: 0}}>
                    <TouchableOpacity style={backdrop} onPress={this.onLoginPress.bind(this)}>
                        <ImageBackground style={{flex: 1, resizeMode: "stretch", height: 120}} source={require('../image/mab_banner.png')} />
                    </TouchableOpacity>
                    
                </Placemat>
            </BaseView>

        );
    }
}

const styles = {
    backdrop: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        height: 160
    }
};

export default connect(null, { loginUser })(LoginPage);