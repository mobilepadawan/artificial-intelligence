import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

const GOOGLE_API_KEY=''

export async function getAnswerFromGemini(question) {
    if (!question) {
        throw new Error('No se ha recibido un parámetro de consulta.')
    }

    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})

    const result = await model.generateContent(question)
    const response = await result.response
    const answer = await response.text()
    return answer
}