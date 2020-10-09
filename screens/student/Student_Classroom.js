import { database } from "firebase";
import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import AtomusCard from "../../components/card"
import Colors from "../../constants/Colors";


class Student_Classroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
           course: null
        }
        this.course = this.props.navigation.getParam('course');
       
    }

    _displayCourseWork = () => {
        var course_work = this.course.work;
        const work_list = course_work.map((work, index) => {
            var date = new Date();
            console.log(work.due_date);

            date.setFullYear(work.due_date.year, work.due_date.month);
            date.setHours(work.due_time.hours, work.due_time.minutes);
            date.setDate(work.due_date.day)

            console.log(date.toDateString());
            return (<AtomusCard title={work.title} description={work.description} due_date={date.toDateString()}/>);
        });
        return work_list;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.course.name}</Text>
                <View>{this._displayCourseWork()}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.color
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold',
    },
})
export default Student_Classroom;