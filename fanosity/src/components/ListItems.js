import React, { Component } from "react";
import { BandsList, ArtistsList, SponsorsList, NowPlayingBottomBar, BaseView } from "./common";
import { FlatList, View, Text } from "react-native";
import { connect } from "react-redux";
import ItemForList from "./ItemForList";
import AwardPopup from "./AwardPopup";
import { currentBandFetch, getCurrentBand, fetchBands, selectDataItem, deselectDataItem } from "../actions";
import { Actions } from "react-native-router-flux";

class ListItems extends Component {
    componentWillMount() {
        // var initialItem = this.props.bands.find(item => item.id == this.props.scrollTo);

        // if (initialItem != null) {
        //     this.props.deselectDataItem();
        //     this.props.selectDataItem(initialItem);
        // } else {
        //     this.props.deselectDataItem();
        // }

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
        if (this.props.page !== "band") {
            this.props.fetchBands();

            // FIXME: For some reason none of these fully reset the page.
            // Actions.jump("listData", { title: "Bands", scrollTo: 6 });
            // Actions.popAndPush("listData", { title: "Bands", scrollTo: 6 });
            Actions.refresh({ title: "Bands", page: "band", scrollTo: this.currentBand.id });
        }
        let scrollTo = this.currentBand.id;

        // this.scrollToIndex(scrollTo);

        this.dataList.scrollTo(this.currentBand.id);

        this.props.deselectDataItem();
        this.props.selectDataItem(this.props.bands.find(item => item.id == scrollTo));
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
                data={this.bands}
                renderItem={this.renderItem}
                keyExtractor={data => data.id.toString()}
                ref={ref => {
                    this.flatListRef = ref;
                }}
                initialNumToRender={this.bands.length}
                initialScrollIndex={this.props.scrollTo}
            />
        );
        // return (
        //     <BandsList
        //         data={this.props.bands}
        //         initialScrollIndex={this.props.scrollTo}
        //         ref={ref => {
        //             this.dataList = ref;
        //         }}
        //     />
        // );
        //  if (this.props.page == "band") {
        //     return (<BandsList data={this.props.bands} />);
        // } else if (this.props.page == "artist") {
        //     return (<ArtistsList data={this.props.artists} />);
        // } else if (this.props.page == "sponsor") {
        //     return (<SponsorsList data={this.props.sponsors} />);
        // }
    }

    render() {
        return (
            <BaseView baseViewStyle={{ backgroundColor: "#ddd" }}>
                <View /*onLayout={() => this.onLayout()}*/ style={{ flex: 6 }}>
                    {this.renderList()}
                    {/* <FlatList
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={data => data.id.toString()}
                        ref={ref => {
                            this.flatListRef = ref;
                        }}
                        initialNumToRender={this.props.data.length}
                        initialScrollIndex={this.props.scrollTo}
                    /> */}
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
    return { currentBand, selectedDataItem: state.selectedDataItem };
};

// connect() reaches to the provider, and returns the state to mapStateToProps, which filters the state to return.
export default connect(
    mapStateToProps,
    { currentBandFetch, getCurrentBand, fetchBands, selectDataItem, deselectDataItem }
)(ListItems);
