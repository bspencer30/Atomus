import React, { Component } from "react";
import { StyleSheet, Text } from "react-native"
import PropTypes from "prop-types";

export default class AtomusText extends Component {
    constructor(props) {
        super(props);
    }
    onPress = () => {
        this.props.onPress();
    };

    render() {
        return (
            <Text style={[{ color: (this.props.style.color == "undefined") ? this.props.color : this.props.style.color, fontFamily: this.props.fontFamily, fontSize: this.props.fontSize }, this.props.style]} onPress={this.props.onPress ? this.onPress: null}>
                {this.props.text}
            </Text>);
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        color: "#000000"
    },
})


AtomusText.propTypes = {
    onPress: PropTypes.func,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    style: PropTypes.object,
    text: PropTypes.string
}

AtomusText.defaultProps = {
    onPress: null,
    color: "#000000",
    fontSize: 16,
    fontFamily: "NunitoSans",
    style: styles.defaultStyle,
    text: "Default Text",
}