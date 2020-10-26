
module.exports = class User {
    constructor(
       display_name,
       email,
       uid,
       user_type,
    ) {
        this.display_name = display_name;
        this.email = email;
        this.uid = uid;
        this.user_type = user_type;
    }
}