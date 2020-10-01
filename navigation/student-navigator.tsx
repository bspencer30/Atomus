import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Student_Home from '../screens/student/Student_Home';

const StudentNavigatorConfig = {
    initialRouteName: 'Student_Home'
};
const RouteConfigs = {
    Student_Home: Student_Home
};

const StudentNavigator = createStackNavigator(RouteConfigs, StudentNavigatorConfig);
export default StudentNavigator;