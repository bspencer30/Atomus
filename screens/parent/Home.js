import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusCard_Child from "../../components/Card_Child"
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


    _displayChildren = () => {
        const { children } = this.context.state.user;
        const child_list = [];
        
        for (const key in children) {
            const child = children[key]
            child_list.push(<AtomusCard_Child key={key} name={child.name} email={child.email} />)
        }
        return child_list;
    }

    render() {
        if (!this.context.state.user.children[0]) {
            return (
                <View style={[styles.container, { alignItems: "center" }]}>
                    <AtomusButton backgroundColor={Colors.turquoise.opaque} title={"No Children, Add Some"} style={{ marginTop: 70 }} onPress={() => this.props.navigation.navigate("AddChild")} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.list}>{this._displayChildren()}</ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
    },
    addChildButton: {
        backgroundColor: Colors.turquoise.opaque,
        borderRadius: 5,
        padding: 15,
        marginTop: 100,
        marginHorizontal: 16,
    },
    list: {
        paddingTop: 50,
        paddingBottom: 50,
    },
    courseName: {
        textAlign: "center"
    }
});

Parent_Home.contextType = AppContext;
export default Parent_Home;