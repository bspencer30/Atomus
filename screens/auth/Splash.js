import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
import Colors from '../../constants/Colors';

export default class Splash extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //could use this to find out when user is logged and then read their doc to see what use they are
        //however I think for a new user they might not have a document yet
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //console.log(user);
                console.log('User logged IN')
            }
        })
    }
    onPressRegister = async (user_type) => {
        const result = await Google.logInAsync({
            iosClientId: `1096496022788-ec1pa08baup3pf92vu9creh76hf76v47.apps.googleusercontent.com`,
            androidClientId: `1096496022788-4dnpffmibbebtfl912d0617atlvdj03u.apps.googleusercontent.com`,
        });
        if (result.type == 'success') {
            console.log('Attempting to log user in');
            const { idToken, accessToken } = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            firebase.auth().signInWithCredential(credential).then(res => {
                const uid = res.user.uid;
                if (res.additionalUserInfo.isNewUser) {
                    console.log('Logging in New User');
                    //new user added
                    //creating user document for them
                    const name = res.user.displayName;
                    const email = res.user.email;
                    firebase.database().ref("users/" + uid).set({
                        email: email,
                        name: name,
                        user_type: user_type
                    });
                    this.navigatorToScreen(data.user_type);
                } {
                    console.log('Logging in Existing User');
                    //not a new user
                    //get their user type & navigate to that page
                    firebase.database().ref("users/" + uid).once('value').then(snapshot => {
                        console.log('Getting User Data')
                        const data = snapshot.val()
                        this.navigatorToScreen(data.user_type)
                    });
                }
            })
                .catch((error) => {
                    //handle some error
                });
        } else {
            console.log('Google Signin Cancelled.');
        }
        //console.log(result);
    }

    navigatorToScreen = (user_type) => {
        switch (user_type) {
            case 'student':
                console.log('Navigating to Student Home');
                this.props.navigation.navigate('Student_Home');
                break;
            case 'parent':
                console.log('Navigating to Parent Home');

                break;
            case 'teacher':
                console.log('Navigating to Teacher Home');
                break;
            default:

        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/icon_light.png')}
                />
                <Text style={styles.title}>Atomus</Text>
                <View style={styles.button_group}>
                    <Button buttonStyle={[styles.button, styles.student]} titleStyle={styles.button_text} title='Student' onPress={() => this.onPressRegister('student')}> </Button>
                    <Button buttonStyle={[styles.button, styles.parent]} titleStyle={styles.button_text} title='Parent' onPress={() => this.onPressRegister('parent')}> </Button>
                    <Button buttonStyle={[styles.button, styles.teacher]} titleStyle={styles.button_text} title='Teacher' onPress={() => this.onPressRegister('teacher')}> </Button>
                </View>
                <Text style={styles.returningUser} onPress={() => console.log('Navigate to Sign In Page')}>Returning User?</Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'rgba(233, 228, 216, 0.64)'
    },
    image: {
        position: "absolute",
        width: 516,
        height: 542,
        top: -41
    },
    title: {
        position: "absolute",
        fontWeight: "bold",
        top: 200,
        fontSize: 50,
    },
    button_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    button: {
        width: 280,
        height: 60,
        borderRadius: 15,
    },
    button_group: {
        position: "absolute",
        top: 400,
        justifyContent: 'space-between',
        height: 220,
        backgroundColor: 'rgba(1, 1, 1, 0)'
    },
    student: {
        backgroundColor: Colors.blue.six4,
    },
    parent: {
        backgroundColor: Colors.pink.six4,
    },
    teacher: {
        backgroundColor: Colors.yellow.six4
    },
    returningUser: {
        position: "absolute",
        fontSize: 16,
        fontWeight: "bold",
        top: 630,
        left: 220
    }
});
