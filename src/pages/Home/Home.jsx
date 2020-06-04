import React from 'react'
import styled from 'styled-components'

import { useStore } from 'store'

import HtmlHeader from 'components/HtmlHeader'
import Header from './Header'

const Container = styled.div`
  width: 100%;
  padding-top: 60px;
`

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ auth }, dispatch] = useStore()

  const username = auth.user.name ? `${auth.user.name} | ` : ''

  return (
    <Container>
      <HtmlHeader title={`${username}Year In Pixels`} />
      <Header />

      <p>adhajsdk</p>
    </Container>
  )
}

export default Home
