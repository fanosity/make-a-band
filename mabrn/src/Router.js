import React from 'react';
import HomeView from './components/HomeView';
import LoginPage from './components/LoginPage';
import ListItems from './components/ListItems';
import { Header} from './components/common';
import { Scene, Router, Actions } from 'react-native-router-flux';




const RouterComponent = () => {


    return (
        <Router>
            {/* Our root (parent) scene */}
            <Scene key="root" hideNavBar>
                <Scene key='auth' titleStyle={{ alignSelf: 'center', flex: 1, textAlign: 'center' }} >
                    <Scene key='login' component={LoginPage} title="Select Event" navigationBarStyle={styles.navBarStyle} initial />
                </Scene>
                <Scene key="main" titleStyle={{ alignSelf: 'center', flex: 1, textAlign: 'center' }} navigationBarStyle={styles.navBarStyle} title="Make A Band 2019" >
                    {/* place in renderBackButton={()=>{}} so Actions.main({onBack: () => {...}}) will work. */}
                    <Scene key="homeView" component={HomeView} initial />
                    <Scene key="listData" component={ListItems} />
                </Scene>
            </Scene>
        </Router>
    );
};

const styles = {
    textStyle: {
        fontSize: 20
    },
    navBarStyle:{
        backgroundColor: '#3d819f',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.3,
        elevation: 2,
        position: 'relative'
    }
};


export default RouterComponent;