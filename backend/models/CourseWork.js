module.exports = class Coursework {
    constructor(
        coursework_id,
        description,
        due_date, //info combined into one Date object
        title,
    ){
        this.course_work_id = coursework_id,
        this.description = description
        this.due_date = due_date
        this.title = title
    }
}