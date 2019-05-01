import React from 'react';
import { Text, View, ViewPropTypes, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BaseView } from './common';
import guardian from '../lib/AuthGuard';


class DrawerContent extends React.Component {

  EventListClicked(){
    Actions.reset('login');
    // TODO: log user out
  }

  EventHomeClicked(){
    Actions.popTo('homeView');
  }

  onLogout = () => {
      guardian.logout();
  };

  render() {
    return (
      <BaseView baseViewStyle={{backgroundColor: '#293441', flexDirection: 'column', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column'}}>
          <View >
            <Image style={{ height: 100, width: 250}} source={require('../image/fanosity_banner.png')} />
          </View>
          <View >
              <Text style={styles.headerTextStyle}>Event</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Image style={styles.iconStyle} source={require('../image/event_list_icon.png')} />
            <TouchableOpacity style={styles.buttonStyle} onPress={this.EventListClicked.bind(this)} >
                <Text style={styles.textStyle}>Event List</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image style={styles.iconStyle} source={require('../image/event_home_icon.png')} />
            <TouchableOpacity style={styles.buttonStyle} onPress={this.EventHomeClicked.bind(this)} >
                <Text style={styles.textStyle}>Event Home</Text>
            </TouchableOpacity>
          </View>

            <View style={{flexDirection: 'row'}}>
                <Image style={styles.iconStyle} source={require('../image/event_home_icon.png')} />
                <TouchableOpacity style={styles.buttonStyle} onPress={this.onLogout} >
                    <Text style={styles.textStyle}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
      </BaseView>
    );
  }
}

const styles = {
  headerTextStyle:{
        alignSelf: 'flex-start',
        color: '#fff',
        fontSize: 28,
        fontWeight: '200',
        paddingLeft: 8,
        paddingTop: 30,
        paddingBottom: 10
  },
  textStyle:{
        alignSelf: 'flex-start',
        color: '#fff',
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle:{
        alignSelf: 'stretch',
        marginLeft: 0,
        marginRight: 0,
        justifyContent: 'center',
        activeOpacity: .1,
        alignItems: 'center'
    },
    iconStyle:{
        alignSelf:'center',
        height: 35,
        width: 35,
        paddingLeft: 10
    }
};


export default DrawerContent;
