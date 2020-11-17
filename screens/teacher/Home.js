import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusButton from "../../components/Button";

import AtomusCard_Class from "../../components/Card_Class"

const data = require('../../backend/local_storage/teacher_data.json');
class Teacher_Home extends Component {
    constructor(props) {
        super(props);
        this.state = {classes: data.classes};
    }
   
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Classes"} />,
    });

    _displayClasses = () => {
        const class_list = [];
        for (const class_key in this.state.classes) {
            const cur_class = this.state.classes[class_key];
            var submitted_count = 0;
            var late_count = 0;
            var not_submitted_count = 0;

            const coursework = cur_class.coursework;
            for (const assignment_key in coursework) {
                const assignment = coursework[assignment_key];
                var submitted_list = [];
                var late_list = [];
                var not_submitted_list = [];
                const assignment_name = assignment.name;
                const students = assignment.students;
                for (const i in students) {
                    const student = students[i];
                    var date = new Date();
                    switch(student.status) {
                        case "submitted":
                            submitted_count += 1;
                            student.due_date = date;
                            submitted_list.push(student);
                            break;
                        case "late":
                            late_count += 1;
                            date.setFullYear(2020, date.getMonth() - (Math.random()), date.getDay() - ((Math.random() * 15) + 1));
                            student.due_date = date;
                            late_list.push(student);
                            break;
                        case "not_submitted":
                            not_submitted_count += 1;
                            date.setFullYear(2020, date.getMonth() + (Math.random() + 1), date.getDay() + ((Math.random() * 7) + 1));
                            student.due_date = date;
                            not_submitted_list.push(student);
                            break;
                    }
                }
                assignment.submitted = submitted_list;
                assignment.late = late_list;
                assignment.not_submitted = not_submitted_list;
            }
            class_list.push(<AtomusCard_Class key={class_key} name={cur_class.name}
                late={late_count} submitted={submitted_count} not_submitted={not_submitted_count}
                onPress={() => {this.props.navigation.navigate("ClassView", {class_info: cur_class})}}/>)
        }
        return class_list;
    }

    render() {
        return (
            <View style={[styles.container]}>
                <ScrollView contentContainerStyle={styles.list}>{
                    this._displayClasses()
                }</ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
    },
    list: {
        paddingTop: 50,
        paddingBottom: 50,
    },
    courseName: {
        textAlign: "center"
    }
});

Teacher_Home.contextType = AppContext;
export default Teacher_Home;
