import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthNavigator from "./auth-navigator";
import StudentDrawer from "./student/drawer-student";
import ParentDrawer from "./parent/drawer-parent";

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
        screen: ParentDrawer
    }
}

const RootNavigator = createSwitchNavigator(RouteConfig, RootNavConfig)

export default createAppContainer(RootNavigator);