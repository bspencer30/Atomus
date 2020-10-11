import React, { Component } from "react";
import {View, Text }from "react-native"
import PropTypes from "prop-types";
import { Card, Icon } from "react-native-elements"

export default class AtomusCard extends Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.onPress();
    };

    render() {
        return (
            <Card style={{width: "100%"}}>
                <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 0, fontWeight: 'bold' }}>{this.props.title}</Text>
                <Text style={{ fontSize: 14, marginBottom: 8 }}>{"due " + this.props.due_date}</Text>
                <Text>{this.props.description}</Text>
            </Card>
           );
    }
}
AtomusCard.propTypes = {
    description: PropTypes.string,
    due_date: PropTypes.string,
    onPress: PropTypes.func,
    title: PropTypes.string,
}

AtomusCard.defaultProps = {
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    due_date: new Date(),
    onPress: () => {},
    title: 'Assignment 1',
}