import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { ListItem, Icon, Input, Button } from 'react-native-elements'
class Drawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                { title: "Atomus", classId: 0 },
                { title: "Math", classId: 1 }
            ],
            index: 0,
        }
        this.addclass = this.addclass.bind(this);

    }
    addclass(name, id) {
        tempList = this.state.list;
        tempList.push({ title: name, classId: id });
        this.setState({ list: tempList });
    }
    render() {

        return (
            <SafeAreaView style={styles.background}>
                <View style={styles.signout}>
                    <Button title="Home" buttonStyle={{ height: "100%" }} onPress={() => {
                        this.props.navigation.navigate("Home");
                    }} />
                </View>
                <View style={styles.list}>{
                    this.state.list.map((item, i) => (


                        <ListItem key={i} bottomDivider
                            onPress={() => {
                                this.setState({ index: i });
                                console.log("index: " + i);
                                this.props.navigation.navigate("Class", { title: item.title });
                            }}
                            containerStyle={{ backgroundColor: (this.state.index == i) ? "green" : "white" }}
                        >
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }</View>
                <View style={styles.signout}>
                    <Button title="Sign Out" buttonStyle={{ height: "100%" }} onPress={() => { this.addclass("hello", 2); }} />
                </View>
            </SafeAreaView>
        );
    };
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "space-between"
    },
    list: {
        flex: 8,
    },
    signout: {
        flex: 1,
        alignContent: "stretch",
    },
});
export default Drawer;