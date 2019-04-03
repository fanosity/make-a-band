import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, 
         LayoutAnimation, NativeModules, ImageBackground } from 'react-native';
import { Placemat, Button, Banner } from './common';
import { connect } from 'react-redux';
import { selectDataItem, selectAward } from '../actions';
import * as images from '../image';


const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class ItemForList extends Component{

    state = {awardGiven: false, awardGivenString: ""}

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    // Used to be the place that managed 'awardGiven' state bool when redux change was made
    componentWillReceiveProps(nextProps){
        // const currentPage = this.props.dataState.currentPage;
        // if (currentPage in this.props.dataState.givenAwards)
        // {
        //     const thisItemId = this.props.data.id;
        //     if (thisItemId in this.props.dataState.givenAwards[currentPage]){
        //         this.setState({awardGiven: true});
        //         const currentPageStringSingular = this.props.dataState.currentPage.substring(0, this.props.dataState.currentPage.length - 1);
        //         this.setState({awardGivenString: `You have awarded this ${currentPageStringSingular}`});
        //     }
        //     else{
        //         this.setState({awardGiven: false});
        //     }
        // }
    }

    onAwardPressed(){
        // this.props.toggleAwardPopup(true);
    }

    onAwardChangePressed(){

    }

    renderAwardSection(){
        // sig: instead of getting awardGiven from this.state, we could make an api call which gets info 
        // on what the user awarded this item (band or artist), if any award was given.
        const { awardGiven } = this.state;
        if (awardGiven){
            return( 
                <Placemat style={{bottom: 0, position: 'relative', height: 80}}>
                    <Placemat style={{flex: 2}}>
                        <Text style={styles.awardAlreadyGivenTextStyle}>{this.state.awardGivenString}</Text>
                    </Placemat>
                    <Button buttonStyleProp={{backgroundColor: '#2c708e', flex: 1, height: 50, alignSelf: 'center'}} onPress={this.onAwardChangePressed.bind(this)}>
                            Change Award
                    </Button>
                </Placemat>
                
            );
                    
        }
        else{
            return (
                <Placemat style={{bottom: 0, position: 'relative'}}>
                    <Button buttonStyleProp={styles.awardButtonStyle} onPress={this.onAwardPressed.bind(this)} >
                            Award
                    </Button>
                </Placemat>
            );
        }
    }


    renderDescription() {
        const { bioTextStyle, aboutHeaderTextStyle } = styles;
        const { expanded } = this.props
        const { bio } = this.props.data;
        if (expanded){ 
            return (
                <View>
                    <Placemat style={{flexDirection:'column'}}>
                        <Text style={aboutHeaderTextStyle}>
                            About
                        </Text>
                        <Text style={bioTextStyle}>
                            {bio}
                        </Text>
                    </Placemat>
                    {this.renderAwardSection()}
                </View>
                
            );
        }
    }


    render(){
        const { id, title, desc, image } = this.props.data;
        const bannerImage = images[image];
        
        return(
            <View>
                <Banner 
                    onPress={() => this.props.selectDataItem(this.props.data)}
                    title={title}
                    desc={desc}
                    image={bannerImage}
                />
                {this.renderDescription()}
            </View>

        );
    }
}

const styles = {
    awardButtonStyle:{
        backgroundColor: '#2c708e'
    },
    bioTextStyle:{
        fontSize: 16,
        paddingLeft: 8,
        color: '#ddd'
    },
    aboutHeaderTextStyle:{
        fontSize: 20,
        paddingLeft: 8,
        color: '#ddd'
    },
    awardAlreadyGivenTextStyle:{
        fontSize: 18,
        paddingLeft: 8,
        color: '#ddd'
    }
};


// ownProps are the props passed to the component we are wrapping.
// doing calculation is mapStateToProps() is more efficient than in the component itself.
// the state argument received by mapStateToProps is the state returned by the reducer.
const mapStateToProps = (state, ownProps) => {

    return { expanded: state.selectedDataItem.id  === ownProps.data.id, dataState: state.data};
};

// use the connect() helper to call an action creator.
// The 1st argument is for mapStateToProps, the 2nd argument is to connect an action creator.
// Takes the action creators, and whenever they are called, make sure they go to the right place.
// Then, pass these actions into the component (the component in this case is Item) as props.
// Now our Item will have props.actions (as well as props.library which was set in LibraryList).
export default connect(mapStateToProps, {selectDataItem, selectAward})(ItemForList);