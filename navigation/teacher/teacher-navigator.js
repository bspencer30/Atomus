import React from "react"
import { Text } from "react-native"
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack"
import { Icon } from "react-native-elements"

import Teacher_Home from "../../screens/teacher/Home"
import ClassView from "../../screens/teacher/ClassView"
import AssignmentDetail from "../../screens/teacher/AssignmentDetail"

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
    ClassView: {
        screen: ClassView,
        navigationOptions: ({navigation}) => ({
            headerLeft: () => <HeaderBackButton labelVisible={false} tintColor="#2E2F2F" onPress={()=>{navigation.goBack()}}/>,
            heaterTransparent: true,
        })
    },
    AssignmentDetail: {
        screen: AssignmentDetail,
        navigationOptions: ({navigation}) => ({
            headerLeft: () => <HeaderBackButton labelVisible={false} tintColor="#2E2F2F" onPress={()=>{navigation.goBack()}}/>,
            heaterTransparent: true,
        })
    },
    
};

const TeacherNavigator = createStackNavigator(RouteConfigs, TeacherNavConfig);
export default TeacherNavigator;
