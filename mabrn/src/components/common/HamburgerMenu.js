import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { View, Text } from 'react-native';


class HamburgerMenu extends Component{

    render(){
        return (
            <Drawer ref={c => this.drawer = c} /** Assigning a drawer object into the class. Keep in mind! */
              type="overlay"
              tapToClose
              openDrawerOffset={0.2}
              panCloseMask={0.2}
              closedDrawerOffset={-3}
              styles={drawerStyles}
              tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
            />
        );
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