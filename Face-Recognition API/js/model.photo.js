export const URLMODEL = './models/'

export async function trainingModel() {
    await faceapi.loadSsdMobilenetv1Model(URLMODEL)
    await faceapi.loadFaceLandmarkModel(URLMODEL)
    await faceapi.loadFaceRecognitionModel(URLMODEL)
    await faceapi.loadFaceExpressionModel(URLMODEL)
}