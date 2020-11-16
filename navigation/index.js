import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthNavigator from "./auth-navigator";
import StudentDrawer from "./student/drawer-student";
import ParentDrawer from "./parent/drawer-parent";
import TeacherDrawer from "./teacher/drawer-teacher";

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
    },
    Teacher: {
        screen: TeacherDrawer
    },
}

const RootNavigator = createSwitchNavigator(RouteConfig, RootNavConfig)

export default createAppContainer(RootNavigator);
