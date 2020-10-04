import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
class Student_Classroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Class_Title: this.props.navigation.state.params.title,
        }
    }

    render() {
        return (
            <View>
                <Text style={{ textAlign: "center" }}>{this.state.Class_Title}</Text>
            </View>
        );
    }
}
export default Student_Classroom;