import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";


class Student_Classroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
           course: null
        }
        this.course = this.props.navigation.getParam('course');
       
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.course.course_id + '\n' + this.course.name + '\n' + this.course.work.length}</Text>
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
export default Student_Classroom;