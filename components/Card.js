import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View} from "react-native"
import PropTypes from "prop-types";
import { Card, Icon } from "react-native-elements"

import Colors from "../constants/Colors"
import AtomusText from "./Text"
import dateCalc from "../utils/dateCalc"

export default class AtomusCard extends Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.onPress();
    };

    _colorIndicator = (date) => {
        currentDate = new Date();
        difference = dateCalc.dateDiffInDays(currentDate, date);
        if (difference < 3){
            return Colors.soft_pink.opaque;
        } else if (difference < 7){
            return Colors.yellow.opaque;
        } else {
            return Colors.turquoise.opaque;
        }
    }

    _shortDescription = (description) => {
        var length = description.length;
        if (length < 60) return description; 
        return description.substring(0, 85).trim() + ". . .";
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <Card containerStyle={[styles.container, {shadowColor: this._colorIndicator(this.props.due_date)}]}>
                    <AtomusText text={this.props.title} style={styles.titleText} />
                    <AtomusText text={"due " + this.props.due_date.toDateString()} style={styles.dueDateText} />
                    <AtomusText text={this._shortDescription(this.props.description)} />
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
        //shadowColor: Colors.turquoise.opaque
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