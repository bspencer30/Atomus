import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Teacher_Drawer from '../../screens/teacher/Drawer';
import TeacherNav from './teacher-navigator'

const TeacherDrawerConfig = {
    contentOptions: {
        activeTintColor: '#e91e63',
    },
    contentComponent: props => <Teacher_Drawer {...props} />,
};
RouteConfigs = {
   Routes: TeacherNav
};

const TeacherDrawer = createDrawerNavigator(RouteConfigs, TeacherDrawerConfig);
export default TeacherDrawer;


