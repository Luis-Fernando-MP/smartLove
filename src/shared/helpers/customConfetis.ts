import confetti, { Options } from 'canvas-confetti'

const defaultConfetti: Options = {
  decay: 0.9,
  spread: 100,
  ticks: 120,
  gravity: 1.7,
  startVelocity: 50,
  disableForReducedMotion: true,
  origin: { y: 0.7 }
}
const dollarText = confetti.shapeFromText({ text: '💵' })
const moneyText = confetti.shapeFromText({ text: '🪙' })
const startText = confetti.shapeFromText({ text: '🌟' })

export const moneyConfetti = () => {
  confetti({
    ...defaultConfetti,
    shapes: [dollarText],
    particleCount: 20,
    scalar: 2
  })
  confetti({
    ...defaultConfetti,
    shapes: [moneyText],
    particleCount: 30,
    scalar: 1
  })
}

const startConfig: Options = {
  ...defaultConfetti,
  colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
}
export const startsConfetti = () => {
  confetti({
    ...startConfig,
    particleCount: 20,
    scalar: 2,
    shapes: [startText]
  })

  confetti({
    ...startConfig,
    particleCount: 30,
    scalar: 1,
    shapes: ['square']
  })
}
