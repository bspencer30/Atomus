import React, { Component } from "react"
import { View, StyleSheet, Image } from "react-native"

import { Context as AppContext } from "../../context/appContext"
import Colors from "../../constants/Colors"
import AtomusText from "../../components/Text"
import AtomusButton from "../../components/Button"

class Login extends Component {
    constructor(props) {
        super(props)
        this.navigation = this.props.navigation;
    }

    _handleLogin = async () => {
        await this.context.loginUser("NA");
        //console.log(this.context.state.user)
        if (this.context.state.user) {
            console.log("User logged in.");
            switch (this.context.state.user.user_type) {
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
                    source={require('../../assets/images/splash_transparent.png')}
                />
                <AtomusText text={"Login"} fontSize={40} style={styles.title} />
                <AtomusButton backgroundColor={Colors.soft_pink.opaque} style={styles.button} title={"Login"} onPress={() => this._handleLogin()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.beige.opaque,
    },
    image: {
        width: 440,
        height: 440,
    },
    title: {
        position: "absolute",
        top: "27%",
    },
    button: {
        position: "absolute",
        top: "69%"
    }
});

Login.contextType = AppContext;
export default Login;
