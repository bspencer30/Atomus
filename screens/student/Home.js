import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"

class Student_Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={25} text={"Upcoming Assignments"} />,
    });

    UNSAFE_componentWillMount() {
        let { state } = this.context;
        this.setState({ user: state.user, credentials: state.credentials });
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
Student_Home.contextType = AppContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default Student_Home;