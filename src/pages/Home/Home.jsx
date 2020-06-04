import React from 'react'
// import styled from 'styled-components'
// import { generatePath } from 'react-router-dom'
// import { BackTop } from 'antd'

import { useStore } from 'store'

import { firebase } from 'utils/firebase'

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ auth }] = useStore()
  console.log('Home -> auth', auth.user)

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(function (error) {
        // An error happened.
      })
  }

  return <button onClick={signOut}>asd</button>
}

export default Home
