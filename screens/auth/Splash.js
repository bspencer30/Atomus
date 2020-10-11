import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import {Context as AppContext } from '../../context/appContext'
import Colors from '../../constants/Colors';

class Splash extends Component {
    constructor(props) {
        super(props)
        this.navigation = this.props.navigation;
    }

    handleRegister = async (user_type) => {
        await this.context.loginUser(user_type);
        if(this.context.state.user){
            console.log("User logged in.")
            switch(this.context.state.user.user_type){
                case "student":
                    await this.context.getCourses(this.context.state.credentials.access_token);
                    this.navigation.navigate("Student");
                    break;
                case "parent":
                    break;
                case "teacher":
                    break;
                default:
            }
        }           
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/icon_light.png')}
                />
                <Text style={styles.title}>Atomus</Text>
                <View style={styles.button_group}>
                    <Button buttonStyle={[styles.button, styles.student]} titleStyle={styles.button_text} title="Student" onPress={() => this.handleRegister("student")}> </Button>
                    <Button buttonStyle={[styles.button, styles.parent]} titleStyle={styles.button_text} title="Parent" onPress={() => this.onPressRegister("parent")}> </Button>
                    <Button buttonStyle={[styles.button, styles.teacher]} titleStyle={styles.button_text} title="Teacher" onPress={() => this.onPressRegister("teacher")}> </Button>
                </View>
                <Text style={styles.returningUser} onPress={() => this.props.navigation.navigate("Login")}>Returning User?</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: Colors.beige.color
    },
    image: {
        position: "absolute",
        width: 516,
        height: 542,
        top: -41
    },
    title: {
        position: "absolute",
        fontWeight: "bold",
        top: 200,
        fontSize: 50,
    },
    button_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    button: {
        width: 280,
        height: 60,
        borderRadius: 15,
    },
    button_group: {
        position: "absolute",
        top: 400,
        justifyContent: 'space-between',
        height: 220,
        backgroundColor: 'rgba(1, 1, 1, 0)'
    },
    student: {
        backgroundColor: Colors.blue.six4,
    },
    parent: {
        backgroundColor: Colors.pink.six4,
    },
    teacher: {
        backgroundColor: Colors.yellow.six4
    },
    returningUser: {
        position: "absolute",
        fontSize: 16,
        fontWeight: "bold",
        top: 630,
        left: 220
    }
});

Splash.contextType = AppContext;
export default Splash;