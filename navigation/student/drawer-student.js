import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Drawer from '../../screens/drawer/Drawer';
import StudentNav from './student-navigator'

const StudentDrawerConfig = {
    contentOptions: {
        activeTintColor: '#e91e63',
    },
    contentComponent: props => <Drawer {...props} />,
};
RouteConfigs = {
   Routes: StudentNav
};

const StudentDrawer = createDrawerNavigator(RouteConfigs, StudentDrawerConfig);
export default StudentDrawer;


