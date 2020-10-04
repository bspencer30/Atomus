import React from 'react';

import { Button, useWindowDimensions, View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Student_Home from '../screens/student/Student_Home';
import Drawer from './Drawer';

// const Drawer = createDrawerNavigator();
const StudentNavigatorConfig = {
    initialRouteName: 'Student_Home',
    //headerMode: 
};
RouteConfigs = {
    Home: Student_Home,
};
const StudentDrawerNavigatorConfig = {
    initialRouteName: 'Home',
    contentOptions: {
        activeTintColor: '#e91e63',
    },
    contentComponent: props => <Drawer {...props} />,
};

const StudentDrawer = createDrawerNavigator(RouteConfigs, StudentDrawerNavigatorConfig);
export default StudentDrawer;


