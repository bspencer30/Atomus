import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthNavigator from './auth-navigator';
import StudentNavigator from './student-navigator';

const RootNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        Student: StudentNavigator
    },
    {
        initialRouteName: 'Auth'
    }
);
export default createAppContainer(RootNavigator);