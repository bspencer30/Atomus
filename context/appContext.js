import createDataContext from './createDataContext';
import User from '../backend/models/User'
import Course from '../backend/models/Course'
import userService from '../backend/services/userService'
import courseService from '../backend/services/courseService'

//adapted from 'BalanceMe' @Kory Brantley with permission @Rahul  
const authReducer = (state, action) => {
    switch (action.type) {
        case "login_user":
            return { ...state, user: action.user, credentials: action.credentials }
        case "login_user":
            return { ...state, user: action.user, credentials: action.credentials }
        case "add_courses":
            return { ...state, courses: action.courses }
        case "login_error":
            return { ...state, login_err_msg: action.login_err_msg }
        default:
            return state;
    }
}
const loginUser = (dispatch) => {
    return async (user_type) => {
        var user_con = await userService.googleLogin(user_type).then(user_con => { return user_con });
        if (user_con.status == "user_cancel") {
            dispatch({ type: "login_error", login_err_msg: { "message": user_con.message, "status": user_con.status } })
        } else {
            var user = new User(user_con.user.display_name, user_con.user.email, user_con.user.uid, user_con.user.user_type);
            dispatch({ type: "login_user", user: user, credentials: user_con.credentials })
        }
    }
}

const logoutUser = (dispatch) => {
    return async(access_token) => {
        var result = userService.googleLogout(access_token);
        dispatch({type: "logout_user", user: null, credentials: null})
    }
}

const getCourses = (dispatch) => {
    return async(access_token) => {
        var courses = [];
        var course_data = await courseService.getCourses(access_token);      
        course_data.forEach(course => {
            if(course.courseState == "ACTIVE"){
                courses.push(new Course(course.id, course.name));
            }
        })
        dispatch({type: "add_courses", courses: courses})
     }
}




export const { Provider, Context } = createDataContext(
    authReducer, {
    loginUser,
    logoutUser,
    getCourses
},
    {
        user: null,
        credentials: null,
        courses: null
    }
)