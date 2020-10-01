import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

import { Text, View } from '../../components/Themed';


export default class Register extends React.Component {
    onPressRegister = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Register Screen</Text>
                <Button buttonStyle={styles.button} titleStyle={styles.button_text}title='Register with Google' onPress={this.onPressRegister}> </Button>
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
        color: '#000000'
    },
    button_text:{
        fontSize: 18,
        //fontFamily: 'Nunito Sans',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'rgba(245, 176, 203, 0.64)'
    }

});
