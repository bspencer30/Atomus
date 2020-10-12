import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View} from "react-native"
import PropTypes from "prop-types";
import { Card, Icon } from "react-native-elements"

import Colors from "../constants/Colors"
import AtomusText from "./Text"

export default class AtomusCard extends Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.onPress();
    };

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <Card containerStyle={styles.container}>
                    <AtomusText text={this.props.title} style={styles.titleText} />
                    <AtomusText text={"due " + this.props.due_date.toDateString()} style={styles.dueDateText} />
                    <AtomusText text={this.props.description} />
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: "#f1eee7"
    },
    defaultButton: {
        alignItems: "center",
        padding: 15,
        width: 300,
        borderRadius: 5,
    },
    titleText: {
        fontSize: 18,
        textAlign: "left",
        marginBottom: 0,
        fontFamily: "NunitoSans_Bold"
    },
    dueDateText: {
        fontSize: 14,
        color: "#4f4f4f"
    }
})
AtomusCard.propTypes = {
    description: PropTypes.string,
    due_date: PropTypes.object,
    onPress: PropTypes.func,
    title: PropTypes.string,
}

AtomusCard.defaultProps = {
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    due_date: new Date(),
    onPress: () => {console.log("testing");},
    title: 'Assignment 1',
}