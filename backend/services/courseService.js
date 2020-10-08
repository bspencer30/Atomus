const urlbase = 'https://classroom.googleapis.com/v1'

exports.getCourses= async (access_token) => {
    const request = {
        method: "GET",
        headers: new Headers({
            "Authorization" : "Bearer " + access_token,
        }),
    }
    const url = urlbase + "/courses?courseStates=ACTIVE"
    var courses = await fetch(url, request).then((response) => response.json()).then((responseJson) => {
        return responseJson.courses;
    })
    if (typeof courses == "undefined") courseWork = [];  
    return courses;
}

exports.getCourseWork = async (access_token, course_id) => {
    const request = {
        method: "GET",
        headers: new Headers({
            "Authorization" : "Bearer " + access_token,
        }),
    }
    const url = urlbase + "/courses/" + course_id + "/courseWork?courseWorkStates=PUBLISHED";
    var courseWork = await fetch(url, request).then((response) => response.json()).then((responseJson) => {
        return responseJson.courseWork;
    })
    if (typeof courseWork == "undefined" || courseWork == null) courseWork = [];
    console.log('Returning ' + courseWork.length + ' assignments')  
    return courseWork;
}