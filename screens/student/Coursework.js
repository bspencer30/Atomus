import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusButton from "../../components/Button"

class Student_CourseworkDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coursework: null
        }
        this.coursework = this.props.navigation.getParam("coursework");
        //this.props.navigation.set
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={navigation.getParam("coursework").title} />,
    });




    render() {
        return (
            <View style={styles.container}>
                {console.log()}
                <AtomusText text={"due " + this.coursework.due_date.toDateString()} style={styles.dueDateText} />
                <View style={styles.descriptionContainer}>
                    <AtomusText text={"Description"} color={"#4f4f4f"} />
                    <AtomusText text={this.coursework.description} style={styles.descriptionText} />
                </View>
                <View style={styles.button_group}>
                    <AtomusButton backgroundColor={Colors.soft_pink.opaque} title={"Message Parent"} onPress={() => this.handleRegister("student")} />
                    <AtomusButton backgroundColor={Colors.yellow.opaque} title={"Ask Teacher for Help"} onPress={() => this.handleRegister("parent")} />
                    <AtomusButton backgroundColor={Colors.turquoise.opaque} title={"Submit"} onPress={() => this.handleRegister("teacher")} />
                </View>
            </View>
        );
    }
}
Student_CourseworkDetail.contextType = AppContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
        alignItems: "center",
    },
    dueDateText: {
        textAlign: "center",
        top: (Platform.OS == "ios") ? "8%" : 20
    },
    descriptionContainer: {
        top: "10%",
        margin: 16
    },
    button_group: {
        justifyContent: "space-between",
        height: 200,
        top:"30%"
    },
});

export default Student_CourseworkDetail;