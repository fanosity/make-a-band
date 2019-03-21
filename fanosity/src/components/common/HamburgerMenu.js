import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { View, Text } from 'react-native';


class HamburgerMenu extends Component{

    render () {
    const state = this.props.navigationState
    const children = state.children
    return (
      <Drawer
        ref='navigation'
        type='static'
        open={state.open}
        acceptPan
        onOpen={() => NavigationActions.refresh({key: state.key, open: true})}
        onClose={() => NavigationActions.refresh({key: state.key, open: false})}
        content={<DrawerContent />}
        styles={Styles}
        captureGestures
        tapToClose
        openDrawerOffset={100}
        panCloseMask={0.8}
        panThreshold={150}
        negotiatePan
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    )
  }
}

const styles = {
  container: {
    padding: 20,
    flex: 1
  }
};

export default HamburgerMenu;


// ref={(ref) => this._drawer = ref}
//             type="static"
//             open={true}
//             content={ <ControlPanel closeDrawer={this.closeDrawer} /> }
//             acceptDoubleTap
//             styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
//             onOpen={() => {
//                 console.log('onopen')
//                 this.setState({drawerOpen: true})
//                 }}
//             onClose={() => {
//             console.log('onclose')
//             this.setState({drawerOpen: false})
//             }}
//             captureGestures={false}
//             tweenDuration={100}
//             panThreshold={0.08}
//             disabled={this.state.drawerDisabled}
//             openDrawerOffset={(viewport) => { return 100 }}
//             closedDrawerOffset={() => 50}
//             panOpenMask={0.2}
//             negotiatePan>
//                 <Main />