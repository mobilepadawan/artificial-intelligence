import { modelsArray, D, returnChatMessageAssistant, 
         returnChatMessageUser, } from './elements.js'
import { playAudioFile } from './audio.js'
import { getAnswerFromGemini } from './models.js'
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

// ENLACES DOM
const languageSelect = D('select#language-select')
const settingsIcon = D('span#settings-icon')
const chatContainer = D('div.chat-container')
const textArea = D('textArea#chat-input')
const formQuestion = D('form')

// VARIABLES
let selectedModel = ''

// FUNCIONALIDADES

function returnNoModelSelected() {
    chatContainer.innerHTML = returnChatMessageAssistant('Lo siento, pero no hay modelos para interactuar. 😕 \n Selecciona un Modelo desde el extremo superior izquierdo.')
}

function scrollToBottom() {
    document.querySelector('main').scrollTop = chatContainer.scrollHeight
}

function initPlatform() {
    chatContainer.innerHTML = ''

    if (modelsArray.length > 0) {
        modelsArray.forEach((model)=> 
                    languageSelect.innerHTML += `<option value="${model}">${model}</option>`)
        chatContainer.innerHTML = returnChatMessageAssistant('👋🏼 ¡Te damos la Bienvenida! <strong>Selecciona un Modelo</strong> para comenzar a interactuar.')
    } else {
        returnNoModelSelected()
    }
}

// EVENTOS JS

// MAIN FUNCTION
document.addEventListener('DOMContentLoaded', initPlatform)

formQuestion.addEventListener('submit', async (e)=> {
    e.preventDefault()
    const question = textArea.value.trim()

    if (!selectedModel) {
        returnNoModelSelected()
    } else {
        if (question !== '') {
            chatContainer.innerHTML += returnChatMessageUser(question)
            playAudioFile('audio/msg_send.mp3')
            scrollToBottom()
            textArea.value = ''

            if (selectedModel === 'Gemini') {
                const response = await getAnswerFromGemini(question)
                const answer = marked.parse(response)
                chatContainer.innerHTML += returnChatMessageAssistant(answer)
                playAudioFile('audio/msg_recv.mp3')
                scrollToBottom()

                // getAnswerFromGemini(question).then((response )=> {
                //     const answer = marked.parse(response)
                //     chatContainer.innerHTML += returnChatMessageAssistant(answer)
                //     playAudioFile('audio/msg_recv.mp3')
                //     scrollToBottom()
                // })
            }
            if (selectedModel === 'Chat GPT') {
                setTimeout(() => {
                    const chatNotification = `Todavía no estoy activo 😔, por lo cual te invito a que selecciones otro Modelo entre las opciones disponibles.`
                    chatContainer.innerHTML += returnChatMessageAssistant(chatNotification)
                    playAudioFile('audio/msg_recv.mp3')
                    scrollToBottom()
                }, 1000)
            }
            return 
        }
    }
})

textArea.addEventListener('keydown', (e)=> {
    if (e.key === 'Enter') {
        e.preventDefault()
        formQuestion.dispatchEvent(new Event('submit'))
    }
})

languageSelect.addEventListener('change', ()=> {
    selectedModel = languageSelect.value
    console.log(selectedModel)
    if (selectedModel !== 'Selecciona un Modelo...') {
        setTimeout(() => {
            const chatNotification = `Conversarás con el Modelo 🤖 <strong>${selectedModel}</strong>`
            chatContainer.innerHTML += returnChatMessageAssistant(chatNotification)
            playAudioFile('audio/msg_recv.mp3')
            scrollToBottom()
        }, 600)
    }
})