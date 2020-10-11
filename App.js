import React, { Component } from "react";
import Navigator from './navigation';
import { AppLoading } from 'expo';
import { Provider as AppProvider } from './context/appContext'
import * as Font from 'expo-font';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            NunitoSans: require("./assets/fonts/Nunito/NunitoSans-Regular.ttf"),
            NunitoSans_Bold: require("./assets/fonts/Nunito/NunitoSans-Bold.ttf")
        })
        this.setState({ fontLoaded: true })
    }


    render() {
        if (this.state.fontLoaded) {
            return (
                <AppProvider>
                    <Navigator />
                </AppProvider >
            );
        } else {
            return (
                <AppLoading />
            );
        }
    }
}