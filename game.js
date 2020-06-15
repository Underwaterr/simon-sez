let sequenceButtons = document.querySelectorAll('.sequence')
let startButton = document.querySelector('.start')

const ANIMATION_DURATION = 500

let getRandomInteger = max=> Math.floor(Math.random() * max)
let getRandomButton = buttons=> buttons[getRandomInteger(buttons.length)]

let randomSequence = []
let playerPosition = 0

let addBorder = button=> button.classList.add('border')
let removeBorder = button=> button.classList.remove('border')

let nextRound = function() {
  playerPosition = 0
  randomSequence.push(getRandomButton(sequenceButtons))
  animateSequence(randomSequence)
}

let handlePlayerGuess = event=> {
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

sequenceButtons.forEach(button=> {
  button.addEventListener('click', handlePlayerGuess)
  button.addEventListener('mousedown', ()=> startTone(button.dataset.frequency))
  button.addEventListener('mouseup', endTone)
})

startButton.addEventListener('click', function() {
  startButton.style.display = 'none'
  nextRound()
})

