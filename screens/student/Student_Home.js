import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card , Icon} from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";
import Colors from "../../constants/Colors";

class Student_Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    UNSAFE_componentWillMount() {
        let { state } = this.context;
        this.setState({ user: state.user, credentials: state.credentials });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Upcoming Assignments</Text>
            </View>
        );
    }
}
Student_Home.contextType = AppContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: Colors.beige.six4,
    },
    header: {
        fontSize: 35,
        paddingTop: 45,
        textAlign: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    fullWidth:{
        //width: '100%',
    }
});

export default Student_Home;