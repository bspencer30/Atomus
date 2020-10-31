import createDataContext from "./createDataContext";
import User from "../backend/models/User";
import Course from "../backend/models/Course";
import Coursework from "../backend/models/Coursework";
import Submission from "../backend/models/Submission";

import userService from "../backend/services/userService";
import courseService from "../backend/services/courseService";
import dateCalc from "../utils/dateCalc";

//adapted from 'BalanceMe' @Kory Brantley with permission @Rahul  
const authReducer = (state, action) => {
    switch (action.type) {
        case "login_user":
            return { ...state, user: action.user, credentials: action.credentials }
        case "login_user":
            return { ...state, user: action.user, credentials: action.credentials }
        case "add_courses":
            return { ...state, courses: action.courses }
        case "add_child":
            return { ...state, user: action.user }
        case "add_guardians":
            return { ...state, guardians: action.guardians}
        case "add_guardian_invitations":
            return { ...state, invitations: action.invitations}
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
            var coursework = await _getCoursework(access_token, course.id);
            courses.push(new Course(course.id, course.guardiansEnabled, course.name, coursework));
        }));
        console.log('Adding ' + courses.length + ' courses to appContext.');
        courses.sort((a, b) => (a.name.charAt(0) - b.name.charAt(0) > 0) ? 1 : -1)
        dispatch({ type: "add_courses", courses: courses });
    }
}

const _getCoursework = async (access_token, course_id) => {
    var coursework = [];
    var work_data = await courseService.getCoursework(access_token, course_id);
    await Promise.all(work_data.map(async (work) => {
        var date = new Date();
        if (typeof work.dueDate != "undefined") { date.setFullYear(work.dueDate.year, (work.dueDate.month - 1), work.dueDate.day - 1) }
        if (typeof work.dueTime != "undefined") { date.setHours(work.dueTime.hours, work.dueTime.minutes) }
        if (typeof work.description == "undefined") { work.description = "" }

        var submission = await _getSubmission(access_token, course_id, work.id);

        coursework.push(new Coursework(course_id, work.id, work.description, date, submission, work.title));
    }))
    coursework.sort((a, b) => ((dateCalc.dateDiffInDays(a.due_date, b.due_date) < 0 ) ? 1 : -1))
    return coursework;
}

const _getSubmission = async (access_token, course_id, coursework_id) => {
    const submission = await courseService.getSubmission(access_token, course_id, coursework_id);
    if (typeof submission == "undefined") return (new Submission());
    else return (new Submission(submission.courseWorkType, submission.id, submission.state));
}

const submitWork = (dispatch) => {
    return async (access_token, course_id, coursework_id, submission_id, drive_obj) => {
        var result = await courseService.submitWork(access_token, course_id, coursework_id, submission_id, drive_obj);
        return result
    }
}

const getGuardians = (dispatch) => {
    return async (access_token) => {
        var guardians = await userService.getGuardians(access_token);
        if (typeof guardians == "undefined") guardians = [];
        dispatch({ type: "add_guardians", guardians: guardians});
    }
}

const inviteGuardian = (dispatch) => {
    return async (access_token, invited_email) => {
        var guardian = await userService.inviteGuardian(access_token, invited_email);       
        console.log(guardian);
    }
}

const getGuardianInvitations = (dispatch) => {
    return async (access_token) => {
        var invitations = await userService.getGuardianInvitations(access_token);
        if (typeof invitations == "undefined") invitations = [];
        dispatch({ type: "add_guardian_invitations", invitations: invitations});
    }
}

const deleteInvitation = (dispatch) => {
    return async (access_token, invite_id) => {
        var guardianInvitation = await userService.deleteInvitation(access_token, invite_id);
    }
}


export const { Provider, Context } = createDataContext(
    authReducer, {
    loginUser,
    logoutUser,
    getCourses,
    getGuardians,
    inviteGuardian,
    getGuardianInvitations,
    deleteInvitation
},
    {
        user: null,
        credentials: null,
        courses: null,
        guardians: null,
        invitations: null
    }
)