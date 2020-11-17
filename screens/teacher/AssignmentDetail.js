import React, { Component } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements"

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text";
import AtomusCard from "../../components/Card";

import AtomusCard_Student from "../../components/Card_Student"

class AssignmentDetail extends Component {
  constructor(props) {
    super(props);
    this.assignmentInfo = this.props.navigation.getParam("assignment_info");
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <AtomusText fontSize={20} text={navigation.getParam("assignment_info").title} />
    ),
  });

    _displayStudents = (student_arr) => {
        const student_list = [];
        for (let i = 0; i < student_arr.length; i++) {
            const student = student_arr[i];
            student_list.push(
                <AtomusCard_Student
                key={i}
                name={student.name}
                status={student.status}
                />
            );
        }
        return student_list;
    };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <ScrollView contentContainerStyle={styles.list}>
            {this._displayStudents(this.assignmentInfo.late)}
            {this._displayStudents(this.assignmentInfo.submitted)}
            {this._displayStudents(this.assignmentInfo.not_submitted)}
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
export default AssignmentDetail;
