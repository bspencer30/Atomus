import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text";

class ChildDetail extends Component {
  constructor(props) {
    super(props);
    this.childInfo = this.props.navigation.getParam("child_info");
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <AtomusText fontSize={20} text={navigation.getParam("child_info").name + "'s Info"} />
    ),
  });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <View
            style={{
              backgroundColor: Colors.beige.semi_transparent,
              borderRadius: 5,
              borderColor: Colors.beige.dark,
              borderWidth: 1,
              padding: 8,
              marginHorizontal: 16,
            }}
          >
            <AtomusText
              text={"Email: " + this.childInfo.email}
              style={{ color: "#4f4f4f" }}
            />
            <AtomusText
              text={"School: " + this.childInfo.school}
              style={{ color: "#4f4f4f" }}
            />
            <AtomusText
              text={"Grade: " + this.childInfo.grade}
              style={{ color: "#4f4f4f" }}
            />
            <AtomusText
              text={"Age: " + this.childInfo.age}
              style={{ color: "#4f4f4f" }}
            />
          </View>
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
});
export default ChildDetail;
