import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusCard from "../../components/Card"
import dateCalc from "../../utils/dateCalc"
import AtomusButton from "../../components/Button";

class Parent_Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Children"} />,
        headerRight: () => <Icon name="add" style={{ marginRight: 16 }} onPress={() => navigation.navigate("AddChild")} />
    });

    render() {
        if (this.context.state.user.children.length == 0) {
            return (
                <View style={styles.container}>
                    <AtomusButton backgroundColor={Colors.turquoise.opaque} title={"No Children, Add Some"} style={{marginTop: 70}} onPress={() => this.props.navigation.navigate("AddChild")} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
        alignItems: "center"
    },
    addChildButton: {
        backgroundColor: Colors.turquoise.opaque,
        borderRadius: 5,
        padding: 15,
        marginTop: 100,
        marginHorizontal: 16,
        alignItems: "center"
    },


    list: {
        paddingTop: 24,
        paddingBottom: 50,
    },
    courseName: {
        textAlign: "center"
    }
});

Parent_Home.contextType = AppContext;
export default Parent_Home;