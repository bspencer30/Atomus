
module.exports = class Course {
    constructor(
       course_id, //cid Course ID
       guardians_enabled,
       name,
       work
    ) {
       this.course_id = course_id;
       this.guardians_enabled = guardians_enabled;
       this.name = name;
       this.work = work;
    }
}