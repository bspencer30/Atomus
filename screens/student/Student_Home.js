import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Context as AppContext } from "../../context/appContext";

//doesnt seem to work with Expo Client
//import { google } from 'googleapis';

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
                    //console.log("Credentials" + this.state.credentials)
                    const client_id = "1096496022788-o87pjm6se2qames5a2h1m2qeb6dl75pl.apps.googleusercontent.com";
                    const client_secret = "43M-ppsf_ZlXeBh1WEU7RUeE";
                    
                    //const oAuth2Client = new google.auth.OAuth2(client_id, client_secret);
                    //oAuth2Client.setCredentials(this.state.credentials);



                    var obj = {
                        method: "GET",
                        headers: new Headers({
                            "Authorization" : "Bearer " + this.state.credentials.access_token,
                            "scope": "https://www.googleapis.com/auth/classroom.courses.readonly"
                        }),
                        //credentials: "same-origin"
                    }

                    console.log(this.state.credentials.access_token)
                    fetch('https://classroom.googleapis.com/v1/courses', obj, {credentials: "same-origin"}).then((response) => response.json()).then((responseJson) => console.log(responseJson))





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