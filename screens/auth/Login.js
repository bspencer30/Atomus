import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AppContext} from '../../context/appContext'
import Colors from '../../constants/Colors'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.navigation = this.props.navigation;
    }

    handleRegister = async (user_type) => {
        await this.context.loginUser(user_type);
        if(this.context.state.user != null){
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
            <View style={styles.container} >
                <Image
                    style={styles.image}
                    source={require('../../assets/images/icon_light.png')}
                />
                <Text style={styles.title} >Login</Text>
                <View style={styles.button_group}>
                    <Button buttonStyle={styles.button}
                    titleStyle={styles.button_text}
                    title="Login"
                    onPress={() => this.handleRegister("student")}> </Button>
                </View>
                <Text Login Page />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: Colors.beige.six4
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
        backgroundColor: 'rgba(68, 175, 105, .64)'
    },
    button_group: {
        position: "absolute",
        top: 480,
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
Login.contextType = AppContext;
