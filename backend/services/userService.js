import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';


exports.googleLogin = async (user_type) => {
    const result = await Google.logInAsync({
        iosClientId: `1096496022788-ec1pa08baup3pf92vu9creh76hf76v47.apps.googleusercontent.com`,
        androidClientId: `1096496022788-4dnpffmibbebtfl912d0617atlvdj03u.apps.googleusercontent.com`,
        scopes: ["https://www.googleapis.com/auth/classroom.courses.readonly"],
    });

    if (result.type == 'success') {
        const { idToken, accessToken, refreshToken } = result;
        const credentials = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        var container = await firebase.auth().signInWithCredential(credentials).then(async (result) => {
            const uid = result.user.uid;
            if (result.additionalUserInfo.isNewUser) {
                console.log('Creating New User: ' + uid);
                const user = {
                    email: result.user.email,
                    display_name: result.user.displayName,
                    user_type: user_type,
                    uid: uid
                };
                firebase.database().ref("users/" + uid).set(user);
                return { user: user, credentials: {refresh_token: refreshToken, access_token: accessToken, id_token: idToken}};
            } else {
                console.log('Logging in Existing User: ' + uid);
                var container = await firebase.database().ref("users/" + uid).once('value').then(snapshot => {
                    const data = snapshot.val();
                    const user = {
                        email: data.email,
                        display_name: data.display_name,
                        user_type: data.user_type,
                        uid: uid
                    };
                    return { user: user, credentials: {refresh_token: refreshToken, access_token: accessToken, id_token: idToken}}
                });
                return container;
            }
        });
        return container;
    } else {
        console.log("Google Login Cancelled.");
        return {status: "user_cancel", message: "User Cancelled Google Login."};
    }



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
