import React from "react"
import { Text } from "react-native"
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack"
import { Icon } from "react-native-elements"

import Teacher_Home from "../../screens/teacher/Home"

const TeacherNavConfig = {
    initialRouteName: 'Home',
};
const RouteConfigs = {
    Home: {
        screen: Teacher_Home,
        navigationOptions: ({navigation}) => ({
            //headerTitle: () => <Text/>,
            headerTransparent: true, 
        })
    },
    
};

const TeacherNavigator = createStackNavigator(RouteConfigs, TeacherNavConfig);
export default TeacherNavigator;
