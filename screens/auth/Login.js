import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import Colors from '../../constants/Colors'

export default class Login extends React.Component {

    render() {
        return (
            <View style={styles.container} >
                <Image
                    style={styles.image}
                    source={require('../../assets/images/icon_light.png')}
                />
                <Text Login Page />
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