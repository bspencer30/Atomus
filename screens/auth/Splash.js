import React, { Component } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Context as AppContext } from "../../context/appContext";
import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text";
import AtomusButton from "../../components/Button";

class Splash extends Component {
    constructor(props) {
        super(props)
        this.navigation = this.props.navigation;
        this.state = {
            loading: false,
        }
    }

    _handleRegister = async (user_type) => {
        await this.context.loginUser(user_type);
        this.setState({ loading: true });
        if (this.context.state.user) {
            console.log("User logged in.")
            switch (this.context.state.user.user_type) {
                case "student":
                    await this.context.getCourses(this.context.state.credentials.access_token);
                    //await this.context.getGuardians(this.context.state.crendentials.access_token);
                    //this.navigation.navigate("Student");
                    this.navigation.navigate("Teacher");
                    break;
                case "parent":
                    this.navigation.navigate("Parent");
                    break;
                case "teacher":
                    this.navigation.navigate("Teacher");
                    break;
                default:
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.containerLoading}>
                    <ActivityIndicator size="large" color={Colors.turquoise.opaque} />
                </View>);
        } else {
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/splash_transparent.png')}
                    />
                    <AtomusText text={"Atomus"} fontSize={40} style={styles.title} />
                    <View style={styles.button_group}>
                        <AtomusButton backgroundColor={Colors.turquoise.opaque} title={"Student"} onPress={() => this._handleRegister("student")} />
                        <AtomusButton backgroundColor={Colors.yellow.opaque} title={"Parent"} onPress={() => this._handleRegister("parent")} />
                        <AtomusButton backgroundColor={Colors.pink.opaque} title={"Teacher"} onPress={() => this._handleRegister("teacher")} />
                        <AtomusText text={"Returning User?"} style={{ textAlign: "right", paddingRight: 8 }} onPress={() => this.navigation.navigate("Login")} />
                    </View>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.beige.opaque,
    },
    containerLoading: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
        alignContent: "center",
        justifyContent: "center",
    },
    image: {
        width: 440,
        height: 440,
    },
    title: {
        position: "absolute",
        top: "27%",
    },
    button_group: {
        justifyContent: "space-between",
        height: 200,
    },
});

Splash.contextType = AppContext;
export default Splash;
