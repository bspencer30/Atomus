import React, { Component } from "react";
import { Alert, StyleSheet, ScrollView, Text, TextInput, View } from "react-native";
import { ListItem, CheckBox, Card, Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusCard from "../../components/Card"
import dateCalc from "../../utils/dateCalc"
import AtomusButton from "../../components/Button";

class Student_GuardianInvite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guardian_email: "",
            checked_courses: {},
        }
    }

    UNSAFE_componentWillMount() {
        let { state } = this.context;
        this.setState({ user: state.user, credentials: state.credentials, courses: state.courses });
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Invite Guardian"} />,
    });


    _inArray = (course_id, array) => {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == course_id) return true;
        }
        return false;
    }

    //I recognize this could be improved with a set but the "has" method was throwing an error
    _toggleCourse = (course) => {
        if (!course.guardians_enabled) {
            Alert.alert("Guardians not enabled", "Contact Teacher.")
        } else {
            const course_id = course.course_id;
            const checked_list = Object.keys(this.state.checked_courses)
            const obj = this.state.checked_courses;
            this._inArray(course_id, checked_list) ? delete obj[course_id] : obj[course_id] = true;
            this.setState({ checked_courses: obj });
        }
    }

    _displayCourses = () => {
        const courses = this.state.courses;
        if (courses == null || courses.length == 0) {
            return (
                <ListItem containerStyle={styles.listItem}>
                    <ListItem.Title> <AtomusText text={"No Enrolled Classes"} /> </ListItem.Title>
                </ListItem>
            )
        } else {
            const course_list = courses.map((course, index) => {
                return (
                    <ListItem key={index} containerStyle={styles.listItem} >
                        <ListItem.Content>
                            <ListItem.Title><AtomusText text={course.name} fontSize={15} style={{ marginLeft: 12 }} /> </ListItem.Title>
                            {/* <ListItem.Subtitle><AtomusText text={course.guardians_enabled ? "" : " testing"} fontSize={12}/></ListItem.Subtitle> */}
                        </ListItem.Content>
                        <ListItem.CheckBox onPress={() => this._toggleCourse(course)} checkedColor={Colors.turquoise.opaque} checked={this._inArray(course.course_id, Object.keys(this.state.checked_courses))} />
                    </ListItem>)
            })
            return course_list;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <AtomusText text={"Guardian Email Address"} style={{ marginTop: "15%" }} />
                <TextInput style={styles.input} placeholder="example@mail.com" onChangeText={(text) => this.setState({ guardian_email: text })} />
                <AtomusText text={"Courses"} />
                <ScrollView style={styles.list}>
                    {this._displayCourses()}
                </ScrollView>
                <View style={{ flex: 1000 }} />
                <AtomusButton style={styles.inviteButton} title={"Send Invitation"} backgroundColor={Colors.turquoise.opaque} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
        padding: 16
    },
    list: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#cdc2a7",
    },
    listItem: {
        backgroundColor: Colors.beige.semi_transparent,
    },
    courseName: {
        textAlign: "center"
    },
    input: {
        backgroundColor: Colors.beige.semi_transparent,
        borderRadius: 5,
        padding: 15,
        borderColor: "#cdc2a7",
        borderWidth: 1,
        fontFamily: "NunitoSans",
        marginBottom: 20,
        fontSize: 15
    },
    inviteButton: {
        alignItems: "center",
        marginBottom: 50
    }
});

Student_GuardianInvite.contextType = AppContext;
export default Student_GuardianInvite;