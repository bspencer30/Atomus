import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { ListItem, Icon, Input, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';

import * as firebase from 'firebase';

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

    signOut() {
        firebase.auth().signOut();
        this.props.navigation.navigate('Splash');
    }
    componentDidMount() {
        //fetch('https://classroom.googleapis.com/v1/courses', {studentId: 'me'}).then((response) => console.log(response));
        console.log(this.props.navigation.getParam('user'));
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
                        <ListItem key={i}
                            bottomDivider
                            onPress={() => {
                                //this.setState({ index: i });
                                //console.log("index: " + i);
                                console.log('Attempting to navigate to ' + item.title);
                                //this.props.navigation.toggleDrawer()
                                this.props.navigation.navigate('Class', {title: item.title});
                                //this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Class', params: {title: item.title}}));

                                
                            }}
                            //containerStyle={{ backgroundColor: (this.state.index == i) ? "green" : "white" }}
                            >
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }</View>
                <View style={styles.signout}>
                    <Button title="Sign Out" buttonStyle={{ height: "100%" }} onPress={() => this.signOut()} />
                </View>
            </SafeAreaView>
        );
    };
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    list: {
        flex: 8,
    },
    signout: {
        flex: 1,
        alignContent: "stretch",

        //width: '50%'
    },
});
export default Drawer;