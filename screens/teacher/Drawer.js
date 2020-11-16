import React, { Component } from "react"
import { SafeAreaView, View, StyleSheet, Text } from "react-native"
import { ListItem, Icon, Input, Button, Divider } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext"

import Colors from "../../constants/Colors"
import AtomusText from "../../components/Text"

class Teacher_Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    UNSAFE_componentWillMount() {
        let { state } = this.context;
        this.setState({ user: state.user, credentials: state.credentials });
    }

    _signOut = async () => {
        await this.context.logoutUser(this.state.credentials.access_token);
        this.props.navigation.navigate("Splash");
    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AtomusText text={this.state.user.display_name} fontFamily={"NunitoSans_Bold"} fontSize={20} style={styles.header} />
                <Divider />
                <View style={{flex: 8}}/>
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
    header: {
        paddingLeft: 12,
        paddingVertical: 20
    },
    signout : {
        flexDirection: "column",
        justifyContent: "flex-end",
        textAlign: "center",
        marginBottom: 20
    }
});

Teacher_Drawer.contextType = AppContext;
export default Teacher_Drawer;
