export const modelsArray = ['Chat GPT', 'Gemini']
export const sounds = {
                        AUDIO_SEND: 'audio/msg_send.mp3',
                        AUDIO_RECEIVE: 'audio/msg_recv.mp3'
                    }
export const D = (el)=> document.querySelector(el)

export function returnChatMessageUser(text) {
    return `<div class="chat-message user">
                <div class="chat-bubble">
                    <p>${text.trim()}</p>
                </div>
            </div>`
}

export function returnChatMessageAssistant(text) {
    return `<div class="chat-message assistant">
                <div class="chat-bubble">
                    <p>${text}</p>
                </div>
            </div>`
}