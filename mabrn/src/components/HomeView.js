import React, { Component } from 'react';
import { NowPlayingBottomBar, BaseView, Placemat, Button } from './common';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { currentBandFetch, fetchArtists, fetchBands } from '../actions';
import { Actions } from 'react-native-router-flux';


class HomeView extends Component{

    componentWillMount(){
        this.props.currentBandFetch();
        this.manageCurrentBand(this.props);
    }

    componentWillUpdate(){
        console.log("sds");
    }

    componentWillReceiveProps(nextProps){
        this.manageCurrentBand(nextProps);
    }

    manageCurrentBand( { currentBand }){
        this.currentBand = currentBand;
    }

    onBandsPressed(){
        this.props.fetchBands();
        Actions.listData({title: "Bands"});
    }

    onArtistsPressed(){
        this.props.fetchArtists();
        Actions.listData({title: "Artists"});
    }

    onSponsorsPressed(){

    }

    render(){

        return(
            <BaseView baseViewStyle={{backgroundColor: '#ddd'}}>
                <Placemat style={{padding: 0}}>
                    <Image style={{flex: 1, resizeMode: "stretch", height: 120}} source={require('../image/mab_banner.png')} />
                </Placemat>
                
                <View style={styles.viewContainerStyle}>
                    <View style={{flex:1}}>
                        <Button buttonStyleProp={{marginLeft: 0, marginRight: 0, borderRadius: 0}} onPress={this.onBandsPressed.bind(this)}>
                            Bands
                        </Button>
                    </View>

                    <View style={{flex:1}}>
                        <Button buttonStyleProp={{marginLeft: 0, marginRight: 0, borderRadius: 0}} onPress={this.onArtistsPressed.bind(this)}>
                            Artists
                        </Button>
                    </View>

                    <View style={{flex:1}}> 
                        <Button buttonStyleProp={{marginLeft: 0, marginRight: 0, borderRadius: 0}} onPress={this.onSponsorsPressed.bind(this)}>
                            Sponsors
                        </Button>
                    </View>
                </View>
                
            

                <NowPlayingBottomBar bandName={this.currentBand}>
                    Now playing:
                </NowPlayingBottomBar>
            </BaseView>
        );
    }
}

const styles = {
    viewContainerStyle:{
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
}

const mapStateToProps = state => {
    const { currentBand } = state.band;
    return { currentBand };
};

export default connect(mapStateToProps, {   currentBandFetch, 
                                            fetchArtists, 
                                            fetchBands })(HomeView);