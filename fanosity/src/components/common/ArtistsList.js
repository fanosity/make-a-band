import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { ItemForList } from "../ItemForList";

class ArtistsList extends Component {
    componentDidMount() {}

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this.renderItem}
                keyExtractor={data => data.id.toString()}
                ref={ref => {
                    this.flatListRef = ref;
                }}
                initialNumToRender={this.props.data.length}
                initialScrollIndex={this.props.scollTo}
            />
        );
    }
}

const mapStateToProps = state => {};

export default connent(mapStateToProps, {})(ArtistsList);
