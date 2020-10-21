import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Parent_Drawer from '../../screens/parent/Drawer';
import ParentNav from './parent-navigator'

const ParentDrawerConfig = {
    contentOptions: {
        activeTintColor: '#e91e63',
    },
    contentComponent: props => <Parent_Drawer {...props} />,
};
RouteConfigs = {
   Routes: ParentNav
};

const ParentDrawer = createDrawerNavigator(RouteConfigs, ParentDrawerConfig);
export default ParentDrawer;


