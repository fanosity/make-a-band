import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import ItemForList from './ItemForList';
import AwardPopup from './AwardPopup';
import { deselectDataItem } from '../actions';


class ListItems extends Component {

    componentWillMount(){
        this.props.deselectDataItem();
    }

    componentWillReceiveProps(nextProps){
    }

    renderItem(data){
        return <ItemForList data={data.item} />;
    }

    renderAwardTitle(){
        const awardText = "Award ";
        return (
            <View style={styles.awardTextContainerStyle}>
                <Text style={styles.awardTextStyle}>
                    {awardText}
                </Text>
                <Text style={[styles.titleTextStyle, styles.awardTextStyle]}>
                    {this.props.selectedDataItem.title}
                </Text>
                <Text style={styles.awardTextStyle}>
                    :
                </Text>
            </View>
        );
    }
    
    render() {
        return (
            <View>
                <FlatList 
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={(data) => data.id.toString()}
                />
            <AwardPopup>
                {this.renderAwardTitle()}
            </AwardPopup>
            </View>
        );
    }
}

const styles = {
    awardTextStyle: {
        fontSize: 22,
        textAlign: 'left',
        lineHeight: 40,
        color: '#000'
    },
    titleTextStyle: {
        fontStyle: 'italic'
    },
    awardTextContainerStyle:{
        justifyContent: 'center',
        flexDirection:'row', 
        height: 45, 
        flex: 1
    }
};

const mapStateToProps = state => {
    return { data: state.data.data, selectedDataItem: state.selectedDataItem };
};

// connect() reaches to the provider, and returns the state to mapStateToProps, which filters the state to return.
export default connect(mapStateToProps, { deselectDataItem } )(ListItems);