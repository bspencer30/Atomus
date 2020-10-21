import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';


exports.googleLogin = async (user_type) => {
    const result = await Google.logInAsync({
        iosClientId: `1096496022788-ec1pa08baup3pf92vu9creh76hf76v47.apps.googleusercontent.com`,
        androidClientId: `1096496022788-4dnpffmibbebtfl912d0617atlvdj03u.apps.googleusercontent.com`,
        scopes: [
            "https://www.googleapis.com/auth/classroom.courses.readonly",
            "https://www.googleapis.com/auth/classroom.coursework.me",
            "https://www.googleapis.com/auth/drive.file"],
    });

    if (result.type == 'success') {
        const { idToken, accessToken, refreshToken } = result;
        const credentials = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

        var container = await firebase.auth().signInWithCredential(credentials).then(async (result) => {
            const uid = result.user.uid;
            var result;
            if (result.additionalUserInfo.isNewUser) {
                if (user_type == "NA") {
                    console.log("New User attempted to login without registering.\n Go to screen and register as a user_type");
                    return { status: "user_needs_type", message: "User Needs to Register" };
                }
                else {
                    const user = _createUserDoc(user_type, result.user.email, result.user.displayName, uid);
                    return user;
                }
            } else {
                const user = await _getUserDoc(uid);
                return user;
            };
        });

        if ("status" in container) {
            return container;
        } else {
            return { user: container, credentials: { refresh_token: refreshToken, access_token: accessToken, id_token: idToken } };
        }
    } else {
        console.log("Google Login Cancelled.");
        return { status: "user_cancel", message: "User Cancelled Google Login." };
    }
}

const _createUserDoc = (user_type, email, displayName, uid) => {
    console.log("Creating New User: " + uid)
    var user = {
        email: email,
        display_name: displayName,
        user_type: user_type,
        uid: uid
    };
    firebase.database().ref("users/" + uid).set(user);
    return user;
}

const _getUserDoc = async (uid) => {
    console.log("Logging in Existing User: " + uid);
    const user = await firebase.database().ref("users/" + uid).once('value').then(snapshot => {
        const data = snapshot.val();
        var user = {
            email: data.email,
            display_name: data.display_name,
            user_type: data.user_type,
            uid: uid
        };
        if (data.user_type == "parent") user.children = (("children" in data) ? data.children : {})
        return user;
    });
    return user;
}

exports.googleLogout = async (access_token) => {
    await firebase.auth().signOut();
    const result = await Google.logOutAsync({
        iosClientId: `1096496022788-ec1pa08baup3pf92vu9creh76hf76v47.apps.googleusercontent.com`,
        androidClientId: `1096496022788-4dnpffmibbebtfl912d0617atlvdj03u.apps.googleusercontent.com`,
        accessToken: access_token
    });
    return result
}

exports.addChild = async (uid, children, new_child) => {
    const child_count = Object.keys(children).length;
    children[child_count] = new_child
    firebase.database().ref("users/" + uid).update({children})
    return children;
}
