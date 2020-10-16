const urlbase = 'https://classroom.googleapis.com/v1'

exports.getCourses= async (access_token) => {
    const request = {
        method: "GET",
        headers: new Headers({
            "Authorization" : "Bearer " + access_token,
        }),
    }
    const url = urlbase + "/courses?courseStates=ACTIVE&studentId=me"
    var courses = await fetch(url, request).then((response) => response.json()).then((responseJson) => {
        return responseJson.courses;
    })
    if (typeof courses == "undefined") courseWork = [];  
    return courses;
}

exports.getCoursework = async (access_token, course_id) => {
    const request = {
        method: "GET",
        headers: new Headers({
            "Authorization" : "Bearer " + access_token,
        }),
    }
    const url = urlbase + "/courses/" + course_id + "/courseWork?courseWorkStates=PUBLISHED";
    var coursework = await fetch(url, request).then((response) => response.json()).then((responseJson) => {
        return responseJson.courseWork;
    })
    if (typeof coursework == "undefined" || coursework == null) coursework = [];
    console.log('Returning ' + coursework.length + ' assignments')  
    console.log(coursework)
    return coursework;
}

exports.submitWork = async(access_token, course_id, coursework_id, drive_id) => {
    const request = {
        method: "POST",
        headers: new Headers({
            "Authorization" : "Bearer " + access_token,
        }),
    }
    const url = urlbase + "/courses/" + course_id + "/courseWork/" + coursework_id + "/studentSubmissions/" + drive_id + ":turnIn";
    await fetch(url, request)


}