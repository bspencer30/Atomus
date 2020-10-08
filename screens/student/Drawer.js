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
        this.context.getCourses(state.credentials.access_token);
        this.setState({ user: state.user, credentials: state.credentials, });
    }

    _signOut = async () => {
        await this.context.logoutUser(this.state.credentials.access_token);
        this.props.navigation.navigate('Splash');
    }

    _displayCourses = () => {
        var courses = this.context.state.courses;
        if (courses.length == 0) {
            return (
                <ListItem title={<Text> No Classes </Text>} />
            )
        } else {
            const course_list = courses.map((course, index) => {
                return (
                    <ListItem key={index} bottomDivider onPress={() => { this.props.navigation.navigate('Class', { course: course }); }}>
                        <ListItem.Content>
                            <ListItem.Title>{course.name} </ListItem.Title>
                        </ListItem.Content>
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
                <View style={styles.signout}>
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
        backgroundColor: Colors.beige.six4
    },
    list: {
        flex: 8,
    },
    signout: {
        flex: 1,
        alignContent: "stretch",

    },
    header: {
        padding: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E2F2F'
    },
    mediumText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#2E2F2F'
    }
});
export default Student_Drawer;