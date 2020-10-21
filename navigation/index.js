import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthNavigator from "./auth-navigator";
import StudentDrawer from "./student/drawer-student";
import ParentNavigator from "./parent/parent-navigator";

const RootNavConfig = {
    initialRouteName: "Auth"
}
const RouteConfig = {
    Auth: {
        screen: AuthNavigator
    },
    Student: {
        screen: StudentDrawer,
    },
    Parent: {
        screen: ParentNavigator
    }
}

const RootNavigator = createSwitchNavigator(RouteConfig, RootNavConfig)

export default createAppContainer(RootNavigator);