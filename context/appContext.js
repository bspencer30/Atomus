import createDataContext from './createDataContext';
import User from '../backend/models/User'
import Course from '../backend/models/Course'
import CourseWork from '../backend/models/CourseWork'

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
        } else if (user_con.status == "user_needs_type") {
            dispatch({ type: "login_error", login_err_msg: { "message": user_con.message, "status": user_con.status } })
        } else {
            var user = new User(user_con.user.display_name, user_con.user.email, user_con.user.uid, user_con.user.user_type);
            dispatch({ type: "login_user", user: user, credentials: user_con.credentials })
        }
    }
}

const logoutUser = (dispatch) => {
    return async (access_token) => {
        var result = userService.googleLogout(access_token);
        dispatch({ type: "logout_user", user: null, credentials: null })
    }
}

const getCourses = (dispatch) => {
    return async (access_token) => {
        var courses = [];
        var course_data = await courseService.getCourses(access_token);
        await Promise.all(course_data.map(async (course) => {
            var course_work = await _getCourseWork(access_token, course.id);
            courses.push(new Course(course.id, course.name, course_work));
        }));
        console.log('Adding ' + courses.length + ' courses to appContext.');
        dispatch({ type: "add_courses", courses: courses });
    }
}

const _getCourseWork = async (access_token, course_id) => {
    var course_work = [];
    var work_data = await courseService.getCourseWork(access_token, course_id);
    work_data.forEach(work => {
        console.log(work);
        if (typeof work.dueDate == "undefined") {
            console.log(typeof work.dueDate);
            work.dueDate = { day: 1, month: 1, year: 2020 };
        }
        if (typeof work.dueTime == "undefined") { work.dueTime = { hours: 5, minutes: 30 }; }
        if (typeof work.description == "undefined") { work.description = "No Description" }
        course_work.push(new CourseWork(work.id, work.description, work.dueDate, work.dueTime, work.title));
    })
    return course_work;
}

export const { Provider, Context } = createDataContext(
    authReducer, {
    loginUser,
    logoutUser,
    getCourses,
},
    {
        user: null,
        credentials: null,
        courses: null,
    }
)