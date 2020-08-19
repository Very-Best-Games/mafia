// green 5s
// green blink 2s
// yellow 2s
// red 5s
// yellow-red 1s
// back to green

const states = {
  green: {
    onEnter: () => {
      console.log('green')
    },
    update: (traffic) => {
      if (traffic.elapsedTimeSinceLastStateChange >= 5) {
        traffic.changeState(states.greenBlink)
      }
    }
  },
  greenBlink: {
    onEnter: () => {
      console.log('green blinking')
    },
    update: (traffic) => {
      if (traffic.elapsedTimeSinceLastStateChange >= 2) {
        traffic.changeState(states.green)
      }
    }
  },
}

const trafficLight = {
  elapsedTimeSinceLastStateChange: 0,
  currentState: undefined,
  changeState: (newState) => {
    trafficLight.currentState = newState
    trafficLight.currentState.onEnter()
    trafficLight.elapsedTimeSinceLastStateChange = 0
  },
  interval: undefined,
  start: () => {
    trafficLight.changeState(states.green)
    trafficLight.interval = setInterval(() => {
      trafficLight.elapsedTimeSinceLastStateChange++
      trafficLight.currentState.update(trafficLight)
    }, 200)
  },
  end: () => {
    clearInterval(trafficLight.interval)
  }
}

trafficLight.start()
