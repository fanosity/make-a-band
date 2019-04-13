import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";

const NowPlayingBottomBar = ({ onPress, children, band }) => {
    const { headerTextStyle, bandNameTextStyle, containerStyle } = styles;

    if (band == null || band == undefined) return null;

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <View style={{ flex: 1, alignSelf: "center", padding: 5 }}>
                <Image
                    style={{
                        resizeMode: "stretch",
                        height: 80
                    }}
                    source={require("../../image/example_band_thumbnail.png")}
                />
            </View>

            <View
                style={{
                    flexDirection: "column",
                    flex: 3,
                    justifyContent: "center"
                }}
            >
                <Text style={headerTextStyle}>{children}</Text>
                <Text style={bandNameTextStyle}>{band.title}</Text>
            </View>
            {/* </View> */}
        </TouchableOpacity>
    );
};

const styles = {
    headerTextStyle: {
        fontSize: 18,
        justifyContent: "flex-start",
        color: "#ddd"
    },
    bandNameTextStyle: {
        fontSize: 18,
        justifyContent: "flex-start",
        fontWeight: "bold",
        color: "#ddd"
    },
    containerStyle: {
        justifyContent: "center",
        flex: 1,
        height: 80,
        bottom: 0,
        position: "relative",
        backgroundColor: "rgba(10, 10, 15, 0.9)",
        flexDirection: "row"
    }
};

export { NowPlayingBottomBar };
