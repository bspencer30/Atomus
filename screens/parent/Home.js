import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusCard_Child from "../../components/Card_Child"
import AtomusButton from "../../components/Button";
const data = require('../../backend/local_storage/parent_data.json');
class Parent_Home extends Component {
    constructor(props) {
        super(props);
        this.state = {children: data.children};
    }
   
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Children"} />,
        headerRight: () => <Icon name="add" style={{ marginRight: 16 }} onPress={() => navigation.navigate("AddChild")} />
    });

           
    
    _displayChildren = () => {
        
        const child_list = [];
        
        for (const key in this.state.children) {
            const child = this.state.children[key];
            let late_count = 0;
            child.courses.filter(x=> 
                late_count += x.courseWork.filter(y => (y.assignmentSubmission.late) && (y.assignmentSubmission.state =="new")).length
            );
            let done_count = 0;
            child.courses.filter(x=> 
                done_count += x.courseWork.filter(y => (y.assignmentSubmission.state =="turnedIn")).length
            );
            let upcoming_count = 0;
            child.courses.filter(x=> 
                upcoming_count += x.courseWork.filter(y => (y.assignmentSubmission.late)).length
            );
            child_list.push(<AtomusCard_Child key={key} name={child.name} email={child.email} 
                late={late_count} done={done_count} upcoming={upcoming_count}/>)
        }
        return child_list;
    }

    render() {
        if (this.state.children.length == 0) {
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