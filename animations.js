let animationStart = button => ()=> {
  addBorder(button)
  startTone(button.dataset.frequency)
}

let animationEnd = button => ()=> {
  removeBorder(button)
  endTone()
}

let animateSequence = sequence=> {
  for(let i=0; i<sequence.length; i++) {
    let button = sequence[i]
    let delayStart = (i*ANIMATION_DURATION) + ANIMATION_DURATION
    let delayEnd = delayStart + (ANIMATION_DURATION/2)
    setTimeout(animationStart(button), delayStart)
    setTimeout(animationEnd(button), delayEnd)
  }
}
