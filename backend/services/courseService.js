const urlbase = 'https://classroom.googleapis.com/v1'

exports.getCourses = async (access_token) => {
    const request = {
        method: "GET",
        headers: new Headers({
            "Authorization" : "Bearer " + access_token,
        }),
    }    
    var courses = await fetch(urlbase + '/courses', request).then((response) => response.json()).then((responseJson) => {
        return responseJson.courses;
    })
    return courses;
}