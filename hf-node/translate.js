import { HfInference } from "@huggingface/inference"
import "dotenv/config"
const hf = new HfInference(process.env.HFTOKEN)

const translationModel = "facebook/nllb-200-distilled-600M"
const texto = "Mi nombre es Fernando Luna y estoy programando una solución de IA para traducir texto de español a inglés."

const result = await hf.translation({
    model: translationModel,
    inputs: texto,
    parameters: {
        "src_lang": "es_XX",
        "tgt_lang": "en_XX"
    }
})

console.log(result.translation_text)