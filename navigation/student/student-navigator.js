import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { Icon } from 'react-native-elements'
import Student_Classroom from '../../screens/student/Student_Classroom'
import Student_Home from '../../screens/student/Student_Home';

const StudentNavConfig = {
    initialRouteName: 'Home',
};
const RouteConfigs = {
    Home: {
        screen: Student_Home,
        navigationOptions: ({navigation}) => ({
            headerTitle: () => <Text testing />,
            //headerTransparent: true, 
            headerLeft:() => <Icon color ='#2E2F2F' name="menu" onPress={()=>{navigation.openDrawer()}}/>
        })
    },
    
    Class: {
        screen: Student_Classroom,
          navigationOptions: ({navigation}) => ({
            headerTitle: () => <Text testing />,
            //headerTransparent: true, 
            headerLeft:() => <HeaderBackButton labelVisible={false} tintColor='#2E2F2F' onPress={()=>{navigation.goBack()}}/>
        })
    }
};

const StudentNav = createStackNavigator(RouteConfigs, StudentNavConfig);
export default StudentNav;