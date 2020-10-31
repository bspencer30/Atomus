import React, { Component } from "react";
import { StyleSheet, ScrollView, View,} from "react-native";

import Colors from "../../constants/Colors";

import AtomusCard from "../../components/Card";
import AtomusText from "../../components/Text";

class Student_Course extends Component {

    constructor(props) {
        super(props);
        this.state = {
           course: null
        }
        this.course = this.props.navigation.getParam("course");
    }

    _displayCourseWork = () => {
        var coursework = this.course.work;
        const work_list = coursework.map((work, index) => {
            return (<AtomusCard key={index} title={work.title} description={work.description} due_date={work.due_date} onPress={() => this.props.navigation.navigate("Coursework", { coursework: work })}/>);
        });
        work_list.unshift(<AtomusText key={this.course.course_id} text={this.course.name} fontSize={25} style={styles.courseName}/>)
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
        backgroundColor: Colors.beige.opaque
    },
    list:{
        paddingTop: 24,
        paddingBottom: 50,
    },
    courseName: {
        textAlign: "center"
    }
})
export default Student_Course;