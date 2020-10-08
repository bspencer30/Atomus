import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Student_Drawer from '../../screens/student/Drawer';
import StudentNav from './student-navigator'

const StudentDrawerConfig = {
    contentOptions: {
        activeTintColor: '#e91e63',
    },
    contentComponent: props => <Student_Drawer {...props} />,
};
RouteConfigs = {
   Routes: StudentNav
};

const StudentDrawer = createDrawerNavigator(RouteConfigs, StudentDrawerConfig);
export default StudentDrawer;


