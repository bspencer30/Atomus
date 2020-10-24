import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusCard from "../../components/Card"
import dateCalc from "../../utils/dateCalc"

class Student_GuardianList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Manage Guardians"} />,
        headerRight: () => <Icon name="add" size={30} onPress={() => navigation.navigate("GuardianInvite")}/>
    });

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.list}></ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
    },
    list: {
        paddingTop: 24,
        paddingBottom: 50,
    },
    courseName: {
        textAlign: "center"
    }
});

Student_GuardianList.contextType = AppContext;
export default Student_GuardianList;