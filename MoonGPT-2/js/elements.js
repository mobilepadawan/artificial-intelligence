export const modelsArray = ['Chat GPT', 'Gemini']
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