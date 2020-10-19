module.exports = class Coursework {
    constructor(
        coursework_type,
        submission_id,
        submission_state,
    ){
        this.coursework_type = coursework_type,
        this.submission_id = submission_id,
        this.submission_state = submission_state
    }
}