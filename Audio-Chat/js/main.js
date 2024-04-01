const btnSend = document.querySelector("button#btnSend")
const inputAnswer = document.querySelector("input#inputAnswer")
const chatArea = document.querySelector("div.chat-container")
const arrayBot = ['This is a sample message that I use as a response.',
                  'Here we go with another message used as a response.',
                  'Here is a new message as a response. Plus an emoji 💪',
                  'I continue to send to you messages as a response, also with another emojis 😎']

function getRandomResponse(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

function returnResponseChat(response, id) {
    const el = document.querySelector(`#${id}`)
    el.textContent = response
}

function sendAnswerToChat(message, answerId) {
    return `<div id="${answerId}" class="message-right">${message}</div>`
}

btnSend.addEventListener("click", ()=> {
    const answerToSend = inputAnswer.value.trim()

    if (answerToSend.length > 0) {
        const answerId = `answerid-${(Math.random() * 1000000).toFixed(0)}`
        chatArea.innerHTML += sendAnswerToChat(answerToSend, answerId)
        inputAnswer.value = ""
        location.href = `#${answerId}`
        btnSend.setAttribute("disabled", "true")
        emulateResponse()
    }
})

function emulateResponse() {
    const dotsId = `dotid-${(Math.random() * 1000000).toFixed(0)}`
    console.log(dotsId)

    setTimeout(() => {
        chatArea.innerHTML += `<div id="${dotsId}" class="message-left">
                                  <img src="assets/3dots.gif" id="imgdots">
                               </div>`
        location.href = `#${dotsId}`
        const timeToResponse = Math.random() * 10000 + 1500
        
        setTimeout(() => {
            returnResponseChat(getRandomResponse(arrayBot), dotsId)
            btnSend.removeAttribute("disabled")
        }, timeToResponse)
    }, 1200)
}