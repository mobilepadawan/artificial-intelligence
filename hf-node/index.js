import { HfInference } from "@huggingface/inference"
import "dotenv/config"
const hf = new HfInference(process.env.HFTOKEN)

const image4ProcessingURL = "https://teachyourkidscode.com/wp-content/uploads/2022/02/best-coding-language-for-games.jpg"
const modelo = "Salesforce/blip-image-captioning-large"

const response = await fetch(image4ProcessingURL)
const imagen = await response.blob()

const result = await hf.imageToText({
    data: imagen,
    model: modelo
})

console.log(result.generated_text.replaceAll("a close up of ", ""))