module.exports = class Coursework {
    constructor(
        course_id,
        coursework_id,
        description,
        due_date, //info combined into one Date object
        submission,
        title,
    ){
        this.course_id = course_id,
        this.coursework_id = coursework_id,
        this.description = description
        this.due_date = due_date,
        this.submission = submission,
        this.title = title
    }
}