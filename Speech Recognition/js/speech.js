window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition

const recognition = new speechRecognition() || new webkitSpeechRecognition()
console.log(recognition)
      
      if (!recognition) {
        console.error("Su sistema no permite usar Speech Recognition.")
      }

      recognition.onstart = ()=> { paragraphMessage.textContent = "✅ Voice recognition is ready to hear you." }

      // recognition.addEventListener("start", ()=> paragraphMessage.textContent = "✅ Voice recognition is ready to hear you.")

      recognition.interimResults = true

      let p = document.createElement('p')
      recognition.addEventListener("result", (e)=> {
        const text = Array.from(e.results).map(result => result[0])
                                          .map(result => result.transcript)
                                          .join('')
        p.innerText = text.trim()
        textArea.appendChild(p)

        if (e.results[0].isFinal) {
            p = document.createElement('p')
        }

        if (text.toLowerCase().includes('borra la pantalla') || text.toLowerCase().includes('clear screen')) {
            setTimeout(() => textArea.innerText = "", 500);
          }
      })

      recognition.addEventListener('end', ()=> recognition.start() )

      recognition.start()