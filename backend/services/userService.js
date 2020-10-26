import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
const urlbase = 'https://classroom.googleapis.com/v1'


exports.googleLogin = async (user_type) => {
    const result = await Google.logInAsync({
        iosClientId: `1096496022788-ec1pa08baup3pf92vu9creh76hf76v47.apps.googleusercontent.com`,
        androidClientId: `1096496022788-4dnpffmibbebtfl912d0617atlvdj03u.apps.googleusercontent.com`,
        scopes: [
            "https://www.googleapis.com/auth/classroom.courses.readonly",
            "https://www.googleapis.com/auth/classroom.coursework.me",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/classroom.guardianlinks.students"],
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

exports.getGuardians = async (access_token) => {
    const request = {
        method: "GET",
        headers: new Headers({
            "Authorization": "Bearer " + access_token,
        }),
    }
    const url = urlbase + "/userProfiles/me/guardians"
    const guardians = await fetch(url, request).then((response) => response.json()).then((responseJson) => {
        return responseJson.guardians;
    })
    return guardians;
}

exports.inviteGuardian = async (access_token, invited_email) => {
    const body = {
        studentId: "me",
        invitedEmailAddress: invited_email
    }
    const request = {
        method: "POST",
        headers: new Headers({
            "Authorization": "Bearer " + access_token,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }),
        body
    }
    const url = urlbase + "/userProfiles/me/guardianInvitations"
    const guardian = await fetch(url, request).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    })
    return guardian;
}

exports.getGuardianInvitations = async (access_token) => {
    const request = {
        method: "GET",
        headers: new Headers({
            "Authorization": "Bearer " + access_token,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }),
    }
    const url = urlbase + "/userProfiles/me/guardianInvitations?states=PENDING"
    const invitations = await fetch(url, request).then((response) => response.json()).then((responseJson) => {
        return responseJson.guardianInvitations;
    })
    return invitations;
}

exports.deleteInvitation = async (access_token, invite_id) => {
    const request = {
        method: "PATCH",
        headers: new Headers({
            "Authorization": "Bearer " + access_token,
        }), 
        body: JSON.stringify({
            "state": "COMPLETE"
        })
    }
    const url = urlbase + "/userProfiles/me/guardianInvitations/" + invite_id + "?updateMask=state"
    const guardianInvitation = await fetch(url, request).then((response) => response.json()).then((responseJson) => {
        return responseJson
    })
    return guardianInvitation;
}
