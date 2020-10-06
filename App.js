import React from 'react';
import Navigator from './navigation';
import { Provider as AppProvider } from './context/appContext'

import * as firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);
export default function App() {
    return (
        <AppProvider>
            <Navigator />
        </AppProvider>
    );
}