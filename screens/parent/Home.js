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
        this.childPress = this.childPress.bind(this);
    }
   
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Children"} />,
        headerRight: () => <Icon name="add" style={{ marginRight: 16 }} onPress={() => navigation.navigate("AddChild")} />
    });

    _displayChildren = () => {
        const child_list = [];

        for(const child_key in this.state.children){
            const child = this.state.children[child_key];
            var done_count = 0;
            var late_count = 0;
            var upcoming_count = 0;

            var done_list = [];
            var late_list = [];
            var upcoming_list = [];

            //courses is an array of courses that a child has
            const courses = child.courses;

            for(const course_key in courses){
                const course = courses[course_key];
                const course_name = course.name;
                const coursework = course.coursework;
                for(const i in coursework){
                    const work = coursework[i];
                    work.course_name = course_name;
                    var date = new Date();
                    switch(work.status){
                        case "done":
                            done_count += 1;
                            work.due_date = date;
                            done_list.push(work);
                            break;
                        case "late":
                            late_count += 1;
                            date.setFullYear(2020, date.getMonth() - (Math.random()), date.getDay() - ((Math.random() * 15) + 1));
                            work.due_date = date;
                            late_list.push(work);
                            break;
                        case "upcoming":
                            upcoming_count += 1;
                            date.setFullYear(2020, date.getMonth() + (Math.random() + 1), date.getDay() + ((Math.random() * 7) + 1));
                            work.due_date = date;
                            upcoming_list.push(work);
                            break;                        
                    }
                }
                child.done = done_list;
                child.late = late_list;
                child.upcoming = upcoming_list;
            }

            child_list.push(<AtomusCard_Child key={child_key} name={child.name} email={child.email} 
                late={late_count} done={done_count} upcoming={upcoming_count} onPress={() => this.props.navigation.navigate("Child", {child_info: child})}/>)
        }
        return child_list;
    }
    
           
    childPress(key) {
        const child = this.state.children[key];

        this.props.navigation.navigate("Child", 
            {
                child_info: child
            }
        );
    }
    
    // _displayChildren = () => {
        
    //     const child_list = [];
        
    //     for (const key in this.state.children) {
    //         const child = this.state.children[key];
    //         var late_count = 0;
    //         child.courses.filter(x=> 
    //             late_count += x.courseWork.filter(y => (y.assignmentSubmission.late) && (y.assignmentSubmission.state =="new")).length
    //         );
    //         var done_count = 0;
    //         child.courses.filter(x=> 
    //             done_count += x.courseWork.filter(y => (y.assignmentSubmission.state =="turnedIn")).length
    //         );
    //         var upcoming_count = 0;
    //         child.courses.filter(x=> 
    //             upcoming_count += x.courseWork.filter(y => !(y.assignmentSubmission.late) && (y.assignmentSubmission.state =="new")).length
    //         );
    //         child_list.push(<AtomusCard_Child key={key} name={child.name} email={child.email} 
    //             late={late_count} done={done_count} upcoming={upcoming_count} onPress={this.childPress} child_key={key}/>)
    //     }
    //     return child_list;
    // }

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