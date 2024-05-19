const sound = ["sounds/start.mp3", "sounds/stop.mp3"]
const audio = new Audio()
const paragraphInstruction = document.querySelector("input#paragraphInstruction")
const buttonTalk = document.querySelector("button.user-send-button")
let isTalking = false

// VOICE RECOGNITION
window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
const recognition = new speechRecognition() || new webkitSpeechRecognition()

recognition.interimResults = true
recognition.continous = true
recognition.lang = "en-US"

Speakit.utteranceRate = 1
Speakit.utterancePitch = 1

function animateTalking() {
    const voiceCircle = document.querySelector("div.spinner")
    voiceCircle.style.animation = "spinning 0.7s linear infinite, hue 0.6s ease-in-out infinite"
}

function stopAnimateTalking() {
    const voiceCircle = document.querySelector("div.spinner")
    voiceCircle.style.animation = ""
}

function animateButtonStyle() {
    buttonTalk.style.fontSize = "26px"
    buttonTalk.style.backgroundColor = "#3b3a3a"
    buttonTalk.style.border = "2px solid red"
}

function stopAnimateButtonStyle() {
    buttonTalk.style.border = "none"
    buttonTalk.style.backgroundColor = "rgb(109, 104, 104)"
    buttonTalk.style.fontSize = "32px"
}

// MAIN FUNCTION
recognition.start()

// EVENTS
buttonTalk.addEventListener("click", ()=> {
    if (isTalking) {
        audio.src = sound[1]
        audio.play()
        stopAnimateTalking()
        stopAnimateButtonStyle()
        isTalking = false
    } else {
        audio.src = sound[0]
        audio.play()
        animateTalking()
        animateButtonStyle()
        isTalking = true
    }
})

recognition.addEventListener("start", ()=> { 
    console.log("✅ Voice recognition is ready to hear you.")
})

recognition.addEventListener("soundstart",()=> {
    // animateButtonStyle()
    animateTalking()
})
recognition.addEventListener("soundend",()=> {
    // stopAnimateButtonStyle()
    stopAnimateTalking()
})

recognition.addEventListener("result", (e)=> {
    // console.log(e.results[0])
    // console.log(e.results[0].transcript)
    const text = Array.from(e.results).map((result)=> result[0].transcript)
                                      .join('')

    if (e.results[0].isFinal) {
        console.log(text)
        // paragraphInstruction.value += text + " "

        if (text.toLowerCase().includes("what is your name")) {
            Speakit.readText("I am JARVIS. A computer system developed by the best programmer ever: FERNANDO.", "en-GB")
        }

        if (text.toLowerCase().includes("are you still working for tony stark")) {
            Speakit.readText("Not now. I left my working position for the IRON MAN. I am a professional freelancer already.", "en-GB")
        }

        if (text.toLowerCase().includes("hello jarvis") ) {
            Speakit.readText("Hello to you! What's' your name?", "en-GB")
        }

        if (text.toLowerCase().includes("my name is") || text.toLowerCase().includes("i am") || text.toLowerCase().includes("i'm")) {
            let name = text.split(" ")
            Speakit.readText(`Hello, ${name[name.length - 1]}! Nice to meet you.`, "en-GB")
        }

        if (text.toLowerCase().includes("open youtube please")) {
            Speakit.readText("Opening Youtube...", "en-GB")
            setTimeout(() => {
                let anchor = document.createElement("a")
                anchor.target  = "_blank"
                anchor.href = "https://www.youtube.com/"
                anchor.click()
            }, 1000)
        }

        if (text.toLowerCase().includes("goodbye")) {
            Speakit.readText("Goodbye Sir. See you soon. Have a good night!", "en-GB")

        }
    }
})

recognition.addEventListener('end', ()=> recognition.start() )
