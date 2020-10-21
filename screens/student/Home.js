import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusCard from "../../components/Card"
import dateCalc from "../../utils/dateCalc"

class Student_Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    _displayCourseWork = () => {
        var courses = this.context.state.courses;
        var work_list = [];

        courses.map((course, index) => {
            var coursework = course.work;
            coursework.map((work, index) => {
                work_list.push(<AtomusCard key={work.coursework_id} course={course.name} title={work.title} description={work.description} due_date={work.due_date} onPress={() => this.props.navigation.navigate("Coursework", { coursework: work })} />)
            })
        });       
        work_list.sort((a, b) => ((dateCalc.dateDiffInDays(a.props.due_date, b.props.due_date) < 0 ) ? 1 : -1))
        work_list.unshift(<AtomusText key={-1} text={"Upcoming Assignments"} fontSize={25} style={styles.courseName}/>)
        return work_list;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.list}>{this._displayCourseWork()}</ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
    },
    list: {
        paddingTop: 24,
        paddingBottom: 50,
    },
    courseName: {
        textAlign: "center"
    }
});

Student_Home.contextType = AppContext;
export default Student_Home;