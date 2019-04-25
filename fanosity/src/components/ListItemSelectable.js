import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Placemat, Button } from "./common";
import { selectAward } from "../actions";

class ListItemSelectable extends Component {
    getColor() {
        const color = this.props.selected ? "#dd66" : "#dddd";
        return color;
    }

    render() {
        const { data } = this.props;
        return (
            <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: this.getColor() }]}
                onPress={() => this.props.selectAward(data.item.id)}
            >
                <Text style={styles.contentStyle}>{data.item.award}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    contentStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 40,
        color: "#000"
    },
    buttonStyle: {
        activeOpacity: 0.1
    }
};

const mapStateToProps = (state, ownProps) => {
    return { selected: state.selectedAwardId === ownProps.data.item.id };
};

export default connect(
    mapStateToProps,
    { selectAward }
)(ListItemSelectable);
