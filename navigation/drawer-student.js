import React from 'react';

import { Button, useWindowDimensions, View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Student_Home from '../screens/student/Student_Home';
import Student_Classroom from '../screens/student/Student_Classroom';
import Drawer from './Drawer';

// const Drawer = createDrawerNavigator();
const StudentNavigatorConfig = {
    initialRouteName: 'Home',
    //headerMode: 
};
RouteConfigs = {
    Home: Student_Home,
    Class: Student_Classroom,
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


