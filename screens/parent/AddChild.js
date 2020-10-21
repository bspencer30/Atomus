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
        this.state = {
            child_name: "",
            child_email: "",
            user: null
        }
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Add Child"} />,
    });

    componentDidMount() {
        const { user } = this.context.state;
        this.setState({user: user})
    }

    _addChild = async () => {
        //TODO input checking
        const { user } = this.state; 
        const { child_name, child_email } = this.state;
        await this.context.addChild(user, {name: child_name, email: child_email });  
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <AtomusText text={"Child's Name"} fontSize={14} />
                    <TextInput style={styles.input} placeholder="Griffin" onChangeText={(text) => this.setState({child_name: text})}/>
                    <AtomusText text={"Email Address"} fontSize={14}/>
                    <TextInput style={styles.input} placeholder="example@mail.com" onChangeText={(text) => this.setState({child_email: text})}/>
                    <AtomusButton title={"Add Child"} backgroundColor={Colors.turquoise.opaque} style={{alignItems: "center"}} onPress={() => this._addChild()}/>
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