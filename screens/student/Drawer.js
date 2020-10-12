import React, { Component } from "react"
import { SafeAreaView, View, StyleSheet, Text } from "react-native"
import { ListItem, Icon, Input, Button, Divider } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext"

import Colors from "../../constants/Colors"
import AtomusText from "../../components/Text"

class Student_Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    UNSAFE_componentWillMount() {
        let { state } = this.context;
        this.setState({ user: state.user, credentials: state.credentials, courses: state.courses });
    }

    _signOut = async () => {
        await this.context.logoutUser(this.state.credentials.access_token);
        this.props.navigation.navigate('Splash');
    }

    _displayCourses = () => {
        var courses = this.state.courses;
        if (courses == null || courses.length == 0) {
            return (
                <ListItem containerStyle={styles.listItem}>
                    <ListItem.Title> <AtomusText text={"No Enrolled Classes"} color={"#242424"} /> </ListItem.Title>
                </ListItem>
            )
        } else {
            const course_list = courses.map((course, index) => {
                return (
                    <ListItem key={index} containerStyle={styles.listItem} bottomDivider onPress={() => { this.props.navigation.navigate("Class", { course: course }); }}>
                        <ListItem.Content>
                            <ListItem.Title><AtomusText text={course.name} color={"#242424"} /> </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color="#242424" />
                    </ListItem>)
            })
            //course_list.unshift(<AtomusText text={"Courses"} fontFamily={"NunitoSans_Bold"} fontSize={18} style={styles.list_header}/>)
            return course_list;
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AtomusText text={this.state.user.display_name} fontFamily={"NunitoSans_Bold"} fontSize={20} style={styles.header} />
                <Divider />
                <View style={styles.list}>{this._displayCourses()}</View>
                <AtomusText text={"Sign Out"} fontFamily={"NunitoSans_Bold"} style={styles.signout} onPress={this._signOut} />
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
    },
    list: {
        flex: 8,
    },
    list_header: {
        paddingLeft: 12
    },
    listItem: {
        backgroundColor: Colors.beige.opaque,
    },
    header: {
        paddingLeft: 12,
        paddingVertical: 20
    },
    signout: {
        position: "absolute",
        bottom: 0,
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        paddingBottom: 20,
    },
});

Student_Drawer.contextType = AppContext;
export default Student_Drawer;