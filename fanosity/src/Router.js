import React, { Component } from "react";
import { Scene, Router, Stack, Drawer } from "react-native-router-flux";
import HomeView from "./components/HomeView";
import LoginPage from "./components/LoginPage";
import ListItems from "./components/ListItems";
import BandsList from "./components/BandsList";
import ArtistsList from "./components/ArtistsList";
import SponsorsList from "./components/SponsorsList";
import DrawerContent from "./components/DrawerContent";
import ScanBallot from "./components/ScanBallot";
import MenuIcon from "./image/hamburger_menu.png";

class RouterComponent extends Component {
    stateHandler = (prevState, newState, action) => {
        console.log("onStateChange: ACTION:", action);
    };

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
                                key="login"
                                component={ScanBallot}
                                initial
                                title="Select Event"
                                navigationBarStyle={styles.navBarStyle}
                            />
                        </Stack>

                        <Stack
                            key="main"
                            titleStyle={{ alignSelf: "center", flex: 1, textAlign: "center" }}
                            navigationBarStyle={styles.navBarStyle}
                            title="Make A Band 2019"
                        >
                            {/* place in renderBackButton={()=>{}} so Actions.main({onBack: () => {...}}) will work. */}
                            <Scene key="homeView" component={HomeView} initial />
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
