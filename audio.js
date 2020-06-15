let audioContext = new AudioContext()
let oscillator = audioContext.createOscillator()
oscillator.frequency.value = 440
oscillator.start(0)

let startTone = frequency=> {
  oscillator.frequency.value = frequency
  oscillator.connect(audioContext.destination)
}

let endTone = ()=> oscillator.disconnect()
