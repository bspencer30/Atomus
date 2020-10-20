import React from "react"
import { Text } from "react-native"
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack"
import { Icon } from "react-native-elements"

import Student_CourseworkDetail from "../../screens/student/Coursework"
import Student_Course from "../../screens/student/Course"
import Student_Home from "../../screens/student/Home"
import SubmissionCamera from "../../screens/student/Camera"

const StudentNavConfig = {
    initialRouteName: 'Home',
};
const RouteConfigs = {
    Home: {
        screen: Student_Home,
        navigationOptions: ({navigation}) => ({
            headerTitle: () => <Text/>,
            headerTransparent: true, 
            headerLeft:() => <Icon style={{paddingLeft:10}}color ='#2E2F2F' name="menu" onPress={()=>{navigation.openDrawer()}}/>
        })
    },
    
    Class: {
        screen: Student_Course,
          navigationOptions: ({navigation}) => ({
            headerTitle: () => <Text testing />,
            headerTransparent: true, 
            headerLeft:() => <HeaderBackButton labelVisible={false} tintColor='#2E2F2F' onPress={()=>{navigation.goBack()}}/>
        })
    },
    Coursework: {
        screen: Student_CourseworkDetail,
          navigationOptions: ({navigation}) => ({
            //headerTitle: () => <Text testing />,
            headerTransparent: true, 
            headerLeft:() => <HeaderBackButton labelVisible={false} tintColor='#2E2F2F' onPress={()=>{navigation.goBack()}}/>
        })
    },

    Camera: {
        screen: SubmissionCamera,
        navigationOptions: ({navigation}) => ({
            headerTitle: () => <Text/>,
            headerTransparent: true, 
            headerLeft:() => <HeaderBackButton labelVisible={false} tintColor='#2E2F2F' onPress={()=>{navigation.goBack()}}/>
        })
    }




};

const StudentNav = createStackNavigator(RouteConfigs, StudentNavConfig);
export default StudentNav;