export function returnBubbleChatBox(text) {
    return `<div class="chat-bubble-container">
                <div class="chat-bubble left">
                <p class="roboto-regular">${text}</p>
                </div>
            </div>`
}

export function returnBubbleChatClient(text) {
    return `<div class="chat-bubble-container">
                <div class="chat-bubble right">
                <p class="roboto-regular">${text}</p>
                </div>
            </div>`
}

export function returnSpaceInChat() {
    return `<div class="chat-bubble-space"></div>`
}