import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { ListItem, Icon, Input, Button } from 'react-native-elements'
import { Context as AppContext } from '../../context/appContext';
import Colors from '../../constants/Colors';

class Student_Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    UNSAFE_componentWillMount() {
        let { state } = this.context;
        this.setState({ user: state.user, credentials: state.credentials, courses: state.courses});
    }

    _signOut = async () => {
        await this.context.logoutUser(this.state.credentials.access_token);
        this.props.navigation.navigate('Splash');
    }

    _displayCourses = () => {
        var courses = this.state.courses;
        if (courses == null || courses.length == 0 || false) {
            return (
                <ListItem containerStyle={styles.listItem}>
                    <ListItem.Title> No Enrolled Courses </ListItem.Title>
                </ListItem>
            )
        } else {
            const course_list = courses.map((course, index) => {
                return (
                    <ListItem key={index} containerStyle={styles.listItem} bottomDivider onPress={() => { this.props.navigation.navigate('Class', { course: course }); }}>
                        <ListItem.Content>
                            <ListItem.Title>{course.name} </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color="#2E2F2F" />
                    </ListItem>)
            })
            return course_list;
        }
    }



    render() {
        return (
            <SafeAreaView style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.state.user.display_name} </Text>
                </View>
                <View style={styles.list}>{this._displayCourses()}</View>
                <View style={[styles.bottomCentered, styles.signoutContainer]}>
                    <Text style={styles.mediumText} onPress={this._signOut}> Sign Out </Text>
                </View>
            </SafeAreaView>
        );
    };
}
Student_Drawer.contextType = AppContext;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'center',
        backgroundColor: Colors.beige.six4,
    },
    list: {
        flex: 8,
    },
    listItem: {
        backgroundColor: Colors.beige.color,
    },
    header: {
        paddingLeft: 12,
        paddingVertical: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.grey.color
    },
    mediumText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.grey.color
    },
    regularText:{
        textAlign: "center",
        fontSize: 14,
        color: Colors.grey.color
    },
    bottomCentered:{
        position: "absolute",
        bottom: 0,
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,    
    },
    signoutContainer: {
        paddingBottom: 20,
    },
});
export default Student_Drawer;