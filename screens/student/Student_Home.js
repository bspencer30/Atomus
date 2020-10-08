import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Context as AppContext } from "../../context/appContext";

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
                <Text style={styles.title}>Student Home</Text>
                <Text style={styles.title}>{this.state.user.display_name}</Text>
                <Button title="add" onPress={() => {
                    console.log('Attempting to get user data')
                    var obj = {
                        method: "GET",
                        headers: new Headers({
                            "Authorization" : "Bearer " + this.state.credentials.access_token,
                        }),
                    }

                    
                    fetch('https://classroom.googleapis.com/v1/courses', obj).then((response) => response.json()).then((responseJson) => console.log(responseJson))





                }} />
            </View>
        );
    }
}
Student_Home.contextType = AppContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default Student_Home;