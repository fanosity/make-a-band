import React, { Component } from "react";
import { NowPlayingBottomBar, BaseView } from "./common";
import { FlatList, View, Text } from "react-native";
import { connect } from "react-redux";
import ItemForList from "./ItemForList";
import AwardPopup from "./AwardPopup";
import { currentBandFetch, getCurrentBand, fetchBands, selectDataItem } from "../actions";
import { Actions } from "react-native-router-flux";

class ListItems extends Component {
    componentWillMount() {
        var initialItem = this.props.data.find(item => item.id == this.props.scrollTo);

        if (initialItem != null) {
            // this.props.deselectDataItem();
            this.props.selectDataItem(initialItem);
        } else {
            // this.props.deselectDataItem();
        }

        // this.props.currentBandFetch();
        this.props.getCurrentBand();
        this.manageCurrentBand(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.manageCurrentBand(nextProps);
    }

    componentDidMount() {
        // if (this.props.scrollTo != null) this.flatListRef.scrollToIndex({ animated: true, index: this.props.scrollTo });
    }

    manageCurrentBand({ currentBand }) {
        this.currentBand = currentBand;
    }

    onNowPlayingPressed() {
        // Using id = 6 until api is fleshed out. Replace with grab of current band id.

        // Needs to be a better way of identifying what's being displayed currently.
        if (this.props.title !== "Bands") {
            this.props.fetchBands();

            // FIXME: For some reason none of these fully reset the page.
            // Actions.jump("listData", { title: "Bands", scrollTo: 6 });
            // Actions.popAndPush("listData", { title: "Bands", scrollTo: 6 });
            Actions.refresh({ title: "Bands", scrollTo: this.currentBand.id });
        }
        this.scrollToIndex(this.currentBand.id);
    }

    scrollToIndex(id) {
        if (id != null) {
            this.props.selectDataItem(-1);
            this.props.selectDataItem(this.props.data.find(item => item.id == id));
            this.flatListRef.scrollToIndex({ animated: true, index: this.props.data.findIndex(item => item.id == id) });
        }
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
            <BaseView baseViewStyle={{ backgroundColor: "#ddd" }}>
                <View /*onLayout={() => this.onLayout()}*/ style={{ flex: 6 }}>
                    <FlatList
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={data => data.id.toString()}
                        ref={ref => {
                            this.flatListRef = ref;
                        }}
                        initialNumToRender={this.props.data.length}
                        initialScrollIndex={this.props.scrollTo}
                    />
                    <AwardPopup>{this.renderAwardTitle()}</AwardPopup>
                </View>
                <NowPlayingBottomBar band={this.currentBand} onPress={this.onNowPlayingPressed.bind(this)}>
                    Now playing:
                </NowPlayingBottomBar>
            </BaseView>
        );
    }

    onLayout() {
        this.scrollToIndex(this.props.scrollTo);
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
    const { currentBand } = state.band;
    return { currentBand, data: state.data.data, selectedDataItem: state.selectedDataItem };
};

// connect() reaches to the provider, and returns the state to mapStateToProps, which filters the state to return.
export default connect(
    mapStateToProps,
    { currentBandFetch, getCurrentBand, fetchBands, selectDataItem }
)(ListItems);
