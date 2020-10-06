import createDataContext from './createDataContext';
import User from '../backend/models/User'
import userService from '../backend/services/userService'

//adapted from 'BalanceMe' @Kory Brantley with permission @Rahul  
const authReducer = (state, action) => {
    switch (action.type) {
        case "login_user":
            return { ...state, user: action.user, credentials: action.credentials }
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

export const { Provider, Context } = createDataContext(
    authReducer, {
    loginUser
},
    {
        user: null,
        credentials: null
    }
)