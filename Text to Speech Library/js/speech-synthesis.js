const languageSelect = document.getElementById('language-select')
const textInput = document.getElementById('text-input')
const readButton = document.getElementById('read-button')
const pauseButton = document.getElementById('pause-button')
const cancelButton = document.getElementById('cancel-button')

function loadVoicesInSelect(languageSelect) {
    Speakit.getVoices().then((voices)=> {
        if (voices.length > 0) {
          voices.forEach((voice)=> {
            languageSelect.innerHTML += `<option value="${voice.lang}" data-voice="${voice.name}">
                                            (${voice.lang}) - ${voice.name}
                                        </option>`
          })
        }
    })
    .catch((error)=> console.error('Error loading the available voices:', error) )
}
loadVoicesInSelect(languageSelect)

function readTextWithSelectedLanguage(textInput, languageSelect, voiceName) {
    if (languageSelect && textInput) {
        Speakit.readText(textInput, languageSelect, voiceName)
        .then(()=> console.log('Text succesfuly readed.') )
        .catch((error)=> console.error('Error reading the text:', error) )
    } else {
        console.error('Please, select a language, an accent, and write a text.')
    }
}

readButton.addEventListener("click", ()=> {
    readTextWithSelectedLanguage(textInput.value.trim(), 
                                 languageSelect.value, 
                                 languageSelect[languageSelect.selectedIndex].dataset.voice)
})

pauseButton.addEventListener("click", ()=> {
    if (pauseButton.textContent === "Pause" && Speakit.isSpeaking()) {
        Speakit.pauseSpeaking()
        pauseButton.textContent = "Resume"
    } else if (pauseButton.textContent === "Resume" && Speakit.isSpeaking()) {
        Speakit.resumeSpeaking()
        pauseButton.textContent = "Pause"
    }
})

cancelButton.addEventListener("click", ()=> Speakit.isSpeaking() && Speakit.stopSpeaking())