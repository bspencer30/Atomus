module.exports = class CourseWork {
    constructor(
        course_work_id,
        description,
        due_date,
        due_time,
        title,
    ){
        this.course_work_id = course_work_id,
        this.description = description
        this.due_date = due_date
        this.due_time = due_time
        this.title = title
    }
}