import { returnBubbleChatBox, returnBubbleChatClient, returnSpaceInChat } from "./bubbles.js";

const chatContainer = document.querySelector("div.chat-container")
const btnEnviar = document.querySelector("button#btnEnviar")
const txtMensaje = document.querySelector("input#txtMensaje")

btnEnviar.addEventListener("click", ()=> {
    const messageText = txtMensaje.value.trim()
    if (messageText) {
        chatContainer.innerHTML += returnBubbleChatClient(messageText)
        chatContainer.innerHTML += returnSpaceInChat()
        chatContainer.scrollTop = chatContainer.scrollHeight
        txtMensaje.value = ""
        txtMensaje.focus()
    }
})