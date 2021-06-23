let USER_LX, USER_LY, USER_RX, USER_RY, USER_CX, USER_CY;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("../covidbusters/public/assets/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("../covidbusters/public/assets/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("../covidbusters/public/assets/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("../covidbusters/public/assets/models"),
]).then(startVideo);

const webcamVideo = document.querySelector("#webcamVideo");

function startVideo() {
    camPermission = true; // permit rotate cube
    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
            .then(function (stream) {
                webcamVideo.srcObject = stream;
            })
            .catch(function (err) {
                window.alert(err);
            });
    } else {
        window.alert("your browser not support usermedia");
    }
}

if (webcamVideo !== null && webcamVideo !== undefined) {
    webcamVideo.addEventListener("play", () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(webcamVideo, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            const pixelSize = 1; // fit with the same the const from instance-canvas.js

            // get position
            if (typeof (detections[0]) !== "undefined" && detections[0] !== null) {
                const _lx = detections[0].landmarks._positions[36]["_x"];
                const _ly = detections[0].landmarks._positions[36]["_y"];
                const _rx = detections[0].landmarks._positions[45]["_x"];
                const _ry = detections[0].landmarks._positions[45]["_y"];

                USER_LX = _lx;
                USER_LY = _ly;
                USER_RX = _rx;
                USER_RY = _ry;
                USER_CX = USER_LX + Math.abs(USER_RX - USER_LX) / 2;
                USER_CY = _ly;
            }

        }, 100);
    });
}