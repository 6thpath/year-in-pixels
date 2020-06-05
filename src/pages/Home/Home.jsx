import React from 'react'
import styled from 'styled-components'

import { useStore } from 'store'

import HtmlHeader from 'components/HtmlHeader'
import Header from './Header'

const Container = styled.div`
  width: 100%;
`

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ auth }] = useStore()

  const username = auth.user.name ? `${auth.user.name} | ` : ''

  return (
    <Container id='styled-home-container'>
      <HtmlHeader title={`${username}Year In Pixels`} />
      <Header />
    </Container>
  )
}

export default Home
