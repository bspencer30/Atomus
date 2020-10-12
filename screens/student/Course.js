import React, { Component } from "react"
import { StyleSheet, ScrollView, View, Text, Button } from "react-native"

import Colors from "../../constants/Colors"

import AtomusCard from "../../components/Card"
import AtomusText from "../../components/Text"

class Student_Course extends Component {

    constructor(props) {
        super(props);
        this.state = {
           course: ""
        }
        this.course = this.props.navigation.getParam('course');
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={25} text={navigation.getParam("course").name} />,
    });

    _displayCourseWork = () => {
        var course_work = this.course.work;
        const work_list = course_work.map((work, index) => {
            return (<AtomusCard key={work.course_work_id} title={work.title} description={work.description} due_date={work.due_date} onPress={() => this.props.navigation.navigate("Coursework")}/>);
        });
        return work_list;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.list}>{this._displayCourseWork()}</ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque
    },
    list:{
        paddingTop: 50
    }
})
export default Student_Course;