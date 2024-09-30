import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

function getGeminiAPIKey() {
    const savedSettings = JSON.parse(localStorage.getItem('MoonGPTSettings'))

    if (!savedSettings?.GeminiAPIKey) {
        console.error('Configura la API Key de Gemini para continuar.')
        return ''
    } else {
        return savedSettings.GeminiAPIKey
    }
}

export async function getAnswerFromGemini(question, settings) {
    
    const GOOGLE_API_KEY = settings?.GeminiAPIKey || ''

    if (!question) {
        throw new Error('No se ha recibido un parámetro de consulta.')
    }

    if (!GOOGLE_API_KEY) {
        throw new Error('Configura una API Key válida para utilizar esta aplicación.')
    }

    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})

    const result = await model.generateContent(question)
    const response = await result.response
    const answer = await response.text()
    return answer
}