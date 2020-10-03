import React from 'react';
import Navigator from './navigation';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

const App = () => <Navigator />;
export default App;