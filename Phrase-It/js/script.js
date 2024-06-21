import { frases } from "./phrases.js"

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const phrasePara = document.querySelector('.phrase')
const resultPara = document.querySelector('.result')
const diagnosticPara = document.querySelector('.output')

const testBtn = document.querySelector('button')

function randomPhrase() {
  return Math.floor(Math.random() * frases.length)
}

function testSpeech() {
  testBtn.disabled = true
  testBtn.textContent = 'En progreso...'

  let phrase = frases[randomPhrase()]
  // To ensure case consistency while checking with the returned output text
  phrase = phrase.toLowerCase()
  phrasePara.textContent = phrase
  resultPara.textContent = '¿Correcto o no?'
  resultPara.style.background = 'rgba(0,0,0,0.2)'
  diagnosticPara.textContent = '...'
  const grammar = `#JSGF V1.0 grammar phrase public <phrase> = '${phrase}';`
  const recognition = new SpeechRecognition()
  const speechRecognitionList = new SpeechGrammarList()
  speechRecognitionList.addFromString(grammar, 1)
  recognition.grammars = speechRecognitionList
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.start()

  recognition.onresult = function(e) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
    let speechResult = e.results[0][0].transcript.toLowerCase()
    diagnosticPara.textContent = `Recibido: '${speechResult}'.`
    resultPara.style.color = 'white'

    const porcentaje = parseFloat(e.results[0][0].confidence) * 100
    const totalAcierto = `${parseInt(porcentaje)} %`
    console.log(`Interpretado: ${e.results[0][0].transcript}`)
    console.log(`Acierto: ${totalAcierto}`)

    if (porcentaje >= 85) {
      resultPara.textContent = `¡Muy bien! ${totalAcierto}`
      resultPara.style.background = 'green'
    } else if (porcentaje >= 60) {
      resultPara.textContent = `Bien. Pero puedes hacerlo mejor! ${totalAcierto}`
      resultPara.style.background = 'orange'
    } else {
      resultPara.textContent = `Necesitas algo más de práctica... ${totalAcierto}`
      resultPara.style.background = 'red'
    }
  }

  recognition.onspeechend = function() {
    recognition.stop()
    testBtn.disabled = false
    testBtn.textContent = 'COMENZAR'
  }

  recognition.onerror = function(e) {
    testBtn.disabled = false
    testBtn.textContent = 'COMENZAR'
    diagnosticPara.textContent = `Error en el reconocimiento: ${e.error}`
  }
  
  recognition.onaudiostart = function(e) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart')
  }
  
  recognition.onaudioend = function(e) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend')
  }
  
  recognition.onend = function(e) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend')
  }
  
  recognition.onnomatch = function(e) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch')
  }
  
  recognition.onsoundstart = function(e) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart')
  }
  
  recognition.onsoundend = function(e) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend')
  }
  
  recognition.onspeechstart = function (e) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart')
  }
  recognition.onstart = function(e) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart')
  }
}

testBtn.addEventListener('click', testSpeech)