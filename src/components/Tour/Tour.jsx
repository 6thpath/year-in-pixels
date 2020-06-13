import React from 'react'
import Tour from 'reactour'

import { useStore } from 'store'
import { SET_TUTORIAL_VISIBLE } from 'store/ui'

const steps = [
  {
    selector: '#t-unknown',
    content: `Use '←' and '→' to move between tutorial steps if you are using desktop.`,
  },
  {
    selector: '#t-year-picker',
    content: 'The year select. You can choose what year to view.',
  },
  {
    selector: '#t-mood-bar',
    content: 'The mood conversion table, to contrast color and mood',
  },
  {
    selector: '#t-body',
    content: 'The mood data table. Once you get all the squares filled in, you can gain some insights into your moods.',
  },
  {
    selector: '#t-today-square',
    content: `And the final step also the most important: Click/Touch this square to open mood select modal and set your today's mood.`,
  },
]

const AppTutorial = () => {
  const [{ ui }, dispatch] = useStore()

  const closeTutorial = () => {
    dispatch({ type: SET_TUTORIAL_VISIBLE, payload: false })
  }

  return (
    <Tour
      steps={steps}
      rounded={5}
      showNumber={false}
      // showButtons={false}
      // showNavigation={false}
      isOpen={ui.tutorialVisible}
      onRequestClose={closeTutorial}
    />
  )
}

export default AppTutorial
