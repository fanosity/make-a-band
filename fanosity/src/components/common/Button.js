import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children, buttonStyleProp }) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity style={[buttonStyle, buttonStyleProp]} onPress={onPress}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: "center",
        color: "#111111",
        fontSize: 16,
        fontWeight: "600",
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#111",
        marginLeft: 5,
        marginRight: 5,
        justifyContent: "center",
        activeOpacity: 0.1
    }
};

export { Button };
