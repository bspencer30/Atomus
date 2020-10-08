import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as AppContext } from "../../context/appContext";
import Colors from "../../constants/Colors";

class Student_Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    UNSAFE_componentWillMount() {
        let { state } = this.context;
        this.setState({ user: state.user, credentials: state.credentials });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Today's Assignments</Text>
            </View>
        );
    }
}
Student_Home.contextType = AppContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: Colors.beige.six4
    },
    header: {
        fontSize: 35,
        paddingTop: 45
        //fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default Student_Home;