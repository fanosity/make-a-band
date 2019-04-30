import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { BaseView, Placemat } from './common';

class ScanScreen extends Component {
    onSuccess(e) {
        console.log(`Scan`, e.data);
    }



    render() {
        return (
            <BaseView>
                <QRCodeScanner
                    showMarker
                    onRead={this.onSuccess.bind(this)}
                    topContent={
                        <Text style={styles.centerText}>
                           Scan your Fanosity Ballot
                        </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                />
            </BaseView>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16,
        backgroundColor: 'red'
    }
});

export default ScanScreen;
