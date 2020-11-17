import React, { Component } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements"

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text";
import AtomusCard from "../../components/Card";

import AtomusCard_Assignment from "../../components/Card_Assignment"

class ClassView extends Component {
  constructor(props) {
    super(props);
    this.classInfo = this.props.navigation.getParam("class_info");
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <AtomusText fontSize={20} text={navigation.getParam("class_info").name} />
    ),
  });

    _displayAssignments = (assignment_arr) => {
        const assignment_list = [];
        for (let i = 0; i < assignment_arr.length; i++) {
            const assignment = assignment_arr[i];
            assignment_list.push(
                <AtomusCard_Assignment
                key={i}
                title={assignment.title}
                late={assignment.late.length}
                submitted={assignment.submitted.length}
                not_submitted={assignment.not_submitted.length}
                onPress={
                    ()=>{this.props.navigation.navigate("AssignmentDetail", {assignment_info: assignment})}
                }/>
            );
        }
        return assignment_list;
    };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <ScrollView contentContainerStyle={styles.list}>
            {this._displayAssignments(this.classInfo.coursework)}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    marginTop: 50,
  },
  containerLoading: {
    flex: 1,
    backgroundColor: Colors.beige.opaque,
    padding: 16,
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.beige.opaque,
  },
  list: {},
});
export default ClassView;
