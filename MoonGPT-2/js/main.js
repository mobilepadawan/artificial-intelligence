import { modelsArray, D, returnChatMessageAssistant, 
         returnChatMessageUser, } from "./elements.js"
import { playAudioFile } from "./audio.js"
import { getAnswerFromGemini } from "./models.js"
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"

const languageSelect = D('select#language-select')
const settingsIcon = D('span#settings-icon')
const chatContainer = D('div.chat-container')
const textArea = D('textArea#chat-input')
const formQuestion = D('form')

// FUNCIONALIDADES
function initPlatform() {
    chatContainer.innerHTML = ''

    if (modelsArray.length > 0) {
        modelsArray.forEach((model)=> 
                    languageSelect.innerHTML += `<option value="${model}">${model}</option>`)
        chatContainer.innerHTML = returnChatMessageAssistant('👋🏼 ¡Te damos la Bienvenida! <strong>Selecciona un Modelo</strong> para comenzar a interactuar.')
    } else {
        chatContainer.innerHTML = returnChatMessageAssistant('Lo siento, pero no hay modelos para interactuar. 😕')
    }
}

// EVENTOS JS

// MAIN FUNCTION
document.addEventListener('DOMContentLoaded', initPlatform)

formQuestion.addEventListener('submit', async (e)=> {
    e.preventDefault()
    const question = textArea.value.trim()

    if (question !== '') {
        chatContainer.innerHTML += returnChatMessageUser(question)
        playAudioFile('audio/msg_send.mp3')
        textArea.value = ''
        getAnswerFromGemini(question).then((response )=> {
            const answer = marked.parse(response)
            chatContainer.innerHTML += returnChatMessageAssistant(answer)
            playAudioFile('audio/msg_recv.mp3')    
        })
    }
})

languageSelect.addEventListener('change', ()=> {
    const assistantSelected = languageSelect.value

    if (assistantSelected !== 'Selecciona un Modelo...') {
        setTimeout(() => {
            const modeloSelected = `Conversarás con el Modelo 🤖 <strong>${assistantSelected}</strong>`
            chatContainer.innerHTML += returnChatMessageAssistant(modeloSelected)
            playAudioFile('audio/msg_recv.mp3')
        }, 600)
    }
})