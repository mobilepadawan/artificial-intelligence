const video = document.querySelector("video#webcam-video")
const canvas = document.querySelector("canvas#canvas")

navigator.mediaDevices.getUserMedia({ video: {} })
         .then((stream)=> video.srcObject = stream )
         .catch((error)=> console.error(error))

async function onPlay() {
    const URLMODEL = './models/'

    await faceapi.loadSsdMobilenetv1Model(URLMODEL)
    await faceapi.loadFaceLandmarkModel(URLMODEL)
    await faceapi.loadFaceRecognitionModel(URLMODEL)
    await faceapi.loadFaceExpressionModel(URLMODEL)

    let fullFaceDescriptions = await faceapi.detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions()

        const dims = faceapi.matchDimensions(canvas, video, true)
        const resizedResults = faceapi.resizeResults(fullFaceDescriptions, dims)

        await faceapi.draw.drawDetections(canvas, resizedResults)
        await faceapi.draw.drawFaceLandmarks(canvas, resizedResults)
        await faceapi.draw.drawFaceExpressions(canvas, resizedResults, 0.05)
}

video.addEventListener("play", async ()=> onPlay())

setInterval(onPlay, 1000)