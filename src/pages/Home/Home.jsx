import React from 'react'
import styled from 'styled-components'

import { useStore } from 'store'

import HtmlHeader from 'components/HtmlHeader'
import Header from './Header'
import Emotions from './Emotions'
import Selection from './Selection'
import Body from './Body'

const Container = styled.div`
  width: 100%;
`

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ auth, data }] = useStore()

  const username = auth.user.name ? `${auth.user.name} | ` : ''

  return (
    <Container id='styled-home-container'>
      <HtmlHeader title={`${username}Year In Pixels`} />
      <Header />

      {data.selectedYear && <Emotions />}
      <Selection />

      <Body />
    </Container>
  )
}

export default Home
