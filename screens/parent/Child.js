import React, { Component } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements"

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text";
import AtomusCard from "../../components/Card";

class Child extends Component {
  constructor(props) {
    super(props);
    this.childInfo = this.props.navigation.getParam("child_info");
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <AtomusText fontSize={20} text={navigation.getParam("child_info").name} />
    ),
    headerRight: () => <Icon name="account-circle" style={{ marginRight: 16 }} onPress={() => navigation.navigate("ChildDetail", {child_info: navigation.getParam("child_info")})} />
  });

  _displayWork = (string, work_arr) => {
    const work_list = work_arr.map((work, index) => {
      return (
        <AtomusCard
          key={index}
          status={work.status}
          title={work.title}
          description={work.description}
          due_date={work.due_date}
          onPress={() =>
            this.props.navigation.navigate("Coursework", { coursework: work })
          }
        />
      );
    });
    work_list.unshift(
      <AtomusText
        key={-1}
        text={string}
        fontSize={20}
        style={{ textAlign: "center", paddingHorizontal: 16 }}
      />
    );
    work_list.push(<View key={-2} style={{ paddingBottom: 16 }} />);
    return work_list;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <ScrollView contentContainerStyle={styles.list}>
            {this._displayWork("Late Assignments", this.childInfo.late)}
            {this._displayWork("Upcoming Assignments", this.childInfo.upcoming)}
            {this._displayWork("Completed Assignments", this.childInfo.done)}
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
export default Child;
