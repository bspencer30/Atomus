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
        this.state = {}
    }

    componentDidMount() {
        //could use this to find out when user is logged and then read their doc to see what use they are
        //however I think for a new user they might not have a document yet
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
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
            console.log(accessToken)
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            firebase.auth().signInWithCredential(credential).then(res => {
                const uid = res.user.uid;
                if (res.additionalUserInfo.isNewUser) {
                    console.log('Logging in New User \nCreating User Doc');
                    const user = {
                        email: res.user.email,
                        name: res.user.displayName,
                        user_type: user_type
                    }
                    firebase.database().ref("users/" + uid).set(user);
                    const user_con = {user: user, uid: uid, credential: credential }                  
                    this.navigatorToScreen(data.user_type, user_con);
                } {
                    console.log('Logging in Existing User : ' + uid);
                    firebase.database().ref("users/" + uid).once('value').then(snapshot => {
                        console.log('Getting User Data : ' + snapshot.val().user_type)
                        const data = snapshot.val()
                        const user_con = {
                            user: {
                                email: data.email,
                                name: data.displayName,
                                user_type: data.user_type,
                            },
                            uid: uid,
                            crededial: credential
                        }
                        this.navigatorToScreen(data.user_type, user_con)
                    });
                }
            })
                .catch((error) => {
                    //handle some error
                });
        } else {
            console.log('Google Sign-in Cancelled.');
        }
    }

    navigatorToScreen = (user_type, user_con) => {
        switch (user_type) {
            case 'student':
                //console.log('Navigating to Student Home' + user);
                this.props.navigation.navigate('Student');
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
                <Text style={styles.returningUser} onPress={() => this.props.navigation.navigate('Login')}>Returning User?</Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: Colors.beige.six4
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
