import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"

class Student_Coursework_Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={25} text={"Assignment Detail"} />,
    });

    

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
Student_Coursework_Detail.contextType = AppContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
    },
});

export default Student_Coursework_Detail;