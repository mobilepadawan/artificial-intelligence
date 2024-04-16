const btnSend = document.querySelector("button#btnSend")
const inputAnswer = document.querySelector("input#inputAnswer")
const chatArea = document.querySelector("div.chat-container")
const arrayBot = [`This is a sample message that I use as a response. And now, I extended the message length to pretend a longer typing effect.`,
                  `Here we go with another message used as a response. And, of course, I also extended the message length for a longer typing effect.`,
                  `Here is a new message as a response. Plus an emoji 💪. It is amazing to enjoy the typing effect that I wrote with only a few lines of code.`,
                  `I continue to send to you messages as a response, also with another emoji 😎. I hope you are enjoying this amazing effect.`]

function getRandomResponse(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

function getHour() {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedHours = hours < 10 ? '0' + hours : hours
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const time = `${formattedHours}:${formattedMinutes}`
    return time
}

function getGenericId() {
    return (Math.random() * 1000000).toFixed(0)
}

function getDivSeparator(divId) {
    return `<div id="${divId}"></div>`
}

function returnResponseChat(response, id) {
    return new Promise((resolve, reject)=> {
        const el = document.querySelector(`#${id}`)
        el.textContent = ""
        let index = 0
        
        const intervalId = setInterval(() => {
            if (index < response.length) {
                el.textContent += response.charAt(index)
                index++
            } else {
                el.textContent += "\n"
                el.innerHTML += `<p class="message-hour">${()}</p>`
                clearInterval(intervalId)
                resolve("finish")
            }
        }, 54)    
    })
}

function sendAnswerToChat(message, answerId) {
    return `<div class="message-right">
        ${message}
        <p class="message-hour" id="${answerId}">${getHour()}</p>
    </div>`
}

btnSend.addEventListener("click", ()=> {
    const answerToSend = inputAnswer.value.trim()

    if (answerToSend.length > 0) {
        const answerId = `answerid-${getGenericId()}`
        chatArea.innerHTML += sendAnswerToChat(answerToSend, answerId)
        Speakit.readText(answerToSend, "en-US")
        inputAnswer.value = ""
        location.href = `#${answerId}`
        inputAnswer.setAttribute("disabled", "true")
        btnSend.setAttribute("disabled", "true")
        emulateResponse()
    }
})

function emulateResponse() {
    const dotsId = `dotid-${getGenericId()}`
    const divId = `${getGenericId()}`
    console.log(dotsId)

    setTimeout(() => {
        chatArea.innerHTML += `<div id="${dotsId}" class="message-left">
                                  <img src="assets/3dots.gif" id="imgdots">
                               </div>`
        location.href = `#${dotsId}`
        const timeToResponse = Math.random() * 1000 + 1500
        
        setTimeout(() => {
            const randomResponse = getRandomResponse(arrayBot)
            Speakit.utteranceRate = 1.3
            Speakit.utterancePitch = 1.1
            // Speakit.readText(randomResponse, "en-US", "Microsoft Ava Online (Natural) - English (United States)")
            Speakit.readText(randomResponse, "en-US", "Microsoft Brian Online (Natural) - English (United States)")
            returnResponseChat(randomResponse, dotsId).then((response)=> {
                chatArea.innerHTML += getDivSeparator(divId)
                location.href = `#${divId}`
                inputAnswer.removeAttribute("disabled")
                btnSend.removeAttribute("disabled")
            })
        }, timeToResponse)
    }, 1200)
}
