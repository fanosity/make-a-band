import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from 'react-native-router-flux';
import { BaseView } from './common';
import { guardian } from '../lib/AuthGuard';


export default class LoginWithQrCode extends Component {
    scannedQrCode = (e) => {
        console.log(`Scan`, e.data);
        guardian.loginBallotQrCode(e.data)
            .then(() => {
                Actions.main();
            })
            .catch((err) => console.log(err))
    };

    testWithSample = () => {
        this.scannedQrCode({ data: 'event_2015_bend-make-a-band_264269456487494654_7d5c5f0a28feb98b' });
    };

    render() {
        return (
            <BaseView>
                <QRCodeScanner
                    showMarker
                    onRead={this.scannedQrCode}
                    topContent={
                        <Text style={styles.centerText}>
                           Scan your Fanosity Ballot
                        </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable} onPress={this.testWithSample}>
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
        fontSize: 30,
        padding: 32,
        color: '#777',
        textAlign: 'center'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: '#e1e1e1'
    },
    buttonTouchable: {
        padding: 16,
        backgroundColor: '#5c74ff'
    }
});
