import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
export default class Student_Classroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
           class_title: ''
        }
        this.class_title = this.props.navigation.getParam('title');
    }

    render() {
        console.log(this.state.class_title);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.class_title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})
