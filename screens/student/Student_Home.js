import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
const axios = require('axios');
export default class Student_Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Student Home</Text>
                <Button title="add" onPress={() => {
                    //const user = this.props.navigation.getParam('user')
                    console.log(global.accessToken);
                    const credential = {
                        "oauthAccessToken": "ya29.a0AfH6SMAUd5m0R3TXKrSFeTaVsBWLza3x7PPSS9oUBCblUvNB96GfbGXATWqS1sNKAzEcf2GhnZNvM478DaSx-kM80YKZ2yqCMLPGeoSdtYybbZNQqqFB7EgHwtuT_kP6PzLp3Y3pBrVfoouFO2VqCAN0_K-rmuVpvYk",
                        "oauthIdToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVlZmZhNzZlZjMzZWNiNWUzNDZiZDUxMmQ3ZDg5YjMwZTQ3ZDhlOTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDk2NDk2MDIyNzg4LWVjMXBhMDhiYXVwM3BmOTJ2dTljcmVoNzZoZjc2djQ3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA5NjQ5NjAyMjc4OC1lYzFwYTA4YmF1cDNwZjkydnU5Y3JlaDc2aGY3NnY0Ny5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNzc5NjQzMDk3NjE3NTExMjc3NiIsImVtYWlsIjoiYmFpbGV5LnNwZW5jZXIwMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkE3cHRPRTd1WUVTN1FkVzhLX0d0aGciLCJub25jZSI6IlF0Wll5XzR1VG1QMFI1dnVBZGg4bzFhYjJKMlplOE5iNm9VUGsybnZOOGMiLCJuYW1lIjoiQmFpbGV5IFNwZW5jZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2pudFhSa21wcFRLMDROTnRGUG5yYUd4ZG1zN3dxZUFtV1kzbFNqPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkJhaWxleSIsImZhbWlseV9uYW1lIjoiU3BlbmNlciIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjAxOTQ3OTExLCJleHAiOjE2MDE5NTE1MTF9.aQxhkKp2lCa9BRBy83qAjSckSJ8tKqEjdSh68xbERg8LanjCI_0JUbeafMuh0AXBbSiSWWAx-e3USIvLq7XUGL2fqhpI319vOVKjn9RFHNGHYL_VczXbR3UMRgPzQ34mNDwYXYkW2UmiLWAFXHOO8rEiCC4QXJhM-TsCI3lUd4URPxap6x8oXGBpH60yaM6MbxgN_0F1aL8UmwxiMcNEhB5KVsRzCE4DFTW5lXGb1GcL9SKBZUkAOG5Hi0DbUsNlQVAttHF2LfEE-5BJozvvCFWi1ORS86GQq4flQ8yJkqZJ0AoVDpPMu_Stt9P0IPjWE4kttOd5kA93tU4XAWJksg",
                        "providerId": "google.com",
                        "signInMethod": "google.com",
                    }
                    var obj = {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + global.accessToken,
                            'scope': "https://www.googleapis.com/auth/classroom.courses.readonly"
                        }

                    }

                    // //console.log(user)
                    // fetch('https://classroom.googleapis.com/v1/courses', obj).then((response) => response.json()).then((responseJson) => console.log(responseJson))

                    axios.get("https://classroom.googleapis.com/v1/courses?key=AIzaSyAI66FcRrU5b7TElUffP4O8EEUD14NAXJc", {
                        headers: {
                            'Authorization': `Bearer ${global.accessToken}`,
                            // 'scope': "https://www.googleapis.com/auth/classroom.courses.readonly"
                        }
                    }).then((response) => {

                        console.log(response.data);

                    }).catch((error) => {
                        console.error(error)
                    });



                }} />
            </View>
        );
    }
}

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
