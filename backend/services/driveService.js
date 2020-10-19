exports.uploadPicture = async(access_token, photo, coursework) => {
    const boundary_string = "foo_bar_baz"

    const separator = `--${boundary_string}`;
    const ending = `\n${separator}--`;
    
    var metadata = {name: `${coursework.coursework_id}_1`};
    var mediaType = "image/jpg";
    
    let body = `\n${separator}\n` +
    "Content-Type: application/json; charset=UTF-8\n\n" +
    `${JSON.stringify(metadata)}\n\n${separator}\n` +
    "Content-Transfer-Encoding: base64\n" +
    `Content-Type: ${mediaType}\n\n`;

    body += `${photo}${ending}`;
    var length = body.length;
    
    var header = new Headers({
        "Authorization" : "Bearer " + access_token,
        "Content-Type": `multipart/related; boundary=${boundary_string}`,
        "Content-Length": length
    })

    const request = {
        method: "POST",
        headers: header,
        body
    }

    const url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
    
    var response = await fetch(url, request).then((response) => response.json()).then((responseJson) => {
        return responseJson;
    })
    console.log("Response from Drive Upload:\n" + response.id + " " + response.name) 
    return response;
}