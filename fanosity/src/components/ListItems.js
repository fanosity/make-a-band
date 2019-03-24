import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { connect } from "react-redux";
import ItemForList from "./ItemForList";
import AwardPopup from "./AwardPopup";
import { selectDataItem, deselectDataItem } from "../actions";

class ListItems extends Component {
    componentWillMount() {
        const initialItem = this.props.data.find(b => b.id == this.props.scrollTo);
        if (initialItem != null) {
            this.props.deselectDataItem();
            this.props.selectDataItem(initialItem);
        } else {
            this.props.deselectDataItem();
        }
    }

    componentWillReceiveProps(nextProps) {}

    componentDidMount() {
        // if (this.props.scrollTo != null) this.flatListRef.scrollToIndex({ animated: true, index: this.props.scrollTo });
    }

    renderItem(data) {
        return <ItemForList data={data.item} />;
    }

    renderAwardTitle() {
        const awardText = "Award ";
        return (
            <View style={styles.awardTextContainerStyle}>
                <Text style={styles.awardTextStyle}>{awardText}</Text>
                <Text style={[styles.titleTextStyle, styles.awardTextStyle]}>{this.props.selectedDataItem.title}</Text>
                <Text style={styles.awardTextStyle}>:</Text>
            </View>
        );
    }

    render() {
        return (
            <View onLayout={() => this.onLayout()}>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={data => data.id.toString()}
                    ref={ref => {
                        this.flatListRef = ref;
                    }}
                    initialNumToRender={this.props.data.length}
                    // initialScrollIndex={this.props.scrollTo}
                />
                <AwardPopup>{this.renderAwardTitle()}</AwardPopup>
            </View>
        );
    }

    onLayout() {
        if (this.props.scrollTo != null) this.flatListRef.scrollToIndex({ animated: true, index: this.props.scrollTo });
    }
}

const styles = {
    awardTextStyle: {
        fontSize: 22,
        textAlign: "left",
        lineHeight: 40,
        color: "#000"
    },
    titleTextStyle: {
        fontStyle: "italic"
    },
    awardTextContainerStyle: {
        justifyContent: "center",
        flexDirection: "row",
        height: 45,
        flex: 1
    }
};

const mapStateToProps = state => {
    return { data: state.data.data, selectedDataItem: state.selectedDataItem };
};

// connect() reaches to the provider, and returns the state to mapStateToProps, which filters the state to return.
export default connect(
    mapStateToProps,
    { selectDataItem, deselectDataItem }
)(ListItems);
