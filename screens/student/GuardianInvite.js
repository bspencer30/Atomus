import React, { Component } from "react";
import { Alert, StyleSheet, ScrollView, TextInput, View } from "react-native";
import { ListItem } from "react-native-elements";
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text";
import AtomusButton from "../../components/Button";

class Student_GuardianInvite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guardian_email: "",
        }
    }

    UNSAFE_componentWillMount() {
        let { state } = this.context;
        this.setState({ user: state.user, credentials: state.credentials, courses: state.courses });
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Invite Guardian"} />,
    });

    _courseAlert = (course) => {
        if (!course.guardians_enabled) Alert.alert("Contact Teacher", `Guardians not enabled within ${course.name}.\n Your guardian will not be able to see your work in this course.`);
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
                    <ListItem key={index} containerStyle={styles.listItem} onPress={() => this._courseAlert(course)} >
                        <ListItem.Content>
                            <ListItem.Title><AtomusText text={course.name} fontSize={15} style={{ marginLeft: 12 }} /> </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.CheckBox onPress={() => this._courseAlert(course)} checkedColor={Colors.turquoise.opaque} checked={course.guardians_enabled} uncheckedIcon={course.guardians_enabled ? "check-square-o" : "warning"} />
                    </ListItem>
                )
            })
            return course_list;
        }
    }

    _handleInvite = async () => {
        this.context.inviteGuardian(this.context.state.credentials.access_token, this.state.guardian_email);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <AtomusText text={"Guardian Email Address"} style={{ marginTop: "15%" }} />
                <TextInput style={styles.input} placeholder="example@mail.com" autoCompleteType="email" returnKeyType="done" onChangeText={(text) => this.setState({ guardian_email: text })} />
                <AtomusText text={"Courses"} />
                <ScrollView style={styles.list}>
                    {this._displayCourses()}
                </ScrollView>
                <View style={{ flex: 1000 }} />
                <AtomusButton style={styles.inviteButton} title={"Send Invitation"} backgroundColor={Colors.turquoise.opaque} onPress={() => this._handleInvite()} />
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
        borderColor: Colors.beige.dark,
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
        borderColor: Colors.beige.dark,
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