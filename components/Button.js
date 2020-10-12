import React, { Component } from "react"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Button } from 'react-native-elements'
import PropTypes from "prop-types"

import Colors from "../constants/Colors"
import AtomusText from "./Text"

export default class AtomusButton extends Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.onPress();
    };

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableOpacity onPress={this.onPress} style={[styles.defaultButton, {backgroundColor: this.props.backgroundColor}]}>
                    <AtomusText text={this.props.title} style={styles.defaultText}/>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 6
    },
    defaultButton: {
        alignItems: "center",
        padding: 15,
        width: 300,
        borderRadius: 5,
    },
    defaultText:{
        fontSize: 18,
    }
})

AtomusButton.propTypes = {
    backgroundColor: PropTypes.string,    
    onPress: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
}

AtomusButton.defaultProps = {
    backgroundColor: Colors.grey.opaque,
    onPress: () => {},
    style: styles.container,
    title: "Testing",
}