import React, { Component } from 'react';
import { Text, View, Modal, FlatList, TouchableHighlight } from 'react-native';
import { Placemat, Button } from './common';
import { connect } from 'react-redux';
import { selectAward } from '../actions';
import awards from '../data/Awards.json';
import ListItemSelectable from './ListItemSelectable';

// receive the children prop passed to Confirm
class AwardPopup extends Component{
    
    // componentWillReceiveProps(nextProps){
    //     console.log("\tin popup. Visible: " + nextProps.visible + "  selected award: " + nextProps.selectedAwardId);
    //     console.log(nextProps);
    //     this.setState({visible: nextProps.visible, selectedAwardId: nextProps.selectedAwardId});
    // }

    onCancel(){
        // this.props.toggleAwardPopup(false);
    }

    onAwardConfirm(){
        // this.props.toggleAwardPopup(false);
        // sig: Here would be the best place to make an api call to add an award to a band or artist.
        // We might also want to save the award action locally so given awards can be displayed without a get request per band/artist?
        console.log("add award to: " + this.props.selectedAwardId);
    }


    renderItem(data){
        return(
            <ListItemSelectable data={data} />
        ); 
    }

    
    render(){
        const { containerStyle, placematStyle, placematOptionsStyle, awardButtonStyle } = styles;
        const { open } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent
                visible={this.props.visible}
                onRequestClose={() => {}}>
                <View style={containerStyle}>
                    <Placemat style={placematStyle}>
                        {this.props.children}
                    </Placemat>

                    <Placemat style={placematOptionsStyle}>
                        <FlatList 
                            data={awards}
                            renderItem={this.renderItem}
                            keyExtractor={(data) => data.id.toString()}
                        />
                    </Placemat>

                    <Placemat>
                        <Button onPress={this.onCancel.bind(this)}>
                            Cancel
                        </Button> 
                        
                        <Button onPress={open} buttonStyleProp={awardButtonStyle}>
                            Award
                        </Button>
                    </Placemat>
                </View>
            </Modal>
        );
    }
}

const styles = {
    placematStyle:{
        justifyContent: 'center',
        backgroundColor: '#fff'

    },
    containerStyle:{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    placematOptionsStyle:{
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        height: 180,
        padding: 0,
        flexDirection: 'column'
    },
    awardButtonStyle:{
        backgroundColor: "#2c708e",
        color: "#fff"
    }
};

const mapStateToProps = (state, ownProps) => {
    return {visible: state.awardVisible, selectedAwardId: state.selectedAwardId};
};

export default connect(mapStateToProps, { selectAward })(AwardPopup);