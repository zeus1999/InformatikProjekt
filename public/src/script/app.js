document.addEventListener("DOMContentLoaded", app, false);

function app(){

    var socket = io.connect("http://localhost:3200");


}

function sendFile(url, file, cb) {
    var formData = new FormData();
    formData.append("file", file);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            cb(request.response);
        }
    }

    request.upload.onprogress = (progress) => {
        console.log(progress.loaded / progress.total * 100);
    };
    

    

    request.open("POST", url);
    request.send(formData);
}
