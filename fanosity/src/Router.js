import React, { Component } from "react";
import { Scene, Router, Stack, Drawer, Actions } from "react-native-router-flux";
import HomeView from "./components/HomeView";
import ListItems from "./components/ListItems";
import BandsList from "./components/BandsList";
import ArtistsList from "./components/ArtistsList";
import SponsorsList from "./components/SponsorsList";
import DrawerContent from "./components/DrawerContent";
import MenuIcon from "./image/hamburger_menu.png";

import LoginWithQrCode from "./components/LoginWithQrCode";
import LoginWithAccount from "./components/LoginWithAccount";
import Entry from "./components/Entry";
import Events from "./components/Events";

import { guardian } from './lib/AuthGuard';

class RouterComponent extends Component {
    stateHandler = (prevState, newState, action) => {
        console.log("onStateChange: ACTION:", action);
    };

    componentDidMount() {
        if (guardian.isLoggedIn()) {
            Actions.main();
        }
    }

    render() {
        return (
            <Router onStateChange={this.stateHandler}>
                <Stack key="root" titleStyle={{ alignSelf: "center" }} hideNavBar>
                    <Drawer
                        key="drawer"
                        hideNavBar
                        contentComponent={DrawerContent}
                        drawerImage={MenuIcon}
                        drawerWidth={250}
                        drawerPosition="right"
                    >
                        <Stack key="auth" titleStyle={{ alignSelf: "center", flex: 1, textAlign: "center" }}>
                            <Scene
                                key="entry"
                                component={Entry}
                                initial
                                title="Welcome to Fanosity!"
                                navigationBarStyle={styles.navBarStyle}
                            />
                            <Scene
                                key="loginWithAccount"
                                component={LoginWithAccount}
                                title="Sign into Fanosity"
                                navigationBarStyle={styles.navBarStyle}
                            />
                            <Scene
                                key="loginWithBallotQrCode"
                                component={LoginWithQrCode}
                                title="Scan Event Ballot"
                                navigationBarStyle={styles.navBarStyle}
                            />
                        </Stack>

                        <Stack
                            key="main"
                            titleStyle={{ alignSelf: "center", flex: 1, textAlign: "center" }}
                            navigationBarStyle={styles.navBarStyle}
                            title="Make A Band 2019"
                        >

                            <Scene key="events" component={Events} initial />

                            {/* place in renderBackButton={()=>{}} so Actions.main({onBack: () => {...}}) will work. */}
                            <Scene key="homeView" component={HomeView} />
                            <Scene key="listData" component={ListItems} />
                            <Scene key="bandsView" component={BandsList} title="Bands" />
                            <Scene key="artistsView" component={ArtistsList} title="Artists" />
                            <Scene key="sponsorsView" component={SponsorsList} title="Sponsors" />
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
    navBarStyle: {
        backgroundColor: "#3d819f",
        height: 50,
        paddingTop: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 2
    }
};

export default RouterComponent;
