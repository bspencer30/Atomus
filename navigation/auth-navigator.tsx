import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from '../screens/auth/Splash';

const AuthNavigatorConfig = {
    initialRouteName: 'Splash',
};
const RouteConfigs = {
   Splash: {
        screen: Splash,
        navigationOptions: {
            headerShown: false,
        }
    }
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);
export default AuthNavigator;