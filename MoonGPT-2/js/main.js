import { modelsArray, D, returnChatMessageAssistant, 
         returnChatMessageUser, } from './elements.js'
import { playAudioFile } from './audio.js'
import { getAnswerFromGemini } from './models.js'
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

// ENLACES DOM
const dialog = D('dialog')
const btnSave = D('button#btnSave')
const btnCancel = D('button#btnCancel')
const txtGeminiAPIKey = D('input#txtGeminiAPIKey')
const txtOpenAIAPIKey = D('input#txtOpenAIAPIKey')
const languageSelect = D('select#language-select')
const settingsIcon = D('span#settings-icon')
const chatContainer = D('div.chat-container')
const textArea = D('textArea#chat-input')
const formQuestion = D('form')

// VARIABLES, CONSTANTES, OBJETOS
const settings = { GeminiAPIKey: '', OpenAIAPIKey: '', selectedModel: '' }

// FUNCIONALIDADES

function getGlobalSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('MoonGPTSettings'))
    
    if (savedSettings !== null) {
        settings.GeminiAPIKey = savedSettings.GeminiAPIKey
        settings.OpenAIAPIKey = savedSettings.OpenAIAPIKey
        settings.selectedModel = savedSettings.selectedModel
    }
}

function returnNoModelSelected() {
    chatContainer.innerHTML = returnChatMessageAssistant('Lo siento, pero no hay modelos para interactuar. 😕 \n Selecciona un Modelo desde el extremo superior izquierdo.')
    playAudioFile('audio/msg_recv.mp3')
    scrollToBottom()
}

function scrollToBottom() {
    document.querySelector('main').scrollTop = chatContainer.scrollHeight
}

function initPlatform() {
    chatContainer.innerHTML = ''

    if (modelsArray.length > 0) {
        modelsArray.forEach((model)=> 
                    languageSelect.innerHTML += `<option value="${model}">${model}</option>`)

        const message = settings?.selectedModel !== ''
                        ?
                        `👋🏼 ¡Te damos la Bienvenida! <strong>${settings.selectedModel}</strong> es tu Modelo predeterminado para interactuar.`
                        :
                        `👋🏼 ¡Te damos la Bienvenida! <strong>Configura y selecicona un Modelo</strong> para poder interactuar.`
        chatContainer.innerHTML = returnChatMessageAssistant(message)
        playAudioFile('audio/msg_send.mp3')
        scrollToBottom()
    } else {
        returnNoModelSelected()
    }
}

// EVENTOS JS
document.addEventListener('DOMContentLoaded', ()=> { // Función Principal
    getGlobalSettings()
    initPlatform()
})

settingsIcon.addEventListener('click', ()=> {
    txtGeminiAPIKey.value = settings.GeminiAPIKey
    txtOpenAIAPIKey.value = settings.OpenAIAPIKey
    languageSelect.value = settings.selectedModel 

    dialog.showModal()
})

formQuestion.addEventListener('submit', async (e)=> {
    e.preventDefault()
    const question = textArea.value.trim()

    if (!settings.selectedModel) {
        returnNoModelSelected()
    } else {
        if (question !== '') {
            chatContainer.innerHTML += returnChatMessageUser(question)
            playAudioFile('audio/msg_send.mp3')
            scrollToBottom()
            textArea.value = ''

            if (settings.selectedModel === 'Gemini') {
                const response = await getAnswerFromGemini(question)
                const answer = marked.parse(response)
                chatContainer.innerHTML += returnChatMessageAssistant(answer)
                playAudioFile('audio/msg_recv.mp3')
                scrollToBottom()
                return 
            }

            if (settings.selectedModel === 'Chat GPT') {
                setTimeout(() => {
                    const chatNotification = `Todavía no estoy activo 😔, por lo cual te invito a que selecciones otro Modelo entre las opciones disponibles.`
                    chatContainer.innerHTML += returnChatMessageAssistant(chatNotification)
                    playAudioFile('audio/msg_recv.mp3')
                    scrollToBottom()
                    return 
                }, 1000)
            }
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
    if (settings.selectedModel !== 'Ninguno') {
        setTimeout(() => {
            const chatNotification = `Conversarás con el Modelo 🤖 <strong>${languageSelect.value}</strong>`
            chatContainer.innerHTML += returnChatMessageAssistant(chatNotification)
            playAudioFile('audio/msg_recv.mp3')
            scrollToBottom()
        }, 600)
    }
})

btnSave.addEventListener('click', ()=> {
    if (txtGeminiAPIKey.value.trim() !== '') {
        settings.GeminiAPIKey = txtGeminiAPIKey.value.trim()    
    }

    if (txtGeminiAPIKey.value.trim() !== '') {
        settings.OpenAIAPIKey = txtOpenAIAPIKey.value.trim()
    }

    if (languageSelect.value !== 'Ninguno') {
        settings.selectedModel = languageSelect.value
    }

    localStorage.setItem('MoonGPTSettings', JSON.stringify(settings))
    btnCancel.click()
})

btnCancel.addEventListener('click', ()=> dialog.close())