import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusCard from "../../components/Card"
import AtomusButton from "../../components/Button"

class Parent_AddChild extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Add Child"} />,
    });

    render() {
        console.log(this.context.state.user);
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <AtomusText text={"Child's Name"} fontSize={14} />
                    <TextInput style={styles.input} defaultValue={"Griffin"} />
                    <AtomusText text={"Email Address"} fontSize={14}/>
                    <TextInput style={styles.input} defaultValue={"example@mail.com"} />
                    <AtomusButton title={"Add Child"} backgroundColor={Colors.turquoise.opaque}style={{alignItems: "center"}}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
        padding: 16,
    },
    box: {
        marginTop: 50,
    },
    input: {
        backgroundColor: Colors.beige.semi_transparent,
        borderRadius: 5,
        padding: 15,
        borderColor: "#cdc2a7",
        borderWidth: 1,
        fontFamily: "NunitoSans",
        marginBottom: 20
    },
});

Parent_AddChild.contextType = AppContext;
export default Parent_AddChild;