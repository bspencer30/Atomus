import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Register from '../screens/Auth/Register';

const AuthNavigatorConfig = {
    initialRouteName: 'Register'
};
const RouteConfigs = {
    Register: Register
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);
export default AuthNavigator;