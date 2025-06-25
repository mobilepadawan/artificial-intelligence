export function playAudioFile(af) {
    if (af) {
        let audio = new Audio()
        audio.preload = 'auto'
        audio.src = af
        audio.play()
        audio.addEventListener('ended', ()=> audio = null)
    }
}