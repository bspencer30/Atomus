import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Button } from 'react-native-elements';
import PropTypes from "prop-types";
import Colors from "../constants/Colors"

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
                    <Text style={styles.defaultText}>{this.props.title}</Text>
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
        fontFamily: "NunitoSans",
        color: '#000000'
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