let sequenceButtons = document.querySelectorAll('.sequence')
let startButton = document.querySelector('.start')

const ANIMATION_DURATION = 500

let getRandomInteger = max=> Math.floor(Math.random() * max)
let getRandomButton = buttons=> buttons[getRandomInteger(buttons.length)]


let randomSequence = []
let playerPosition = 0

let addHighlight = button=> button.classList.add('highlight')
let removeHighlight = button=> button.classList.remove('highlight')

let animateSequence = sequence=> {
  for(let i=0; i<sequence.length; i++) {
    let button = sequence[i]
    let delay = (i*ANIMATION_DURATION) + ANIMATION_DURATION
    setTimeout(()=>{
      addHighlight(button)
      startTone(button.dataset.frequency)
    }, delay)
    setTimeout(()=>{
      removeHighlight(button)
      endTone()
    }, delay + (ANIMATION_DURATION/2))
  }
}

let nextRound = function() {
  playerPosition = 0
  randomSequence.push(getRandomButton(sequenceButtons))
  animateSequence(randomSequence)
}

let handleClick = event=> {
  let playerGuess = event.target
  let answer = randomSequence[playerPosition]
  let correct = playerGuess == answer

  if(!correct) reset()
  else if(++playerPosition == randomSequence.length) nextRound()
}

let reset = function() {
  startButton.style.display = 'block'
  randomSequence = []
  playerPosition = 0
}

sequenceButtons.forEach(button=> button.addEventListener('click', handleClick))

startButton.addEventListener('click', function() {
  startButton.style.display = 'none'
  nextRound()
})

let audioContext = new AudioContext()
let oscillator = audioContext.createOscillator()
oscillator.frequency.value = 440
oscillator.start(0)

sequenceButtons.forEach(button=> {
  button.addEventListener('mousedown', event=> {
    startTone(event.target.dataset.frequency)
  })
})
document.addEventListener('mouseup', ()=> {
  endTone()
})

let startTone = frequency=> {
  oscillator.frequency.value = frequency
  oscillator.connect(audioContext.destination)
}

let endTone = ()=> {
  oscillator.disconnect()
}
