import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import PropTypes from "prop-types";
import { Card, Icon } from "react-native-elements"

import Colors from "../constants/Colors"
import AtomusText from "./Text"

export default class AtomusCard_Child extends Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.onPress();
    };

     render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <Card containerStyle={[styles.container]}>
                    <AtomusText text={this.props.name} style={styles.titleText} />
                    <AtomusText text={this.props.email} style={styles.childEmail} />
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: "#f1eee7",
        shadowRadius: 3,
        borderWidth: 2,
        //shadowColor: Colors.turquoise.semi_transparent,
        //borderColor: Colors.turquoise.semi_transparent
    },
    titleText: {
        fontSize: 18,
        textAlign: "left",
        marginBottom: 0,
        fontFamily: "NunitoSans_Bold"
    },
    childEmail: {
        fontSize: 14,
        color: "#4f4f4f"
    }
})
AtomusCard_Child.propTypes = {
    email: PropTypes.string,
    name: PropTypes.string,
    onPress: PropTypes.func,
}

AtomusCard_Child.defaultProps = {
    email: "example@mail.com",
    name: "Griffin",
    onPress: () => { console.log("Card Pressed"); },
}