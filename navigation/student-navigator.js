import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import StudentDrawer from './drawer-student';

import Student_Home from '../screens/student/Student_Home';

const StudentNavigatorConfig = {
    initialRouteName: 'StudentDrawer',
    //headerMode: 
};
const RouteConfigs = {
    StudentDrawer: StudentDrawer,
};

const StudentNavigator = createStackNavigator(RouteConfigs, StudentNavigatorConfig);
export default StudentNavigator;