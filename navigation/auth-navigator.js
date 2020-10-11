import * as React from "react";
import { Text } from "react-native";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";

import Splash from "../screens/auth/Splash";
import Login from "../screens/auth/Login";

const AuthNavigatorConfig = {
    initialRouteName: "Splash",
};
const RouteConfigs = {
    Splash: {
        screen: Splash,
        navigationOptions: {
            headerShown: false,
        }
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerTitle: () => <Text />,
            headerTransparent: true,
            headerLeft: () => <HeaderBackButton tintColor={'#000000'} labelVisible={false} onPress={() => { navigation.navigate("Splash") }} />
        }),
    }
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);
export default AuthNavigator;