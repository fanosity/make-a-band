import React, { Component } from 'react';
import HomeView from './components/HomeView';
import LoginPage from './components/LoginPage';
import ListItems from './components/ListItems';
import { Header } from './components/common';
import HamburgerMenu from './components/common/HamburgerMenu';
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Scene, Router, Actions, Route, Schema, Stack, Drawer } from 'react-native-router-flux';
import MenuIcon from './image/hamburger_menu.png';
import DrawerContent from './components/DrawerContent';


class RouterComponent extends Component {

    stateHandler = (prevState, newState, action) => {
        console.log('onStateChange: ACTION:', action);
    }

    render(){
        return (
            <Router onStateChange={this.stateHandler} >
            <Stack key="root" titleStyle={{ alignSelf: 'center' }} hideNavBar>
                    <Drawer key="drawer" hideNavBar contentComponent={DrawerContent} drawerImage={MenuIcon} drawerWidth={250} drawerPosition="right">
                        <Stack key='auth' titleStyle={{ alignSelf: 'center', flex: 1, textAlign: 'center' }} >
                            <Scene key='login' component={LoginPage} initial title="Select Event" navigationBarStyle={styles.navBarStyle} />
                        </Stack>

                        <Stack key="main" titleStyle={{ alignSelf: 'center', flex: 1, textAlign: 'center' }} navigationBarStyle={styles.navBarStyle} title="Make A Band 2019" >
                            {/* place in renderBackButton={()=>{}} so Actions.main({onBack: () => {...}}) will work. */}
                            <Scene key="homeView" component={HomeView} initial />
                            <Scene key="listData" component={ListItems} />
                        </Stack>
                    </Drawer>
            </Stack>
        </Router>
        );
    }
}
                 


const styles = {
    textStyle: {
        fontSize: 20
    },
    navBarStyle:{
        backgroundColor: '#3d819f',
        height: 50,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.3,
        elevation: 2
    }
};

export default RouterComponent;