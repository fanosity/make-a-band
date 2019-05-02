import React, { Component } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ItemForList from './ItemForList';
import { NowPlayingBottomBar, BaseView } from './common';
import AwardPopup from './AwardPopup';
import { currentBandFetch, getCurrentBand, selectDataItem } from '../actions';


const bandQuery = gql`{
  bands: getBandsByEvent(eventId: "event_2015_bend-make-a-band") {
    name
    bandId
    primaryImage(aspect: "16x9", maxWidth: 600) {
      url
    }
  }
}`;

class BandsList extends Component {
    componentDidMount() {
        this.props.getCurrentBand();
        //this.selectScrollTo();
    }

    selectScrollTo() {
        let initialItem = this.props.bands.find((item) => item.id === this.props.scrollTo);

        if (initialItem !== null) {
            this.props.selectDataItem(initialItem);
        } else {
            this.props.selectDataItem(-1);
        }
    }

    onNowPlayingPressed() {
        const { currentBand, bands } = this.props;
        this.scrollToIndex(currentBand.id);
        this.props.selectDataItem(-1);
        this.props.selectDataItem(bands.find((item) => item.id === currentBand.id));
    }

    scrollToIndex(id) {
        if (id !== null)
            this.listRef.scrollToIndex({
                animated: true,
                index: this.props.bands.findIndex((item) => item.id === id)
            });
    }

    renderItem({ item }) {
        const bandData = {
            id: item.bandId,
            title: item.name,
            desc: item.name,
            image: { uri: item.primaryImage.url }
        };

        return <ItemForList data={bandData} />;
    }

    renderAwardTitle() {
        const { selectedDataItem } = this.props;
        const awardText = 'Award ';

        return (
            <View style={styles.awardTextContainerStyle}>
                <Text style={styles.awardTextStyle}>{awardText}</Text>
                <Text style={[styles.titleTextStyle, styles.awardTextStyle]}>{selectedDataItem.title}</Text>
                <Text style={styles.awardTextStyle}>:</Text>
            </View>
        );
    }

    renderList() {
        const { data: { bands, loading } } = this.props;

        if (loading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        return (
            <FlatList
                data={bands}
                renderItem={this.renderItem}
                keyExtractor={({ bandId }) => bandId.toString()}
                ref={ref => {
                    this.listRef = ref;
                }}
                initialNumToRender={bands.length}
                initialScrollIndex={this.props.scrollTo}
            />
        );
    }

    render() {
        const { currentBand } = this.props;
        return (
            <BaseView baseViewStyle={{ backgroundColor: "#ddd" }}>
                <View /*onLayout={() => this.onLayout()}*/ style={{ flex: 6 }}>
                    {this.renderList()}
                    <AwardPopup>{this.renderAwardTitle()}</AwardPopup>
                </View>
                <NowPlayingBottomBar bandName={currentBand.title} onPress={this.onNowPlayingPressed.bind(this)}>
                    Now playing:
                </NowPlayingBottomBar>
            </BaseView>
        );
    }

    onLayout() {
        const { currentBand } = this.props;
        this.scrollToIndex(this.props.scrollTo);
        this.props.selectDataItem(-1);
        this.props.selectDataItem(this.props.bands.find((item) => item.id === currentBand.id));
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
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
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

export default graphql(bandQuery)
    (connect(mapStateToProps, { currentBandFetch, getCurrentBand, selectDataItem })
    (BandsList)
);
