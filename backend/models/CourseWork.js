module.exports = class CourseWork {
    constructor(
        course_work_id,
        description,
        due_date, //info combined into one Date object
        title,
    ){
        this.course_work_id = course_work_id,
        this.description = description
        this.due_date = due_date
        this.title = title
    }
}