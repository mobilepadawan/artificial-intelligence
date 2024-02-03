import { URLMODEL, trainingModel } from "./model.photo.js"

trainingModel(URLMODEL)

const buttonUpload = document.querySelector("button#buttonUpload")
const buttonCapture = document.querySelector("button#buttonCapture")

buttonUpload.addEventListener("click", async ()=> {
    const filePicker = document.createElement("input")
    filePicker.type = "file"
    filePicker.accept = "image/*"
    filePicker.click()
    filePicker.addEventListener("change", ()=> {
        const selectedFile = filePicker.files[0]

        if (selectedFile) {
            const imageContainer = document.querySelector("div.card.card-dotted") 
            imageContainer.innerHTML = ""
            const imageViewer = document.createElement("img")
            imageViewer.id = "image"
            imageViewer.src = URL.createObjectURL(selectedFile)
            imageViewer.style.width = "100%"
            imageContainer.append(imageViewer)
            imageContainer.style.height = "auto"

            const canvas = document.createElement("canvas")
            canvas.style.width = imageViewer.style.width
            canvas.style.height = "auto"
            canvas.id = "canvas"
            imageContainer.append(canvas)
            setTimeout(detectFaces, 2500)
        }
    })
})

async function detectFaces() {
    const image = document.getElementById("image")
    const canvas = document.getElementById("canvas")

    let fullFaceDescriptions = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors().withFaceExpressions()
    console.log(fullFaceDescriptions)

    if (fullFaceDescriptions.length > 0) {
        const expressions = fullFaceDescriptions[0].expressions
        const divExpressions = document.querySelector("div.expressions-list")
        divExpressions.innerHTML = ""

        for (const expression in expressions) {
            if (expressions.hasOwnProperty(expression)) {
                const exp = document.createElement("p")
                const value = expressions[expression]
                exp.textContent = `${expression}: ${value > 0.5 ? "✅" : "⛔️"} - (${parseFloat(value * 100).toFixed(2)}) %`
                divExpressions.append(exp)
            }
        }

        // faceapi.draw.drawDetections(canvas, fullFaceDescriptions);
        // faceapi.draw.drawFaceLandmarks(canvas, fullFaceDescriptions);
        // faceapi.draw.drawFaceExpressions(canvas, fullFaceDescriptions, 0.05);
    
    } else {
        console.error("⛔️ A face was not detected.")
    }
}