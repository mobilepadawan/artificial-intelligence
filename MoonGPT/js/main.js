// Modelos tomados desde: https://github.com/mlc-ai/web-llm/tree/main

// https://github.com/mlc-ai/web-llm
import { CreateMLCEngine } from 'https://esm.run/@mlc-ai/web-llm'
// import marked from 'https://cdn.jsdelivr.net/npm/marked@14.1.0/+esm'

// Speakit Config
Speakit.utteranceRate = 1.1
Speakit.utterancePitch = 1.1
Speakit.languageFilter = 'es-AR'
Speakit.getVoices().then((voices)=> console.table(voices))
 
function speakAnswer(text) {
    Speakit.readText(text, "es-AR", "Microsoft Tomas Online (Natural) - Spanish (Argentina)")
}

const dom = el=> document.querySelector(el)

const $form = dom('form')
const $input = dom('form input')
const $template = dom('#message-template')
const $messages = dom('ul')
const $container = dom('main')
const $button = dom('button')
const $info = dom('small')
const $chatImage = '<img src="images/chatbot-32.png" alt="Chat icon" title="MoonGPT">'
const $msgSend = 'audio/msg_send.mp3'
const $msgRecv = 'audio/msg_recv.mp3'
const messages = []
let end = false



// A.I. CONFIG AND INITIALIZATION
// const AI_MODEL = 'gemma-2b-it-q4f32_1-MLC'
// const AI_MODEL = 'Llama-3.1-8B-Instruct-q4f32_1-MLC-1k'
// const AI_MODEL = 'TinyLlama-1.1B-Chat-v0.4-q4f16_1-MLC'
const AI_MODEL = 'Phi-3.5-mini-instruct-q4f16_1-MLC'

const ENGINE = await CreateMLCEngine( AI_MODEL, 
                                      { initProgressCallback: 
                                        (info)=> {
                                            $info.textContent = info.text
                                            if (info.progress === 1 && !end) {
                                                end = true
                                                addMessage(`Soy <strong>MoonGPT</strong>, un humilde asistente virtual. ¿En qué puedo ayudarte?`, 'bot')
                                                $input.focus()
                                                $button.removeAttribute('disabled')
                                            }
                                            $button.removeAttribute('disabled')
                                        }
                                    })

$form.addEventListener('submit', async (e)=> {
    e.preventDefault()
    const textMessage = $input.value.trim()
    const userMessage = { role: 'user', content: textMessage }

    messages.push(userMessage)
    $input.value = textMessage !== '' && ''
    addMessage(textMessage, 'user')
    $button.setAttribute('disabled', '')

    const reply = await ENGINE.chat.completions.create({
        messages
    })
    const botMessage = reply.choices[0].message.content
    addMessage(botMessage, 'bot')
    speakAnswer(botMessage)
    $button.removeAttribute('disabled')
    $container.scrollTop = $container.scrollHeight
    console.table(messages)
})

function playTone(tone) {
    let audio = new Audio()
    audio.src = tone
    audio.play()
    audio.onended = ()=> audio = null 
}

function addMessage(text, sender) {
    const templateCloned = $template.content.cloneNode(true)
    const $newMessage = templateCloned.querySelector('.message')
    const $who = $newMessage.querySelector('span')
    const $text = $newMessage.querySelector('p')

    $text.innerHTML = marked.parse(text)
    $who.innerHTML = sender === 'bot' ? $chatImage : 'Tú'

    $newMessage.classList.add(sender)
    $messages.appendChild($newMessage)
    $container.scrollTop = $container.scrollHeight

    return text
}