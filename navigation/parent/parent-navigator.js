import React from "react"
import { Text } from "react-native"
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack"
import { Icon } from "react-native-elements"

import Parent_Home from "../../screens/parent/Home"
import Parent_AddChild from "../../screens/parent/AddChild"
import Child from "../../screens/parent/Child"

const ParentNavConfig = {
    initialRouteName: 'Home',
};
const RouteConfigs = {
    Home: {
        screen: Parent_Home,
        navigationOptions: ({navigation}) => ({
            //headerTitle: () => <Text/>,
            headerTransparent: true, 
        })
    },
    AddChild: {
        screen: Parent_AddChild,
        navigationOptions: ({navigation}) => ({
            //headerTitle: () => <Text/>,
            headerLeft: () => <HeaderBackButton labelVisible={false} tintColor="#2E2F2F" onPress={()=>{navigation.goBack()}}/>,
            headerTransparent: true, 
        })
    },
    Child: {
        screen: Child,
        navigationOptions: ({navigation}) => ({
            //headerTitle: () => <Text/>,
            headerLeft: () => <HeaderBackButton labelVisible={false} tintColor="#2E2F2F" onPress={()=>{navigation.goBack()}}/>,
            headerTransparent: true, 
        })
    },
    
};

const ParentNavigator = createStackNavigator(RouteConfigs, ParentNavConfig);
export default ParentNavigator;