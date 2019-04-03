import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { ItemForList } from "./ItemForList";

class BandsList extends Component {
    componentDidMount() {
        var initialItem = this.props.data.find(item => item.id == this.props.initialScrollIndex);

        if (initialItem != null) {
            this.props.deselectDataItem();
            this.props.selectDataItem(initialItem);
        } else {
            this.props.deselectDataItem();
        }
    }

    scrollToIndex(id) {
        if (id != null)
            this.listRef.scrollToIndex({
                animated: true,
                index: this.props.bands.findIndex(item => item.id == id)
            });
    }

    renderItem(data) {
        return <ItemForList data={data.item} />;
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this.renderItem}
                keyExtractor={data => data.id.toString()}
                initialNumToRender={this.props.data.length}
                initialScrollIndex={this.props.initialScrollIndex}
            />
        );
    }
}

const mapStateToProps = state => {
    return { data: state.data.data };
};

export { BandsList };

// export default connent(mapStateToProps, {
//     selectDataItem,
//     deselectDataItem
// })(BandsList);
