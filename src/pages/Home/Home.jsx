import React, { useRef } from 'react'
import styled from 'styled-components'

import { useStore } from 'store'

import HtmlHeader from 'components/HtmlHeader'
import Header from './Header'
import Mood from './Mood'
import MoodModal from './MoodModal'
import Body from './Body'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Home = () => {
  const [{ auth, data }] = useStore()

  const containerRef = useRef(null)

  const username = auth.user.name ? `${auth.user.name} | ` : ''

  return (
    <Container id='styled-home-container' ref={containerRef}>
      <HtmlHeader title={`${username}Year In Pixels`} />
      <Header />

      {data.selectedYear && <Mood containerRef={containerRef} />}
      <MoodModal />

      <Body />
    </Container>
  )
}

export default Home
