import { TimelineLite, Back } from 'gsap'

const animate = (context) => {
  const block = [...context.$el.querySelectorAll('[animated]')]
  const timeline = new TimelineLite()
  block.map(item => {
    timeline.from(item, 0.05, {
      x: -10,
      opacity: 0,
      ease: Back.easeInOut
    })
    timeline.to(item, 0, {
      x: 0,
      opacity: 1,
      ease: Back.easeInOut
    })
  })
}

const animateBack = (context) => {
  return new Promise(resolve => {
    const block = [...context.$el.querySelectorAll('[animated]')].reverse()
    const timeline = new TimelineLite()
    block.map((item, index) => {
      timeline.from(item, 0.05, {
        x: 0,
        opacity: 1,
        ease: Back.easeInOut
      })
      timeline.to(item, 0, {
        x: -10,
        opacity: 0,
        ease: Back.easeInOut,
        onComplete () {
          if (index === block.length - 1) resolve()
        }
      })
    })
  })
}

export { animate, animateBack }
