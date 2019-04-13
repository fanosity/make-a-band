import React, { Component } from "react";
import { NowPlayingBottomBar, BaseView } from "./common";
import { FlatList, View, Text } from "react-native";
import { connect } from "react-redux";
import ItemForList from "./ItemForList";
import AwardPopup from "./AwardPopup";
import { currentBandFetch, getCurrentBand, selectDataItem } from "../actions";
import { Actions } from "react-native-router-flux";

class ArtistsList extends Component {
    componentWillMount() {
        this.props.getCurrentBand();
        this.selectScrollTo();
        this.manageCurrentBand(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.manageCurrentBand(nextProps);
    }

    selectScrollTo() {
        let initialItem = this.props.artists.find(item => item.id == this.props.scrollTo);

        if (initialItem != null) {
            this.props.selectDataItem(initialItem);
        } else {
            this.props.selectDataItem(-1);
        }
    }

    manageCurrentBand({ currentBand }) {
        this.currentBand = currentBand;
    }

    onNowPlayingPressed() {
        Actions.replace("bandsView", { scrollTo: this.currentBand.id });
    }

    scrollToIndex(id) {
        if (id != null)
            this.listRef.scrollToIndex({
                animated: true,
                index: this.props.artists.findIndex(item => item.id == id)
            });
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

    renderList() {
        return (
            <FlatList
                data={this.props.artists}
                renderItem={this.renderItem}
                keyExtractor={data => data.id.toString()}
                ref={ref => {
                    this.listRef = ref;
                }}
                initialNumToRender={this.props.artists.length}
                initialScrollIndex={this.props.scrollTo}
            />
        );
    }

    render() {
        return (
            <BaseView baseViewStyle={{ backgroundColor: "#ddd" }}>
                <View /*onLayout={() => this.onLayout()}*/ style={{ flex: 6 }}>
                    {this.renderList()}
                    <AwardPopup>{this.renderAwardTitle()}</AwardPopup>
                </View>
                <NowPlayingBottomBar bandName={this.currentBand.title} onPress={this.onNowPlayingPressed.bind(this)}>
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
    return {
        currentBand,
        selectedDataItem: state.selectedDataItem,
        bands: state.data.bands,
        artists: state.data.artists,
        sponsors: state.data.sponsors
    };
};

// connect() reaches to the provider, and returns the state to mapStateToProps, which filters the state to return.
export default connect(
    mapStateToProps,
    { currentBandFetch, getCurrentBand, selectDataItem }
)(ArtistsList);
